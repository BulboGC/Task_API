const User = require('../Models/UserModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const authenticateUser = async (email, password) => {
    try {
        const user = await User.findOne({ email });

        if (!user) {
            throw new Error('Email informado não está no nosso banco');
        }

        const isEqual = await verifyHashPass(password, user.password);

        if (!isEqual) {
            throw new Error('Credenciais inválidas');
        }

        const payload = {
            id: user._id,
        };

        const JWT_SECRET = process.env.JWT_SECRET;
        const token = jwt.sign(payload, JWT_SECRET);

        return token;
    } catch (err) {
        throw err;
    }
};

const verifyHashPass = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
};

module.exports = { authenticateUser };