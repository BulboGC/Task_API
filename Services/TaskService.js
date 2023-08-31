import Task from '../Models/ModelTask';
import mongoose from 'mongoose';

const createTask = async (taskData) => {
    try {
        const newTask = new Task(taskData);
        const savedTask = await newTask.save();
        return savedTask;
    } catch (error) {
        throw new Error('Error while creating task');
    }
};

export { createTask };

