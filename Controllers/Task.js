//DB
const mongoose = require('mongoose');
//Models
const User = require('../Models/ModelUser');
//Services
const {returnTasks,addTaskToUser} = require('../Services/TaskService');

const addTask = async (req, res) => {
    try {
        const { title, description, status } = req.body;
        const userId = req.user.id; 

        if (!title || !description) {
            return res.status(400).json({ message: 'O título e a descrição são obrigatórios.' });
        }

        let taskData = {
            title,
            description
        };

    
        if (status) {
          
            if (['pendente', 'em andamento', 'concluída'].includes(status)) {
                taskData.status = status;
            } else {
                return res.status(400).json({ message: 'Status inválido.' });
            }
        }

        const newTask = await addTaskToUser(userId,taskData);
        return  res.status(201).json(newTask);

    }catch(err){
        return res.status(500).json({message: 'Erro interno'})
    }  
}
const getTasks = async(req,res)=>{

    const {id} = await req.user;

    try{
    const data = await returnTasks(id);

    res.json(data);

    }catch(err)
    {
        res.status(401).json({ status: 401, message: err.message });
    }

}



module.exports = {getTasks,addTask};