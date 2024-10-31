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

// POST: Crear un nuevo DatoVuelo con todos los campos necesarios
/**
 * @swagger
 * /api/datos-vuelo:
 *   post:
 *     summary: Crea un nuevo dato de vuelo con todos los campos requeridos
 *     tags: [DatosVuelo]
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
 *               reserva_id:
 *                 type: integer
 *                 example: 1
 *               clasevuelo_id:
 *                 type: integer
 *                 example: 2
 *               pasaporte:
 *                 type: string
 *                 example: "X1234567"
 *               asiento:
 *                 type: string
 *                 example: "12A"
 *               status:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       201:
 *         description: Dato de vuelo creado exitosamente
 *       500:
 *         description: Error al crear el dato de vuelo
 */
router.post('/', datosVueloController.createDatosVuelo);

// GET: Obtener todas las reservas de un usuario (user_id)
/**
 * @swagger
 * /api/datos-vuelo/usuario/{user_id}:
 *   get:
 *     summary: Obtiene todas las reservas asociadas a un usuario
 *     tags: [DatosVuelo]
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         description: ID del usuario
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lista de datos de vuelo del usuario
 *       500:
 *         description: Error al obtener los datos de vuelo
 */
router.get('/usuario/:user_id', datosVueloController.getReservasByUser);

// GET: Obtener todos los usuarios de una reserva específica (reserva_id)
/**
 * @swagger
 * /api/datos-vuelo/reserva/{reserva_id}:
 *   get:
 *     summary: Obtiene todos los usuarios asociados a una reserva
 *     tags: [DatosVuelo]
 *     parameters:
 *       - in: path
 *         name: reserva_id
 *         required: true
 *         description: ID de la reserva
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lista de datos de vuelo de la reserva
 *       500:
 *         description: Error al obtener los datos de vuelo
 */
router.get('/reserva/:reserva_id', datosVueloController.getUsersByReserva);

// UPDATE: Actualizar un DatoVuelo usando user_id y reserva_id
/**
 * @swagger
 * /api/datos-vuelo/{user_id}/{reserva_id}:
 *   put:
 *     summary: Actualiza un dato de vuelo utilizando user_id y reserva_id
 *     tags: [DatosVuelo]
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         description: ID del usuario
 *         schema:
 *           type: integer
 *       - in: path
 *         name: reserva_id
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
 *               clasevuelo_id:
 *                 type: integer
 *                 example: 2
 *               pasaporte:
 *                 type: string
 *                 example: "X1234567"
 *               asiento:
 *                 type: string
 *                 example: "12A"
 *               status:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Dato de vuelo actualizado exitosamente
 *       404:
 *         description: Dato de vuelo no encontrado
 *       500:
 *         description: Error al actualizar el dato de vuelo
 */
router.put('/:user_id/:reserva_id', datosVueloController.updateDatosVuelo);

// DELETE: Eliminar un DatoVuelo usando user_id y reserva_id
/**
 * @swagger
 * /api/datos-vuelo/{user_id}/{reserva_id}:
 *   delete:
 *     summary: Elimina un dato de vuelo utilizando user_id y reserva_id
 *     tags: [DatosVuelo]
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         description: ID del usuario
 *         schema:
 *           type: integer
 *       - in: path
 *         name: reserva_id
 *         required: true
 *         description: ID de la reserva
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Dato de vuelo eliminado correctamente
 *       404:
 *         description: Dato de vuelo no encontrado
 *       500:
 *         description: Error al eliminar el dato de vuelo
 */
router.delete('/:user_id/:reserva_id', datosVueloController.deleteDatosVuelo);

module.exports = router;
