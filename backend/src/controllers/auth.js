const { usersModel } = require('../models');

const createUser = async (req, res) => {
    try {
        const { email } = req
        const body = req.body; 
        const data = await usersModel.create(body);
        res.status(201).json(data); 
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al crear el usuario' });
    } 
};

module.exports = { createUser };
