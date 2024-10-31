// routes/reserva.js
const express = require('express');
const router = express.Router();
const reservaController = require('../controllers/reservaController');

/**
 * @swagger
 * tags:
 *   name: Reservaciones
 *   description: API para gestionar las reservaciones
 */

// Crear una reserva
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
 *     responses:
 *       201:
 *         description: Reserva creada exitosamente
 *       400:
 *         description: Error.- Código de reserva ya existe
 *       500:
 *         description: Error al crear la reserva
 */
router.post('/', reservaController.createReserva);

// Actualizar una reserva
/**
 * @swagger
 * /api/reservas/{id}:
 *   put:
 *     summary: Actualiza una reserva sin pasajeros
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

// Obtener todas las reservas
/**
 * @swagger
 * /api/reservas:
 *   get:
 *     summary: Obtiene todas las reservas sin pasajeros
 *     tags: [Reservaciones]
 *     responses:
 *       200:
 *         description: Lista de reservas
 *       500:
 *         description: Error al obtener reservas
 */
router.get('/', reservaController.getAllReservas);

// Agregar un pasajero a una reserva
/**
 * @swagger
 * /api/reservas/{id}/pasajero:
 *   post:
 *     summary: Agrega un pasajero a una reserva existente
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
 *               user_id:
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
 *               status:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       201:
 *         description: Pasajero agregado a la reserva
 *       404:
 *         description: Reserva no encontrada
 *       500:
 *         description: Error al agregar pasajero
 */
router.post('/:id/pasajero', reservaController.addPasajeroToReserva);

// Obtener todos los pasajeros de una reserva
/**
 * @swagger
 * /api/reservas/{id}/pasajeros:
 *   get:
 *     summary: Obtiene todos los pasajeros de una reserva
 *     tags: [Reservaciones]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la reserva
 *     responses:
 *       200:
 *         description: Lista de pasajeros
 *       404:
 *         description: Reserva no encontrada
 *       500:
 *         description: Error al obtener pasajeros
 */
router.get('/:id/pasajeros', reservaController.getPasajerosByReserva);

// Obtener todas las reservas de un pasajero específico
/**
 * @swagger
 * /api/reservas/pasajero/{pasajeroId}:
 *   get:
 *     summary: Obtiene todas las reservas de un pasajero
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
 *       500:
 *         description: Error al obtener reservas
 */
router.get('/pasajero/:pasajeroId', reservaController.getReservasByPasajeroId);

// Actualizar el estatus de un pasajero
/**
 * @swagger
 * /api/reservas/pasajeros/{pasajeroId}/status:
 *   put:
 *     summary: Actualiza el estatus de un pasajero
 *     tags: [Reservaciones]
 *     parameters:
 *       - in: path
 *         name: pasajeroId
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
 *               status:
 *                 type: boolean
 *                 example: false
 *     responses:
 *       200:
 *         description: Estatus del pasajero actualizado
 *       404:
 *         description: Pasajero no encontrado
 *       500:
 *         description: Error al actualizar el estatus
 */
router.put('/pasajeros/:pasajeroId/status', reservaController.updatePasajeroStatus);

// Eliminar una reserva
/**
 * @swagger
 * /api/reservas/{id}:
 *   delete:
 *     summary: Elimina una reserva por ID
 *     tags: [Reservaciones]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la reserva
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
