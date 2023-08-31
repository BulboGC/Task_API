const mongoose = require('mongoose');
require('dotenv').config();

const DB_HOST = process.env.DB_HOST;
const DB_PORT = process.env.DB_PORT;
const DB_NAME = process.env.DB_NAME;

const uri =  `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`

const connectDB = async () => {
  try {
    await mongoose.connect(uri , {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Conexão realizada com sucesso');
  } catch (error) {
    console.log('Erro na conexão:', error);
  }
};

module.exports = connectDB;

