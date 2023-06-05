const express = require('express');
const app = express();

// middlewares
const cors = require('cors');

app.use(express.json());
app.use(cors());

// routes
const animeRoute = require('./routes/anime');
const docRoute = require('./routes/doc');
const studioRoute = require('./routes/studio');
const genreRoute = require('./routes/genre');

app.use('/anime', animeRoute);
app.use('/studio', studioRoute);
app.use('/genre', genreRoute);
app.use('/doc', docRoute);


// database connection
const mongoose = require('mongoose');

// configuration file with database connection string, port... (not in repo) 
require('dotenv').config();

// default option if not using the .env file
const PORT = 3000 || process.env.PORT; // default port
const CONNECTION_STRING = '' || process.env.MONGO_CONNECTION_STRING; // write your connection string here

const connectToDatabase = async () => {
    try {
        const connection = await mongoose.connect(CONNECTION_STRING);
        app.listen(PORT);
        console.log(`servidor conectado e rodando em http://localhost:${PORT}`);
    } catch (err) {
        console.log('Falha ao conectar ao banco.');
        console.log('Mensagem de erro: ', err);
    }
};

connectToDatabase();

module.exports = app;