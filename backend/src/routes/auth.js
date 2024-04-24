const express = require("express");
const router = express.Router();
const { createNewUser, existingUser, createMerchant } = require('../controllers/auth');
const { userVerification } = require('../middleware/userVerification')
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
router.post("/register", validatorRegister, userVerification, createNewUser);




/**
 * @swagger
 * /auth/existingUser:
 *   get:
 *     summary: Verifica si un usuario existe
 *     tags: [Auth]
 *     parameters:
 *       - in: query
 *         name: email
 *         schema:
 *           type: string
 *           format: email
 *         required: true
 *         description: El email del usuario a verificar.
 *     responses:
 *       200:
 *         description: Usuario encontrado.
 *       404:
 *         description: Usuario no encontrado.
 *       500:
 *         description: Error interno del servidor.
 */
router.get("/existingUser", existingUser);

/**
 * @swagger
 * /auth/createMerchant:
 *   post:
 *     summary: Crea un nuevo comerciante
 *     tags: [Merchants]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email del comerciante
 *             example:
 *               email: merchant@example.com
 *     responses:
 *       201:
 *         description: Comerciante creado exitosamente
 *       400:
 *         description: Error en la solicitud
 *       409:
 *         description: Ya existe un usuario con ese email
 *       500:
 *         description: Error del servidor
 */

router.post('/createMerchant', createMerchant);


module.exports = router;
