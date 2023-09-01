

const User = require('../Models/ModelUser')


async function addTaskToUser(userId, taskData) {
    try {

        const user = await User.findById(userId, { password: 0 });

        if (!user) {
            throw new Error('Usuário não encontrado');
        }

        user.tasks.push(taskData);

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






module.exports = { addTaskToUser,returnTasks };

