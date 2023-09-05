const User = require('../Models/UserModel')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
const {verifyHashPass} = require('./authService')
require('dotenv').config();




async function listUser(userid){
    try{
        const user = await User.findById(userid,{password:0,tasks:0});
        return user
    }catch(err){
        throw new Error('Erro interno')
    }
}

async function updateUser(userid, data) {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const user = await User.findById(userid);

        // Edição de email
        if (data.email) {
            const verifyemail = await User.findOne({ email: data.email });

            if (verifyemail) {
                throw new Error('O email informado já está cadastrado no banco');
            }

            user.email = data.email;
        }

        if (data.password) {
            const hashRounds = parseInt(process.env.BCRYPT_HASH_ROUNDS);
            const hashedPassword = await bcrypt.hash(data.password, hashRounds);
            user.password = hashedPassword;
        }

        if (data.name) {
            user.name = data.name;
        }

        await user.save();
        await session.commitTransaction();
        session.endSession();
        

    } catch (err) {

        await session.abortTransaction();
        session.endSession();
        throw err
    }
}

async function deleteUser(userid){
    try{
       await User.findByIdAndDelete(userid)
    }catch{
        throw new Error('Erro interno')
    }
}

async function uniqueEmail(email){
    const response = await User.findOne({email:email})
    
    if(response){
        return true
    }else{
        return false
    }
}

const findUser = async (id)=>{
    const response = await User.findOne({ _id: id });
    return response
}


const createUser = async ( name,password, email) => {
    
    try{
        const existingUser = await User.findOne({ email: email });
    


        if (existingUser) {
            throw new Error('O e-mail fornecido já está sendo utilizado');
        }

        const hashRounds = parseInt(process.env.BCRYPT_HASH_ROUNDS);
        const hashedPassword = await bcrypt.hash(password, hashRounds);

        const newUser = new User({
            name:name,
            email: email,
            password: hashedPassword,
            createdAt: Date.now()
        
        });

        const savadeuser = await newUser.save();

    
        return savadeuser;
    }catch(err){
        throw err
    }
    

};

module.exports = { createUser,findUser,uniqueEmail,deleteUser,updateUser,listUser};