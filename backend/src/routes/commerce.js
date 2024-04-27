const express = require("express");
const router = express.Router();
const { commerceValidation } = require('../validators/commerce')
const { existingUser} = require('../middleware/user');
const { createCommerce } = require("../controllers/commerce");


/**
 * @swagger
 * /commerce/createCommerce:
 *   post:
 *     summary: Crea un nuevo comercio
 *     tags: [Commerce]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Commerce'
 *     responses:
 *       201:
 *         description: Comercio creado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Commerce'
 *       400:
 *         description: Datos de entrada inválidos.
 *       500:
 *         description: Error interno del servidor.
 */
router.post('/createCommerce',commerceValidation, existingUser, createCommerce)

module.exports = router;