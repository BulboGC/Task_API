
const {findUser} = require('./UserService')
const User = require('../Models/UserModel');
const {formatString} = require('./AuxService')






async function delTask(userid,taskid){

    try{
        const response = await findUser(userid);

        //filtrar dados 
        const updatedTasks = response.tasks.filter(task => task._id.toString() !== taskid);
        response.tasks = updatedTasks;
        
        await response.save();
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

        if(where.importance){
            where.strImportance = await stringImportance(where.importance)
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
        if(where.importance){
            filteredTasks = filteredTasks.filter(task => task.importance === where.strImportance);
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
        throw err
    }
};


const  validateUpdateFields =  (title, description, status,importance) => {



    if (title === undefined && description === undefined && status === undefined) {
        throw new Error('Por favor, informe algum campo para a atualização');
    }
    if (status && !['Pending', 'In Progress', 'Completed'].includes(status)) {
        throw new Error('O status deve ser enviado no padrão certo: um desses três (Pending, In Progress, Completed)');
    }
    if (importance && !['High Priority', 'Medium Priority', 'Low Priority','Critical', 'Standard'].includes(importance)) {
        throw new Error('Prioridade inválido, ela deve conter um desses valores:(High Priority, Medium Priority, Low Priority,Critical, Standard )');
    }
    return true
}

//função para validar os campos para inserção de task
const validateTaskData = (title, description, status,importance) => {

   
    if (!title || !description) {
        throw new Error('O título e a descrição são obrigatórios.');
    }



    if(status){
        //formatar a string para caso a pessoa mande em lowercase
        const newstatus  = formatString(status)
        
        //verificar se está no padrão correto   
        if (status && !['Pending', 'In Progress', 'Completed'].includes(newstatus)) {
            throw new Error('O status deve ser enviado no padrão certo: um desses três (Pending, In Progress, Completed)');
        }
    }



    if(importance){
        //formatar a string para caso a pessoa mande em lowercase
        const newimportance  = formatString(importance)
        
        //verificar se está no padrão correto
        if (importance && !['High Priority', 'Medium Priority', 'Low Priority','Critical', 'Standard'].includes(newimportance)) {
            throw new Error('Prioridade inválido, ela deve conter um desses valores:(High Priority, Medium Priority, Low Priority,Critical, Standard )');
        }
    }



    
    
    
};

//função que trasforma o number status em uma string
function stringStatus(number) {
    try {
        const numstatus = parseInt(number);

        const numeroParaString = {
            0: 'Pending',
            1: 'In Progress',
            2: 'Completed'
        };

        const status = numeroParaString[numstatus];

        if (typeof status === 'undefined') {
            throw new Error('Status não mapeado');
        }

        return status;
    } catch (error) {
        throw new Error('O status informado não está no padrão numérico, mande um destes 3 números: (0 = Pending, 1 = In Progress, 2 = Completed). Qualquer valor numérico fora deste padrão será desconsiderado.');
    }
}


function stringImportance(number){
    try {
        const numImportance = parseInt(number);

        const numeroParaString = {
            0: 'High Priority',
            1: 'Medium Priority',
            2: 'Low Priority',
            3: 'Critical',
            4: 'Standard'
        };

        const importance = numeroParaString[numImportance];

        if (typeof importance === 'undefined') {
            throw new Error('Importance não mapeado');
        }

        return importance;
    } catch (error) {
        throw new Error('O Importance informado não está no padrão numérico, mande um destes números: (0 = High Priority, 1 = Medium Priority, 2 = Low Priority, 3 = Critical, 4 = Standard). Qualquer valor numérico fora deste padrão será desconsiderado.');
    }
}




module.exports = { addTaskToUser,returnTasks,delTask,validateUpdateFields ,updateTask,validateTaskData};

