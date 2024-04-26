const { usersModel } = require('../models');
const { matchedData } = require("express-validator")
const bcrypt = require('bcrypt');

const createNewUser = async (req, res) => {
    // en caso de ser un comerciante
    if (req.user) {
        try {
            const updateData = { ...req.body };

            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            req.user.password = hashedPassword;
            updateData.password = hashedPassword;
            
            req.user.isActive = true; 
            const updatedUser = await usersModel.findOneAndUpdate(
                {email: req.user.email },
                updateData,
                { new: true, runValidators: true }
            );
            res.status(200).json({ message: "Usuario comerciante actualizado con éxito", user: updatedUser });
        } catch (error) {
            console.error(error);
            res.status(400).json({ message: "Error al actualizar usuario comerciante", error: error });
        }

    } else {
        try {
            // Crea un nuevo usuario con la contraseña ya encriptada
            const newUser = new usersModel(req.body);
            newUser.password = await bcrypt.hash(newUser.password, 10);  // Encriptar la contraseña
            await newUser.save();
            res.status(201).json({ message: "Nuevo usuario creado exitosamente", user: newUser });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al crear el usuario' });
        }
    }
};

const createMerchant = async (req, res) => {
    const { email } = req.body
    const newMerchant = new usersModel({
        email: email,    // Establece el email
        isActive: false, // Comerciante no activo inicialmente
        role: "merchant" // Rol específico como comerciante
    });
    try {
        await newMerchant.save();
        res.status(201).json({ message: "Nuevo usuario comerciante creado exitosamente", newMerchant });
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: 'Error al crear el comerciante' });
    }


}

const existingUserGET = async (req, res) => {
    try {
        const { email } = req.query;
        const user = await usersModel.findOne({ email });
        if (user) {
            res.status(200).json({
                message: 'Usuario existente',
                user: {
                    email: user.email,
                    role: user.role,
                    isActive: user.isActive
                }
            });
        } else {
            res.status(404).json({ message: 'Usuario no encontrado' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error interno al verificar el usuario' });
    }
};

const existingUserPOST = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await usersModel.findOne({ email });
        if (user) {
            res.status(200).json({
                message: 'Usuario existente',
                user: {
                    email: user.email,
                    role: user.role,
                    isActive: user.isActive
                }
            });
        } else {
            res.status(404).json({ message: 'Usuario no encontrado' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error interno al verificar el usuario' });
    }
};



module.exports = { createNewUser, existingUserGET, existingUserPOST, createMerchant };
