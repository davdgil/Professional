const { commercesModel, usersModel } = require('../models');
const { createMerchantCONTROLLER } = require('./auth');
const { matchedData } = require('express-validator');
const { handleError } = require('../utils/handleResponses');

const createCommerce = async (req, res) => {
    const data = matchedData(req);
    try {
        const merchant = await createMerchantCONTROLLER(data.email);

        if (!merchant) {
            console.log("No se pudo crear el comerciante")
            handleError(res, "No se pudo crear el comerciante", 400);
            return;
        }
        const newCommerce = new commercesModel({
            ...data,
            merchant: merchant._id
        });

        await newCommerce.save();
        console.log("Comercio creado")
        res.status(201).json({ message: 'Comercio y comerciante creados con éxito', commerce: newCommerce });
    } catch (error) {
        console.log('Error interno al crear el comercio y comerciante')
        handleError(res, 'Error interno al crear el comercio y comerciante', 500);
    }
};


const getAllCommerces = async (req, res) =>{
    try {
        const data = await commercesModel.find({})
        res.send(data)
    } catch (err) {
        handleHttpError(res, 'ERROR_GET_COMMERCES', 403)
    }
}

const getCommerceByID = async (req, res) => {
    try {
      const { id } = req.params;
      console.log(id);
      const data = await commercesModel.findById(id);
      if (!data) {
        handleHttpError(res, 'Commerce not found', 404);
        return;
      }
      res.send(data);
    } catch (error) {
      handleHttpError(res, 'ERROR_GET_COMMERCE', 404);
    }
  };


  const deleteAllCommerces = async (req, res) => {
    try {
        //encontramos todos los comercios y sus merchant ID
        const commerces = await commercesModel.find({});
        const merchantIds = commerces.map(commerce => commerce.merchant);

        //borramos todos los comerciantes
        await usersModel.deleteMany({
            _id: { $in: merchantIds }
        });

        //borramos todos los comercios
        await commercesModel.deleteMany({});

        res.status(200).json({ message: "todos los comercios y comerciantes asociados han sido eliminados" });
    } catch (error) {
        handleError(res, 'Error al eliminar todos los comercios', 500);
    }
};

const deleteCommerceByID = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id)
        const commerce = await commercesModel.findById(id);
        console.log(commerce)

        if (!commerce) {
            handleError(res, 'Commerce not found', 404);
            return;
        }

        // Borramos el comerciante asociado
        await usersModel.findByIdAndDelete(commerce.merchant);

        // Borramos el comercio
        await commercesModel.findByIdAndDelete(id);

        res.status(200).json({ message: `Comercio y comerciante con ID ${id} han sido borrados.` });
    } catch (error) {
        handleError(res, 'Error al eliminar comercio por ID', 500);
    }
};




module.exports = { createCommerce, getAllCommerces, getCommerceByID, deleteAllCommerces, deleteCommerceByID };
