const express = require('express');
const app = express();
const cors = require('cors');
const connectDB = require('./DB/db');
require('dotenv').config();

// Importar o roteador principal
const v1 = require('./routers/v1/v1');



// Configuração do Express
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//configuração cors
app.use(cors());

// roteadores
app.use('/v1', v1);




//inicialização do Banco
connectDB();



//iniciar servidor
app.listen(4000, () => {
    console.log('iniciado server');
});

