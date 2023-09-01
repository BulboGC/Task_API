//DB
const mongoose = require('mongoose');
//Models
const User = require('../Models/ModelUser');
//Services
const {returnTasks,addTaskToUser,delTask,validateUpdateFields,updateTask} = require('../Services/TaskService');





const editTask = async(req,res)=>{
    const { title, description, status } = req.body;
    const taskid = req.params.id;
    const userId = req.user.id; 

    try{

        validateUpdateFields(title,description,status);
        
        //filtro para tirar undefined e criar um objeto para o update
        const wheredata = {
            ...(title !== undefined && { title }),
            ...(description !== undefined && { description }),
            ...(status !== undefined && { status }),
        };

        const updatedtask = await updateTask(userId,taskid,wheredata)

        res.status(200).send(updatedtask)


    }catch(err){
        res.status(400).send({message:err.message});
    }
  
} 

const deleteTask = async(req,res)=>{
    const userId = req.user.id; 
    const  taskId = req.params.id;

    if(!taskId){
        res.status(400).json({message: 'Por favor informe o id da tarefa que deseja deletar'});
    }

    try{
        const response = await delTask(userId,taskId);
        res.status(200).json(response.tasks)

    }catch(err)
    {
        return res.status(500).json({message: err})
    }
    
}

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
        return  res.status(201).json(newTask.tasks);

    }catch(err){
        return res.status(500).json({message: err.message})
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



module.exports = {getTasks,addTask,deleteTask,editTask};