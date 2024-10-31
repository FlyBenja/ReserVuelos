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

module.exports = router;
