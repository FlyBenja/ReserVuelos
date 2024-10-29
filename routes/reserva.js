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
 *               fechaReserva:
 *                 type: string
 *                 format: date
 *                 example: "2024-10-28"
 *               claseVueloId:
 *                 type: integer
 *                 example: 1
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
 * /api/reservas/{id}/pasajeros:
 *   post:
 *     summary: Agrega pasajeros a una reserva existente
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
 *               pasajeros:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     nombre:
 *                       type: string
 *                       example: "Juan Pérez"
 *                     pasaporte:
 *                       type: string
 *                       example: "A1234567"
 *                     asiento:
 *                       type: string
 *                       example: "12A"
 *                     role:
 *                       type: string
 *                       example: "Cliente"
 *                     token:
 *                       type: string
 *                       example: "token_de_autenticacion"
 *     responses:
 *       201:
 *         description: Pasajeros agregados a la reserva
 *       404:
 *         description: Reserva no encontrada
 *       500:
 *         description: Error al agregar pasajeros
 */
router.post('/:id/pasajeros', reservaController.addPasajeros);

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
 * /api/reservas/{id}:
 *   get:
 *     summary: Obtiene una reserva por ID
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
 *         description: Reserva encontrada
 *       404:
 *         description: Reserva no encontrada
 */
router.get('/:id', reservaController.getReservaById);

/**
 * @swagger
 * /api/reservas/{id}:
 *   put:
 *     summary: Actualiza una reserva por ID
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
 *                 example: "RSV12345"
 *               fechaReserva:
 *                 type: string
 *                 format: date
 *                 example: "2024-10-29"
 *               claseVueloId:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       200:
 *         description: Reserva actualizada exitosamente
 *       404:
 *         description: Reserva no encontrada
 *       400:
 *         description: Error.- Código de reserva ya existe
 */
router.put('/:id', reservaController.updateReserva);

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
 */
router.delete('/:id', reservaController.deleteReserva);

module.exports = router;
