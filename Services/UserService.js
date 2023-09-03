const User = require('../Models/UserModel')
const bcrypt = require('bcrypt');




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

};

module.exports = { createUser,findUser,uniqueEmail,deleteUser};