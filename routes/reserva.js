const express = require('express');
const router = express.Router();
const reservaController = require('../controllers/reservaController');

/**
 * @swagger
 * tags:
 *   name: Reservaciones
 *   description: API para gestionar las reservaciones
 */

// Crear una nueva reserva
/**
 * @swagger
 * /api/reservas:
 *   post:
 *     summary: Crea una nueva reserva
 *     tags: [Reservaciones]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               codigoReserva:
 *                 type: string
 *                 example: "RSV12345"
 *               fechaInicio:
 *                 type: string
 *                 format: date
 *                 example: "2024-10-28"
 *               fechaFinal:
 *                 type: string
 *                 format: date
 *                 example: "2024-11-02"
 *               user_id:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Reserva creada exitosamente
 *       500:
 *         description: Error al crear la reserva
 */
router.post('/', reservaController.createReserva);

// Obtener todas las reservas
/**
 * @swagger
 * /api/reservas:
 *   get:
 *     summary: Obtiene todas las reservas
 *     tags: [Reservaciones]
 *     responses:
 *       200:
 *         description: Lista de reservas
 *       500:
 *         description: Error al obtener las reservas
 */
router.get('/', reservaController.getAllReservas);

// Actualizar una reserva
/**
 * @swagger
 * /api/reservas/{id}:
 *   put:
 *     summary: Actualiza una reserva
 *     tags: [Reservaciones]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la reserva
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               codigoReserva:
 *                 type: string
 *                 example: "RSV54321"
 *               fechaInicio:
 *                 type: string
 *                 format: date
 *                 example: "2024-10-29"
 *               fechaFinal:
 *                 type: string
 *                 format: date
 *                 example: "2024-11-03"
 *     responses:
 *       200:
 *         description: Reserva actualizada exitosamente
 *       404:
 *         description: Reserva no encontrada
 *       500:
 *         description: Error al actualizar la reserva
 */
router.put('/:id', reservaController.updateReserva);

// Eliminar una reserva
/**
 * @swagger
 * /api/reservas/{id}:
 *   delete:
 *     summary: Elimina una reserva
 *     tags: [Reservaciones]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la reserva
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Reserva eliminada correctamente
 *       404:
 *         description: Reserva no encontrada
 *       500:
 *         description: Error al eliminar la reserva
 */
router.delete('/:id', reservaController.deleteReserva);

module.exports = router;
