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
 *               observaciones:
 *                 type: string
 *                 example: "Observaciones adicionales sobre el vuelo"
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
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   user_id:
 *                     type: integer
 *                   reserva_id:
 *                     type: integer
 *                   clasevuelo_id:
 *                     type: integer
 *                   pasaporte:
 *                     type: string
 *                   asiento:
 *                     type: string
 *                   numero_vuelo:
 *                     type: string
 *                   observaciones:
 *                     type: string
 *                   status:
 *                     type: boolean
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
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   user_id:
 *                     type: integer
 *                   reserva_id:
 *                     type: integer
 *                   clasevuelo_id:
 *                     type: integer
 *                   pasaporte:
 *                     type: string
 *                   asiento:
 *                     type: string
 *                   numero_vuelo:
 *                     type: string
 *                   observaciones:
 *                     type: string
 *                   status:
 *                     type: boolean
 *       500:
 *         description: Error al obtener los datos de vuelo
 */
router.get('/reserva/:reserva_id', datosVueloController.getUsersByReserva);

// GET: Obtener toda la información de un DatoVuelo utilizando el id
/**
 * @swagger
 * /api/datos-vuelo/{id}:
 *   get:
 *     summary: Obtiene toda la información de un dato de vuelo por ID
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
 *         description: Información completa del dato de vuelo
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 user_id:
 *                   type: integer
 *                 reserva_id:
 *                   type: integer
 *                 clasevuelo_id:
 *                   type: integer
 *                 pasaporte:
 *                   type: string
 *                 asiento:
 *                   type: string
 *                 numero_vuelo:
 *                   type: string
 *                 observaciones:
 *                   type: string
 *                 status:
 *                   type: boolean
 *       404:
 *         description: Dato de vuelo no encontrado
 *       500:
 *         description: Error al obtener la información del dato de vuelo
 */
router.get('/:id', datosVueloController.getDatosVueloById);

// UPDATE: Actualizar los campos "status" y "observaciones" de un DatoVuelo usando id
/**
 * @swagger
 * /api/datos-vuelo/{id}:
 *   put:
 *     summary: Actualiza los campos "status" y "observaciones" de un dato de vuelo utilizando el id
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
 *               observaciones:
 *                 type: string
 *                 example: "Actualización en las observaciones del vuelo"
 *     responses:
 *       200:
 *         description: Dato de vuelo actualizado exitosamente
 *       404:
 *         description: Dato de vuelo no encontrado
 *       500:
 *         description: Error al actualizar los datos de vuelo
 */
router.put('/:id', datosVueloController.updateDatosVuelo);

// DELETE: Eliminar un DatoVuelo usando id (llave primaria)
/**
 * @swagger
 * /api/datos-vuelo/{id}:
 *   delete:
 *     summary: Elimina un dato de vuelo utilizando el id
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
