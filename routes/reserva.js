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

// Agregar pasajero a la reserva
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

// Obtener todas las reservas junto con los pasajeros
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
router.get('/', reservaController.getReservasWithPasajeros);

// Obtener pasajeros de una reserva específica
/**
 * @swagger
 * /api/reservas/{id}/pasajeros:
 *   get:
 *     summary: Obtiene todos los pasajeros de una reserva específica
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
 *         description: Lista de pasajeros de la reserva
 *       404:
 *         description: Reserva no encontrada
 */
router.get('/:id/pasajeros', reservaController.getPasajerosByReservaId);

module.exports = router;
