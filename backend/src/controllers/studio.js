const Studio = require('../models/Studio');

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
    try {
        const studios = await Studio.find();
        res.json(studios);
    } catch (error) {
        res.status(500).json({ error });
    }
};

const getSpecificStudio = async (req, res) => {
    /* #swagger.description = 'retorna os dados de um estudio específico (ID do Mongo)'
     #swagger.tags = ['Studio'] */
    try {
        const studio = await Studio.findById(req.params.studioID);
        res.status(200).json(studio);
    } catch (error) {
        res.status(400).json({ error });
    }

}


module.exports = {
    createStudio,
    getAllStudios,
    getSpecificStudio
}