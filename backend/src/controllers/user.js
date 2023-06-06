const User = require('../models/User');
const bcrypt = require("bcrypt");

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
        console.log(req.body)
        const { username, password } = req.body
        const user = new User({ username, password: bcrypt.hashSync(password, 10)});
        console.log(req.body)
        const savedUser = await user.save();
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(400).json({ error });
    }
};

const getAllUsers = async (req, res) => {
    /* #swagger.description = 'retorna todos os usuários cadastrados'
    #swagger.tags = ['User'] */
    try {
        const users = await User.find().populate('tokens');
        res.json(users);
    } catch (error) {
        res.status(500).json({ error });
    }
};

const getSpecificUser = async (req, res) => {
    /* #swagger.description = 'retorna os dados de um usuário específico (ID do Mongo)'
     #swagger.tags = ['User'] */
    try {
        const user = await User.findById(req.params.userID).populate('tokens');
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ error });
    }

}


module.exports = {
    createUser,
    getAllUsers,
    getSpecificUser
}