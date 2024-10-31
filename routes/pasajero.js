// routes/pasajero.js
const express = require('express');
const router = express.Router();
const pasajeroController = require('../controllers/pasajeroController');

/**
 * @swagger
 * tags:
 *   name: Pasajeros
 *   description: API para gestionar los pasajeros
 */

/**
 * @swagger
 * /api/pasajeros:
 *   get:
 *     summary: Obtiene todos los pasajeros
 *     tags: [Pasajeros]
 *     responses:
 *       200:
 *         description: Lista de pasajeros
 */
router.get('/', pasajeroController.getPasajeros);

/**
 * @swagger
 * /api/pasajeros/{id}:
 *   get:
 *     summary: Obtiene un pasajero por ID
 *     tags: [Pasajeros]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del pasajero
 *     responses:
 *       200:
 *         description: Pasajero encontrado
 *       404:
 *         description: Pasajero no encontrado
 */
router.get('/:id', pasajeroController.getPasajeroById);

/**
 * @swagger
 * /api/pasajeros:
 *   post:
 *     summary: Crea un nuevo pasajero
 *     tags: [Pasajeros]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Pasajero creado exitosamente
 *       400:
 *         description: Error.- Usuario ya registrado
 *       500:
 *         description: Error al crear el pasajero
 */
router.post('/', pasajeroController.createPasajeroForUser);

module.exports = router;
