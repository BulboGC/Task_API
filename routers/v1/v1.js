// routes/mainRouter.js
const express = require('express');
const router = express.Router();

// Importar os controladores
const { addUser, login } = require('../../Controllers/UserController');
const { getTasks, addTask, deleteTask, editTask } = require('../../Controllers/TaskController');
const { ProtectRoute } = require('../../Middlewares/jwt');

/* Rotas De User */
router.post('/signin', addUser);
router.post('/login', login);
//router.put('/edituser/:id', ProtectRoute, editUser);

/* Rotas de Task */
router.get('/task', ProtectRoute, getTasks);
router.post('/task', ProtectRoute, addTask);
router.delete('/task/:id', ProtectRoute, deleteTask);
router.put('/task/:id', ProtectRoute, editTask);

module.exports = router;