const mongoose = require('mongoose')//importar o mongoose
const jwt = require('jsonwebtoken');//importar o jwt
const bcrypt = require('bcrypt');//impotar o bcrypt
const {createUser} = require('../Services/UserService')
const {authenticateUser} = require('../Services/authService');
const User = require('../Models/ModelUser');

require('dotenv').config();


const login = async (req, res) => {
  const { email, password } = req.body;

  try {
      const token = await authenticateUser(email, password);
      res.status(200).json({ status: 200, message: 'Sucesso', token });
  } catch (err) {
      res.status(401).json({ status: 401, message: err.message });
  }
};

const addUser = async (req, res) => {
  const {  name,password, email } = req.body;

  if ( !password || !email) {
      return res
          .status(400)
          .send('Informe todos os campos, por favor');
  }

  try {
      const savedUser = await createUser( name,password, email);
      return res.status(201).json(savedUser);

  } catch (err) {

      return res.status(500).send(err);
  }
};

  

  module.exports = { addUser,login}; // Exportar os Metodos de controle