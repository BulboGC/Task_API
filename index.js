const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const connectDB = require('./DB/db');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Importar o roteador principal
const v1 = require('./v1');

//import midlewares
const { ProtectRoute } = require('./Middlewares/jwt');

// Configuração do Express
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//configuração cors
app.use(cors());

// Use o roteador principal com um prefixo de rota, se desejar
app.use('/v1', v1);

connectDB();

app.listen(4000, () => {
    console.log('iniciado server');
});

