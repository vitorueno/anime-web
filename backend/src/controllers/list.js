
const List = require("../models/List");
const Anime = require("../models/Anime");

const getLists = async (req, res) => {
    /* #swagger.description = 'retorna todas as listas de anime cadastradas' #swagger.tags = ['List'] */

    const page = parseInt(req.query.page) || 1; // Current page number
    const limit = parseInt(req.query.limit) || 10; // Number of results per page

    try {
        const total = await List.countDocuments();

        // Calculate the number of skip documents based on the page and limit
        const skip = (page - 1) * limit;

        // Query the database for the paginated results
        const lists = await List.find().populate('user').populate('animes').skip(skip).limit(limit);

        res.status(200).json({
            total,
            page,
            limit,
            results: lists
        });
    } catch (error) {
        res.status(400).json({ error });
    }
}

const getSpecificList = async (req, res) => {
    /* #swagger.description = 'retorna os dados de uma lista específica (ID do Mongo)'
      #swagger.tags = ['List'] */
    try {
        const list = await List.findById(req.params.listID).populate('user').populate('animes');
        res.status(200).json(list);
    } catch (error) {
        res.status(400).json({ error });
    }

}

const createList = async (req, res) => {
    /*#swagger.description = 'cadastra uma lista de anime com os dados do corpo da requisição'
       #swagger.tags = ['List']
       #swagger.parameters['obj'] = {
         in: 'body',
         description: 'Informações da lista',
         required: true,
         schema: { $ref: "#/definitions/List" }
       } */
    try {
        const { title, description, user } = req.body;

        const list = new List({ title, description, user });
        const savedList = await list.save();
        res.status(201).json(savedList);
    } catch (error) {
        res.status(400).json(error);
    }
};

const deleteSpecificList = async (req, res) => {
    /* #swagger.description = 'remove uma lista pelo ID do Mongo'
      #swagger.tags = ['List'] */
    try {
        const removedList = await List.findOneAndDelete({
            _id: req.params.listID,
        });
        res.status(200).json(removedList);
    } catch (error) {
        res.status(400).json({ error });
    }
};


const updateSpecificList = async (req, res) => {
    /* #swagger.description = 'substitui as informações da lista com ID informado pelos dados do corpo' 
         #swagger.tags = ['List']
         #swagger.parameters['obj'] = {
              in: 'body',
              description: 'Informação da Lista',
              required: true,
              schema: { $ref: "#/definitions/List" }
          }  */
    try {
        const updatedList = await List.findOneAndUpdate(
            req.params.listID,
            req.body
        );
        res.status(200).json(updatedList);
    } catch (error) {
        res.status(400).json({ error });
    }
}

const addAnimesToList = async (req, res) => {
    /* #swagger.description = 'adiciona anime(s) passado(s) no body à lista com ID passada pela rota'
      #swagger.tags = ['List'] 
      #swagger.parameters['obj'] = {
              in: 'body',
              description: 'anime(s) a ser(em) adicionado(s)',
              required: true,
              schema: { $ref: "#/definitions/ChangeList" }
          }
    */
    const { listID } = req.params;
    const { animeIDS } = req.body;

    try {
        // Verifica se a lista existe
        const list = await List.findById(listID);
        if (!list) {
            return res.status(404).json({ message: 'Lista não encontrada' });
        }

        // Verifica se o anime existe
        const existingAnimes = await Anime.find({ _id: { $in: animeIDS } });
        if (existingAnimes.length != animeIDS.length) {
            return res.status(404).json({ message: 'um ou mais animes não encontrados' });
        }

        // Adiciona o anime à lista
        list.animes.push(...animeIDS);
        await list.save();

        res.status(200).json(list);
    } catch (error) {
        res.status(400).json({ error })
    }
};

const removeAnimesFromList = async (req, res) => {
    /* #swagger.description = 'remove um anime à lista (recebe os ids na rota)'
      #swagger.tags = ['List'] */
    /* #swagger.description = 'adiciona anime(s) passado(s) no body à lista com ID passada pela rota'
          #swagger.tags = ['List'] 
          #swagger.parameters['obj'] = {
                  in: 'body',
                  description: 'anime(s) a ser(em) adicionado(s)',
                  required: true,
                  schema: { $ref: "#/definitions/ChangeList" }
              }
        */
    const { listID } = req.params;
    const { animeIDS } = req.body;

    try {
        // Verifica se a lista existe
        const list = await List.findById(listID);
        if (!list) {
            return res.status(404).json({ message: 'Lista não encontrada' });
        }

        // Verifica se o anime existe
        const existingAnimes = await Anime.find({ _id: { $in: animeIDS } });
        if (existingAnimes.length != animeIDS.length) {
            return res.status(404).json({ message: 'um ou mais animes não encontrados' });
        }

        // Adiciona o anime à lista
        list.animes.filter(animeID => !animeIDS.includes(animeID));
        await list.save();

        res.status(200).json(list);
    } catch (error) {
        res.status(400).json({ error })
    }

}

module.exports = {
    getLists,
    createList,
    getSpecificList,
    deleteSpecificList,
    updateSpecificList,
    addAnimesToList,
    removeAnimesFromList
};