const { usersModel } = require('../models')
const { signToken } = require('../utils/handleJWT')
const bcrypt = require('bcrypt');

const existingUserPOST = async (req, res, next) => {
    try {
        console.log("email")
        const { email } = req.body;
        const user = await usersModel.findOne({ email });
        if (user) {
            console.log("usuario correcto")
            req.user = user; // Adjuntar el usuario al objeto request
            next(); // Pasar el control al siguiente middleware
        } else {
            res.status(404).json({ message: 'Usuario no encontrado' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error interno al verificar el usuario' });
    }
};



const verifyPassword = async (req, res, next) => {
    try {
        const { password } = req.body;
        const user = req.user; 

        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            console.log("contraseña correcta")
            next();
        } else {
            res.status(401).json({ message: 'Contraseña incorrecta' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error interno al verificar la contraseña' });
    }
};


const generateToken = (req, res) => {
    if (!req.user) {
        return res.status(401).json({ message: 'Autenticación fallida, usuario no encontrado.' });
    }

    const { _id, email, role } = req.user;

    try {
       const token = signToken({
            userId: _id, 
            email: email, 
            role: role 
        });

        res.status(200).json({
            message: 'Login exitoso y token generado',
            token: token
        });
    } catch (error) {
        console.error('Error generando token:', error);
        res.status(500).json({ message: 'Error interno al generar el token' });
    }
};




module.exports = { existingUserPOST, verifyPassword, generateToken }