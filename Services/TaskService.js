
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
        
        if(where.status){
           where.strstatus  = await stringStatus(where.status)
        }
        
        const user = await User.findOne({ _id: id });

        if (!user) {
            throw new Error('Usuário não encontrado');
        }

        let filteredTasks = user.tasks;

        if (where.title) {
            filteredTasks = filteredTasks.filter(task => task.title.includes(where.title));
        }

        if (where.status) {
            filteredTasks = filteredTasks.filter(task => task.status === where.strstatus);
        }

        return filteredTasks;
    } catch (err) {
        throw new Error(err);
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
    if (!['pendente', 'em andamento', 'concluida'].includes(status) && status != undefined) {
        throw new Error('O status deve ser enviado no padrão certo: um desses três (pendente, em andamento, concluída)');
    }
    return true
}


const validateTaskData = (title, description, status) => {
    if (!title || !description) {
        throw new Error('O título e a descrição são obrigatórios.');
    }

    if (status && !['pendente', 'em andamento', 'concluida'].includes(status)) {
        throw new Error('Status inválido.');
    }
};

function stringStatus(numero) {
    try {
        const numstatus = parseInt(numero);

        const numeroParaString = {
            0: 'pendente',
            1: 'em andamento',
            2: 'concluida'
        };

        const status = numeroParaString[numstatus];

        if (typeof status === 'undefined') {
            throw new Error('Status não mapeado');
        }

        return status;
    } catch (error) {
        throw new Error('O status informado não está no padrão numérico, mande um destes 3 números: (0 = pendente, 1 = em andamento, 2 = concluída). Qualquer valor numérico fora deste padrão será desconsiderado.');
    }
}


module.exports = { addTaskToUser,returnTasks,delTask,validateUpdateFields ,updateTask,validateTaskData};

