const express = require("express");
const router = express.Router();
const { commerceValidation } = require('../validators/commerce')
const { existingUser} = require('../middleware/user');
const { checkRole } = require('../middleware/role')
const { authMiddleware } = require('../middleware/session')
const { createCommerce, getAllCommerces, getCommerceByID, deleteAllCommerces, deleteCommerceByID } = require("../controllers/commerce");


/**
 * @swagger
 * /commerce/createCommerce:
 *   post:
 *     security:
 *       - bearerAuth: []
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
 *       403:
 *         description: Acceso prohibido.
 *       500:
 *         description: Error interno del servidor.
 */
router.post('/createCommerce',authMiddleware, checkRole(['admin']), commerceValidation, existingUser, createCommerce)

/**
 * @swagger
 * /commerce/getCommerces:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Obtener todos los comercios
 *     tags: [Commerce]
 *     responses:
 *       200:
 *         description: Lista de todos los comercios
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Commerce'
 *       403:
 *         description: Acceso denegado
 *       500:
 *         description: Error interno del servidor
 */
router.get('/getCommerces',authMiddleware, getAllCommerces)


/**
 * @swagger
 * /commerce/{id}:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Obtener un comercio por su ID
 *     tags: [Commerce]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del comercio a obtener
 *     responses:
 *       200:
 *         description: Detalles del comercio solicitado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Commerce'
 *       404:
 *         description: Comercio no encontrado
 *       500:
 *         description: Error interno del servidor
 */

router.get('/:id',authMiddleware, checkRole(['admin']), getCommerceByID);

/**
 * @swagger
 * /commerce/deleteAllCommerces:
 *   delete:
 *     security:
 *       - bearerAuth: []
 *     summary: Deletes all commerces and their associated merchants
 *     tags: [Commerce]
 *     responses:
 *       200:
 *         description: All commerces and associated merchants successfully deleted.
 *       500:
 *         description: Error occurred during the operation.
 */

router.delete('/deleteAllCommerces',authMiddleware, checkRole(['admin']), deleteAllCommerces);


/**
 * @swagger
 * /commerce/commerceByID/{id}:
 *   delete:
 *     security:
 *       - bearerAuth: []
 *     summary: Deletes a specific commerce and its associated merchant by ID
 *     tags: [Commerce]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the commerce to delete
 *     responses:
 *       200:
 *         description: Commerce and associated merchant successfully deleted.
 *       404:
 *         description: Commerce not found.
 *       500:
 *         description: Error occurred during the operation.
 */

router.delete('/commerceByID/:id',authMiddleware, checkRole(['admin']), deleteCommerceByID);


module.exports = router;