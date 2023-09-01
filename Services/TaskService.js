
const {findUser} = require('./UserService')
const User = require('../Models/ModelUser')






async function delTask(userid,taskid){
    try{
        const response = await findUser(userid);
        const updatedTasks = response.tasks.filter(task => task._id.toString() !== taskid)
        response.tasks = updatedTasks;
        
        await response.save()
        return response;
    }catch(err)
    {
        throw new Error('Erro interno.')
    }
    
}


async function addTaskToUser(userid, taskdata) {
    try {

        const user = await User.findById(userid, { password: 0 });

        if (!user) {
            throw new Error('Usuário não encontrado');
        }

        user.tasks.push(taskdata);

        const updatedUser = await user.save();

        return updatedUser;


    } catch (error) {
        throw error;
    }
}


const returnTasks = async (id, where = {}) => {
    try {
        const user = await User.findOne({ _id: id });

        if (!user) {
            throw new Error('Usuário não encontrado');
        }

        let filteredTasks = user.tasks;

        if (where.title) {
            filteredTasks = filteredTasks.filter(task => task.title.includes(where.title));
        }

        if (where.status) {
            filteredTasks = filteredTasks.filter(task => task.status === where.status);
        }

        return filteredTasks;
    } catch (err) {
        throw new Error('Erro Interno');
    }
};

const updateTask = async (userid, taskid, where) => {
    const user = await User.findById(userid);

    try {
        const taskIndex = user.tasks.findIndex(task => task.id === taskid);

        if (taskIndex !== -1) {
           
            for (let key in where) {
                const valueToUpdate = where[key];
                user.tasks[taskIndex][key] = valueToUpdate;
            }

            await user.save();
            return user.tasks
        } else {
            throw new Error('Tarefa não encontrada'); // Trate o caso em que a tarefa não foi encontrada
        }
    } catch (err) {
        throw new Error('Erro Interno');
    }
};


const  validateUpdateFields =  (title, description, status) => {
    if (title === undefined && description === undefined && status === undefined) {
        throw new Error('Por favor, informe algum campo para a atualização');
    }
    if (!['pendente', 'em andamento', 'concluída'].includes(status) && status != undefined) {
        throw new Error('O status deve ser enviado no padrão certo: um desses três (pendente, em andamento, concluída)');
    }
    return true
}



module.exports = { addTaskToUser,returnTasks,delTask,validateUpdateFields ,updateTask};

