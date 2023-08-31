const User = require('../Models/ModelUser')
const bcrypt = require('bcrypt');


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
    return savadeuser
};

module.exports = { createUser };