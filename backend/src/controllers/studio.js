const Studio = require('../models/Studio');
const Anime = require('../models/Anime');

const createStudio = async (req, res) => {
    /*#swagger.description = 'cadastra um estudio com os dados do corpo da requisição'
    #swagger.tags = ['Studio']
    #swagger.parameters['obj'] = {
      in: 'body',
      description: 'Informações do estudio',
      required: true,
      schema: { $ref: "#/definitions/Studio" }
    } */
    try {
        const { name, description, foundationDate, animeProductions } = req.body
        const studio = new Studio({ name, description, foundationDate, animeProductions });
        const savedStudio = await studio.save();
        res.status(201).json(savedStudio);
    } catch (error) {
        res.status(400).json({ error });
    }
};

const getAllStudios = async (req, res) => {
    /* #swagger.description = 'retorna todos os estudios cadastradas'
    #swagger.tags = ['Studio'] */
    const page = parseInt(req.query.page) || 1; // Current page number
    const limit = parseInt(req.query.limit) || 10; // Number of results per page

    try {
        const total = await Studio.countDocuments();

        // Calculate the number of skip documents based on the page and limit
        const skip = (page - 1) * limit;

        // Query the database for the paginated results
        const studios = await Studio.find().populate('animes').skip(skip).limit(limit);

        res.status(200).json({
            total,
            page,
            limit,
            results: studios
        });
    } catch (error) {
        res.status(400).json({ error });
    }
};

const getSpecificStudio = async (req, res) => {
    /* #swagger.description = 'retorna os dados de um estudio específico (ID do Mongo)'
     #swagger.tags = ['Studio'] */
    try {
        const studio = await Studio.findById(req.params.studioID).populate('animes');
        res.status(200).json(studio);
    } catch (error) {
        res.status(400).json({ error });
    }

}

const updateSpecificStudio = async (req, res) => {
    /* #swagger.description = 'substitui as informações do estudio com ID informado pelos dados do corpo' 
         #swagger.tags = ['Studio']
         #swagger.parameters['obj'] = {
              in: 'body',
              description: 'Informação do Estudio',
              required: true,
              schema: { $ref: "#/definitions/Studio" }
          }  */
    try {
        const updatedStudio = await Studio.findOneAndUpdate(
            { _id: req.params.studioID },
            req.body
        );
        res.status(200).json(updatedStudio);
    } catch (error) {
        res.status(400).json({ error });
    }
}

const deleteSpecificStudio = async (req, res) => {
    /* #swagger.description = 'remove um Estúdio pelo ID do Mongo'
      #swagger.tags = ['Studio'] */
    try {
        const removedStudio = await Studio.findOneAndDelete({
            _id: req.params.studioID,
        });
        res.status(200).json(removedStudio);
    } catch (error) {
        res.status(400).json({ error });
    }
};
module.exports = {
    createStudio,
    getAllStudios,
    getSpecificStudio,
    deleteSpecificStudio,
    updateSpecificStudio
}