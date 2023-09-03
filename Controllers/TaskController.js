//DB
const mongoose = require('mongoose');
//Models
const User = require('../Models/UserModel');
//Services
const {returnTasks,addTaskToUser,delTask,validateUpdateFields,updateTask,validateTaskData} = require('../Services/TaskService');





const editTask = async(req,res)=>{
    const { title, description, status,importance } = req.body;
    const taskid = req.params.id;
    const userId = req.user.id; 

    try{

        validateUpdateFields(title,description,status,importance);
        
        //filtro para tirar undefined e criar um objeto para o update
        const wheredata = {
            ...(title !== undefined && { title }),
            ...(description !== undefined && { description }),
            ...(status !== undefined && { status }),
            ...(importance !== undefined && {importance})
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
        const { title, description, status ,importance } = req.body;
        const userId = req.user.id;

        validateTaskData(title, description, status,importance); // Chame a função de validação

        


        const taskData = {
            title,
            description,
            status: status || 'Pending', 
            importance: importance || 'Standard'
        };

        const newTask = await addTaskToUser(userId, taskData);
        
        return res.status(201).json(newTask.tasks);
    } catch (err) {
        return res.status(400).json({ message: err.message });
    }
};

/* rota de pegar dados e tasks e filtros */
const getTasks = async(req,res)=>{
    
    const {id} = await req.user;
    const {title,status,importance} = req.query;
    
    try{
    
        const wheredata = {
            ...(title !== undefined && { title }),
            ...(status !== undefined && { status }),
            ...(importance !== undefined && {importance}),
        };

   


        const data = await returnTasks(id,wheredata);

        res.json(data);

    }catch(err)
    {
        res.status(401).json({ status: 401, message: err.message });
    }

}



module.exports = {getTasks,addTask,deleteTask,editTask};