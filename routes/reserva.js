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
 *     responses:
 *       201:
 *         description: Reserva creada exitosamente
 *       500:
 *         description: Error al crear la reserva
 */
router.post('/', reservaController.createReserva);

module.exports = router;
