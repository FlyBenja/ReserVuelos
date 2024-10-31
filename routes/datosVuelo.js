// routes/datosVuelo.js
const express = require('express');
const router = express.Router();
const datosVueloController = require('../controllers/datosVueloController');

/**
 * @swagger
 * tags:
 *   name: DatosVuelo
 *   description: API para gestionar los datos de vuelo
 */

// Crear un nuevo DatoVuelo solo con id_user
/**
 * @swagger
 * /api/datos-vuelo:
 *   post:
 *     summary: Crea un nuevo dato de vuelo
 *     tags: [DatosVuelo]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_user:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Dato de vuelo creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id_user:
 *                   type: integer
 *                   description: ID del usuario asociado
 *       500:
 *         description: Error al crear el dato de vuelo
 */
router.post('/', datosVueloController.createDatosVuelo);

// Asignar una reserva a un DatoVuelo existente
/**
 * @swagger
 * /api/datos-vuelo/{id}/reserva:
 *   post:
 *     summary: Asigna una reserva a un dato de vuelo existente
 *     tags: [DatosVuelo]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del dato de vuelo
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_reserva:
 *                 type: integer
 *                 example: 1
 *                 description: ID de la reserva asociada
 *               id_classvuelo:
 *                 type: integer
 *                 example: 2
 *                 description: ID de la clase de vuelo
 *               asiento:
 *                 type: string
 *                 example: "12A"
 *                 description: Número de asiento
 *               pasaporte:
 *                 type: string
 *                 example: "X1234567"
 *                 description: Número de pasaporte del pasajero
 *     responses:
 *       201:
 *         description: Reserva asignada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id_reserva:
 *                   type: integer
 *                 id_classvuelo:
 *                   type: integer
 *                 asiento:
 *                   type: string
 *                 pasaporte:
 *                   type: string
 *       404:
 *         description: Dato de vuelo no encontrado
 *       500:
 *         description: Error al asignar la reserva
 */
router.post('/:id/reserva', datosVueloController.assignReservaToDatosVuelo);

// Obtener todos los DatosVuelo
/**
 * @swagger
 * /api/datos-vuelo:
 *   get:
 *     summary: Obtiene todos los datos de vuelo
 *     tags: [DatosVuelo]
 *     responses:
 *       200:
 *         description: Lista de datos de vuelo
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id_user:
 *                     type: integer
 *                     description: ID del usuario asociado
 *                   pasaporte:
 *                     type: string
 *                   asiento:
 *                     type: string
 *                   reserva:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: ID de la reserva asociada
 *       500:
 *         description: Error al obtener los datos de vuelo
 */
router.get('/', datosVueloController.getAllDatosVuelo);

// Actualizar un DatoVuelo
/**
 * @swagger
 * /api/datos-vuelo/{id}:
 *   put:
 *     summary: Actualiza un dato de vuelo
 *     tags: [DatosVuelo]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del dato de vuelo
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               pasaporte:
 *                 type: string
 *                 example: "X1234567"
 *               asiento:
 *                 type: string
 *                 example: "12A"
 *     responses:
 *       200:
 *         description: Dato de vuelo actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 pasaporte:
 *                   type: string
 *                 asiento:
 *                   type: string
 *       404:
 *         description: Dato de vuelo no encontrado
 *       500:
 *         description: Error al actualizar el dato de vuelo
 */
router.put('/:id', datosVueloController.updateDatosVuelo);

// Eliminar un DatoVuelo
/**
 * @swagger
 * /api/datos-vuelo/{id}:
 *   delete:
 *     summary: Elimina un dato de vuelo
 *     tags: [DatosVuelo]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del dato de vuelo
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Dato de vuelo eliminado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "DatosVuelo eliminado correctamente"
 *       404:
 *         description: Dato de vuelo no encontrado
 *       500:
 *         description: Error al eliminar el dato de vuelo
 */
router.delete('/:id', datosVueloController.deleteDatosVuelo);

module.exports = router;
