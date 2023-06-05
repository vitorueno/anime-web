
const Genre = require("../models/Genre");

const getGenres = async (req, res) => {
    /* #swagger.description = 'retorna todos os generos de anime cadastrados' #swagger.tags = ['Genre'] */

    const page = parseInt(req.query.page) || 1; // Current page number
    const limit = parseInt(req.query.limit) || 10; // Number of results per page

    try {
        const total = await Genre.countDocuments();

        // Calculate the number of skip documents based on the page and limit
        const skip = (page - 1) * limit;

        // Query the database for the paginated results
        const genres = await Genre.find().skip(skip).limit(limit);

        res.status(200).json({
            total,
            page,
            limit,
            results: genres
        });
    } catch (error) {
        res.status(400).json({ error });
    }
}

const getSpecificGenre = async (req, res) => {
    /* #swagger.description = 'retorna os dados de um gênero específico (ID do Mongo)'
      #swagger.tags = ['Genre'] */
    try {
        const genre = await Genre.findById(req.params.genreID);
        res.status(200).json(genre);
    } catch (error) {
        res.status(400).json({ error });
    }

}

const createGenre = async (req, res) => {
    /*#swagger.description = 'cadastra um gênero de anime com os dados do corpo da requisição'
       #swagger.tags = ['Genre']
       #swagger.parameters['obj'] = {
         in: 'body',
         description: 'Informações do gênero',
         required: true,
         schema: { $ref: "#/definitions/Genre" }
       } */
    try {
        const { title, description } = req.body;

        const genre = new Genre({ title, description });
        const savedGenre = await genre.save();
        res.status(201).json(savedGenre);
    } catch (error) {
        res.status(400).json(error);
    }
};

const deleteSpecificGenre = async (req, res) => {
    /* #swagger.description = 'remove um genero pelo ID do Mongo'
      #swagger.tags = ['Genre'] */
    try {
        const removedGenre = await Genre.findOneAndDelete({
            _id: req.params.genreID,
        });
        res.status(200).json(removedGenre);
    } catch (error) {
        res.status(400).json({ error });
    }
};


const updateSpecificGenre = async (req, res) => {
    /* #swagger.description = 'substitui as informações do gênero com ID informado pelos dados do corpo' 
         #swagger.tags = ['Genre']
         #swagger.parameters['obj'] = {
              in: 'body',
              description: 'Informação do Gênero',
              required: true,
              schema: { $ref: "#/definitions/Genre" }
          }  */
    try {
        const updatedGenre = await Genre.findOneAndUpdate(
            req.params.genreID,
            req.body
        );
        res.status(200).json(updatedGenre);
    } catch (error) {
        res.status(400).json({ error });
    }
}


module.exports = {
    getGenres,
    createGenre,
    getSpecificGenre,
    deleteSpecificGenre,
    updateSpecificGenre
};