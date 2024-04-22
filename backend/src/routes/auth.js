const express = require("express");
const router = express.Router();
const { createUser } = require('../controllers/auth');
const { validatorRegister } = require('../validators/auth')

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Crea un nuevo usuario
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: Usuario creado con éxito.
 *       400:
 *         description: Datos de entrada inválidos.
 *       500:
 *         description: Error interno del servidor.
 */
router.post("/register", validatorRegister, createUser);

module.exports = router;
