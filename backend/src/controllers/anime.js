const Anime = require("../models/Anime");

const getAnimes = async (req, res) => {
    /* #swagger.description = 'retorna todos os animes cadastradas'
    #swagger.tags = ['Anime'] */

    const page = parseInt(req.query.page) || 1; // Current page number
    const limit = parseInt(req.query.limit) || 10; // Number of results per page

    try {
        const total = await Anime.countDocuments();

        // Calculate the number of skip documents based on the page and limit
        const skip = (page - 1) * limit;

        // Query the database for the paginated results
        const animes = await Anime.find().skip(skip).limit(limit);

        res.status(200).json({
            total,
            page,
            limit,
            results: animes
        });
    } catch (error) {
        res.status(400).json({ error });
    }
}

const getSpecificAnime = async (req, res) => {
    /* #swagger.description = 'retorna os dados de um anime específico (ID do Mongo)'
      #swagger.tags = ['Anime'] */
    try {
        const anime = await Anime.findById(req.params.animeID);
        res.status(200).json(anime);
    } catch (error) {
        res.status(400).json({ error });
    }

}

const createAnime = async (req, res) => {
    /*#swagger.description = 'cadastra um anime com os dados do corpo da requisição'
       #swagger.tags = ['Anime']
       #swagger.parameters['obj'] = {
         in: 'body',
         description: 'Informações do anime',
         required: true,
         schema: { $ref: "#/definitions/Anime" }
       } */
    const {
        title,
        synopsis,
        studio,
        genres,
        numEpisodes,
        releaseDate,
        endDate,
        source,
        demographic
    } = req.body;

    const anime = new Anime({
        title,
        synopsis,
        studio,
        genres,
        numEpisodes,
        releaseDate,
        endDate,
        source,
        demographic
    });

    try {
        const savedAnime = await anime.save();
        res.status(201).json(savedAnime);
    } catch (error) {
        res.status(400).json({ error });
    }
};

const deleteSpecificAnime = async (req, res) => {
    /* #swagger.description = 'remove um anime pelo ID do Mongo'
      #swagger.tags = ['Anime'] */
    try {
        const removedAnime = await Anime.findOneAndDelete({
            _id: req.params.animeID,
        });
        res.status(200).json(removedAnime);
    } catch (error) {
        res.status(400).json({ error });
    }
};


const updateSpecificAnime = async (req, res) => {
    /* #swagger.description = 'substitui as informações do anime com ID informado pelos dados do corpo' 
         #swagger.tags = ['Anime']
         #swagger.parameters['obj'] = {
              in: 'body',
              description: 'Informação do Anime',
              required: true,
              schema: { $ref: "#/definitions/Anime" }
          }  */
    try {
        const updatedAnime = await Anime.findOneAndUpdate(
            req.params.animeID,
            req.body
        );
        res.status(200).json(updatedAnime);
    } catch (error) {
        res.status(400).json({ error });
    }
}


module.exports = {
    getAnimes,
    createAnime,
    getSpecificAnime,
    deleteSpecificAnime,
    updateSpecificAnime
};