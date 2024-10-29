const express = require('express');
const router = express.Router();
const { Reserva, Pasajero, ClaseVuelo } = require('../models');

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
 *     summary: Crea una nueva reserva con sus pasajeros
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
 *     responses:
 *       201:
 *         description: Reserva creada exitosamente
 *       400:
 *         description: Error.- Datos inválidos o faltantes
 *       500:
 *         description: Error al crear la reserva
 */
router.post('/', async (req, res) => {
  try {
    const { codigoReserva, fechaReserva, claseVueloId, pasajeros } = req.body;

    // Crear la nueva reserva con los pasajeros asociados
    const reserva = await Reserva.create(
      {
        codigoReserva,
        fechaReserva,
        claseVueloId,
        pasajeros,
      },
      {
        include: [{ model: Pasajero, as: 'pasajeros' }],
      }
    );
    res.status(201).json(reserva);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /api/reservas:
 *   get:
 *     summary: Obtiene todas las reservas
 *     tags: [Reservaciones]
 *     responses:
 *       200:
 *         description: Lista de reservas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   codigoReserva:
 *                     type: string
 *                   fechaReserva:
 *                     type: string
 *                     format: date
 *                   claseVuelo:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       nombreClase:
 *                         type: string
 *                   pasajeros:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                         nombre:
 *                           type: string
 *                         pasaporte:
 *                           type: string
 *                         asiento:
 *                           type: string
 *       500:
 *         description: Error al obtener las reservas
 */
router.get('/', async (req, res) => {
  try {
    const reservas = await Reserva.findAll({
      include: [
        { model: Pasajero, as: 'pasajeros' },
        { model: ClaseVuelo, as: 'claseVuelo' },
      ],
    });
    res.status(200).json(reservas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
