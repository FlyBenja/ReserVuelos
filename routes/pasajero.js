const express = require('express');
const router = express.Router();
const pasajeroController = require('../controllers/pasajeroController'); // Asegúrate de que la importación sea correcta

/**
 * @swagger
 * tags:
 *   name: Pasajeros
 *   description: API para gestionar los pasajeros
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
 *               id_user:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Pasajero creado exitosamente
 *       400:
 *         description: Error en los datos del pasajero
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
 *     summary: Actualiza un pasajero
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
 *               pasaporte:
 *                 type: string
 *               asiento:
 *                 type: string
 *               id_user:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Pasajero actualizado correctamente
 *       404:
 *         description: Pasajero no encontrado
 */
router.put('/:id', pasajeroController.updatePasajero);

/**
 * @swagger
 * /api/pasajeros/{id}/remove-reserva:
 *   delete:
 *     summary: Elimina la relación de reserva de un pasajero
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
 *         description: Reserva eliminada correctamente del pasajero
 *       404:
 *         description: Pasajero no encontrado
 */
router.delete('/:id/remove-reserva', pasajeroController.removeReservaId);

module.exports = router;
