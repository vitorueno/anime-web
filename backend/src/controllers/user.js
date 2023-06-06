
const User = require("../models/User");

const getUsers = async (req, res) => {
    /* #swagger.description = 'retorna todos os usuários cadastrados' #swagger.tags = ['User'] */

    const page = parseInt(req.query.page) || 1; // Current page number
    const limit = parseInt(req.query.limit) || 10; // Number of results per page

    try {
        const total = await User.countDocuments();

        // Calculate the number of skip documents based on the page and limit
        const skip = (page - 1) * limit;

        // Query the database for the paginated results
        const users = await User.find().skip(skip).limit(limit);

        res.status(200).json({
            total,
            page,
            limit,
            results: users
        });
    } catch (error) {
        res.status(400).json({ error });
    }
}

const getSpecificUser = async (req, res) => {
    /* #swagger.description = 'retorna os dados de um usuário específico (ID do Mongo)'
      #swagger.tags = ['User'] */
    try {
        const user = await User.findById(req.params.userID);
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ error });
    }

}

const createUser = async (req, res) => {
    /*#swagger.description = 'cadastra um usuário com os dados do corpo da requisição'
       #swagger.tags = ['User']
       #swagger.parameters['obj'] = {
         in: 'body',
         description: 'Informações do usuário',
         required: true,
         schema: { $ref: "#/definitions/User" }
       } */
    try {
        const { name, email, password } = req.body;

        const user = new User({ name, email, password });
        const savedUser = await user.save();
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(400).json(error);
    }
};

const deleteSpecificUser = async (req, res) => {
    /* #swagger.description = 'remove um usuário pelo ID do Mongo'
      #swagger.tags = ['User'] */
    try {
        const removedUser = await User.findOneAndDelete({
            _id: req.params.userID,
        });
        res.status(200).json(removedUser);
    } catch (error) {
        res.status(400).json({ error });
    }
};


const updateSpecificUser = async (req, res) => {
    /* #swagger.description = 'substitui as informações do usuário com ID informado pelos dados do corpo' 
         #swagger.tags = ['User']
         #swagger.parameters['obj'] = {
              in: 'body',
              description: 'Informação do usuário',
              required: true,
              schema: { $ref: "#/definitions/User" }
          }  */
    try {
        const updatedUser = await User.findOneAndUpdate(
            req.params.userID,
            req.body
        );
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(400).json({ error });
    }
}

const toggleAdmin = async (req, res) => {
    /* #swagger.description = 'Inverte o valor de atual de admin de um usuário'
      #swagger.tags = ['User'] */
    try {
        const { userID } = req.params;
        const user = await User.findById(userID);
        user.admin = user.admin ? false : true
        await user.save();
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ error });
    }
}

module.exports = {
    getUsers,
    createUser,
    getSpecificUser,
    deleteSpecificUser,
    updateSpecificUser,
    toggleAdmin
};