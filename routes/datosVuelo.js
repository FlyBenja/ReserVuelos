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
 *               numero_vuelo:
 *                 type: string
 *                 example: "AB1234"
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
 *         description: Lista de datos de vuelo del usuario, incluyendo numero_vuelo
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
 *         description: Lista de datos de vuelo de la reserva, incluyendo numero_vuelo
 *       500:
 *         description: Error al obtener los datos de vuelo
 */
router.get('/reserva/:reserva_id', datosVueloController.getUsersByReserva);

// GET: Obtener toda la información de un DatoVuelo utilizando el id (llave primaria)
/**
 * @swagger
 * /api/datos-vuelo/{id}:
 *   get:
 *     summary: Obtiene toda la información de un dato de vuelo por ID, incluyendo numero_vuelo
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
 *         description: Información completa del dato de vuelo, incluyendo numero_vuelo
 *       404:
 *         description: Dato de vuelo no encontrado
 *       500:
 *         description: Error al obtener la información del dato de vuelo
 */
router.get('/:id', datosVueloController.getDatosVueloById);

// UPDATE: Actualizar solo el campo "status" de un DatoVuelo usando id
/**
 * @swagger
 * /api/datos-vuelo/{id}:
 *   put:
 *     summary: Actualiza solo el campo "status" de un dato de vuelo utilizando el id
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
 *               status:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Status actualizado exitosamente
 *       404:
 *         description: Dato de vuelo no encontrado
 *       500:
 *         description: Error al actualizar el dato de vuelo
 */
router.put('/:id', datosVueloController.updateDatosVuelo);

// DELETE: Eliminar un DatoVuelo usando id (llave primaria)
/**
 * @swagger
 * /api/datos-vuelo/{id}:
 *   delete:
 *     summary: Elimina un dato de vuelo utilizando el id (llave primaria)
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
 *         description: Dato de vuelo eliminado correctamente
 *       404:
 *         description: Dato de vuelo no encontrado
 *       500:
 *         description: Error al eliminar el dato de vuelo
 */
router.delete('/:id', datosVueloController.deleteDatosVuelo);

module.exports = router;
