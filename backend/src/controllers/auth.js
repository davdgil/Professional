const { usersModel } = require('../models');

const createUser = async (req, res) => {
    try {
        const body = req.body; // Aquí deberías acceder a req.body para obtener los datos del usuario
        const data = await usersModel.create(body);
        res.status(201).json(data); // Devuelve el nuevo usuario creado
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al crear el usuario' });
    } 
};

module.exports = { createUser };
