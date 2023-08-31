const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const connectDB = require('./DB/db');
const jwt = require('jsonwebtoken');


//import midlewares
const {ProtectRoute} = require('./middlewares/jwt');

// Importar os controladores
const { addUser,login} = require('./Controllers/User');


// Configuração do Express
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//configuração cors
app.use(cors());


/*  Rotas De User          */
app.post('/signin', addUser);
app.post('/login',login);
//app.put('/edituser/:id',ProtectRoute,editUser);








connectDB();


app.listen(4000, () => {
    console.log('iniciado server');
});

module.exports = app;




