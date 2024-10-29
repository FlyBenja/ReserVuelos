const express = require('express');
const router = express.Router();
const pasajeroController = require('../controllers/pasajeroController');

/**
 * @swagger
 * tags:
 *   name: Pasajeros
 *   description: API para gestionar los pasajeros de las reservas
 */

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
 *               nombre:
 *                 type: string
 *                 example: "Juan Pérez"
 *               pasaporte:
 *                 type: string
 *                 example: "A1234567"
 *               asiento:
 *                 type: string
 *                 example: "12A"
 *               reservaId:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Pasajero creado exitosamente
 *       400:
 *         description: Error.- Pasaporte ya registrado
 *       500:
 *         description: Error al crear el pasajero
 */
router.post('/', pasajeroController.createPasajero);

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
 * /api/pasajeros/{id}:
 *   put:
 *     summary: Actualiza un pasajero por ID
 *     tags: [Pasajeros]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del pasajero
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: "Juan Pérez"
 *               pasaporte:
 *                 type: string
 *                 example: "A1234567"
 *               asiento:
 *                 type: string
 *                 example: "12A"
 *               reservaId:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: Pasajero actualizado exitosamente
 *       404:
 *         description: Pasajero no encontrado
 *       400:
 *         description: Error.- Pasaporte ya registrado para otro pasajero
 */
router.put('/:id', pasajeroController.updatePasajero);

/**
 * @swagger
 * /api/pasajeros/{id}:
 *   delete:
 *     summary: Elimina un pasajero por ID
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
 *         description: Pasajero eliminado correctamente
 *       404:
 *         description: Pasajero no encontrado
 */
router.delete('/:id', pasajeroController.deletePasajero);

module.exports = router;
