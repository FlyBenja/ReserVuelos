const express = require('express');
const router = express.Router();
const reservaController = require('../controllers/reservaController');

/**
 * @swagger
 * tags:
 *   name: Reservaciones
 *   description: API para gestionar las reservaciones
 */

/**
 * @swagger
 * /api/reservas:
 *   post:
 *     summary: Crea una nueva reserva sin pasajeros
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
 *               status:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       201:
 *         description: Reserva creada exitosamente
 *       400:
 *         description: Error.- Código de reserva ya existe
 *       500:
 *         description: Error al crear la reserva
 */
router.post('/', reservaController.createReserva);

/**
 * @swagger
 * /api/reservas/{id}/pasajero:
 *   post:
 *     summary: Agrega un pasajero existente a una reserva con detalles adicionales
 *     tags: [Reservaciones]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la reserva
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               pasajeroId:
 *                 type: integer
 *                 example: 1
 *               pasaporte:
 *                 type: string
 *                 example: "A1234567"
 *               asiento:
 *                 type: string
 *                 example: "12A"
 *               numeroVuelo:
 *                 type: string
 *                 example: "AB123"
 *               claseVuelo:
 *                 type: string
 *                 example: "Primera Clase"
 *     responses:
 *       201:
 *         description: Pasajero agregado a la reserva con detalles
 *       404:
 *         description: Reserva o pasajero no encontrado
 *       500:
 *         description: Error al agregar pasajero
 */
router.post('/:id/pasajero', reservaController.addPasajeroToReserva);

/**
 * @swagger
 * /api/reservas:
 *   get:
 *     summary: Obtiene todas las reservas
 *     tags: [Reservaciones]
 *     responses:
 *       200:
 *         description: Lista de reservas
 */
router.get('/', reservaController.getReservas);

/**
 * @swagger
 * /api/reservas/pasajero/{pasajeroId}:
 *   get:
 *     summary: Obtiene todas las reservas en las que participa un pasajero por ID de pasajero
 *     tags: [Reservaciones]
 *     parameters:
 *       - in: path
 *         name: pasajeroId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del pasajero
 *     responses:
 *       200:
 *         description: Lista de reservas del pasajero
 *       404:
 *         description: No se encontraron reservas para el pasajero
 */
router.get('/pasajero/:pasajeroId', reservaController.getReservasByPasajeroId);

/**
 * @swagger
 * /api/reservas/{id}/status:
 *   put:
 *     summary: Actualiza el estatus de una reserva
 *     tags: [Reservaciones]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la reserva
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: boolean
 *                 example: false
 *     responses:
 *       200:
 *         description: Estatus de la reserva actualizado exitosamente
 *       404:
 *         description: Reserva no encontrada
 *       500:
 *         description: Error al actualizar el estatus de la reserva
 */
router.put('/:id/status', reservaController.updateReservaStatus);

module.exports = router;
