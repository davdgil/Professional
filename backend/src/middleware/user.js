const { usersModel } = require('../models')

const existingUser = async (req, res, next) => {
    try {
        const { email } = req.body;
        const user = await usersModel.findOne({ email });
        if (user) {
            console.log("usuario existente")
            res.status(404).json({ message: 'Usuario existente' });
        } else {
            console.log("email disponible")
            next(); 
            
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error interno al verificar el usuario' });
    }
};

module.exports = { existingUser}