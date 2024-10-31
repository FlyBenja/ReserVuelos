// routes/datosVuelo.js
const express = require('express');
const router = express.Router();
const datosVueloController = require('../controllers/datosVueloController');

/**
 * @swagger
 * tags:
 *   name: DatosVuelo
 *   description: API para gestionar los datos de vuelo y sus reservas
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
 *       500:
 *         description: Error al crear el dato de vuelo
 */
router.post('/', datosVueloController.createDatosVuelo);

// Obtener pasajeros por reserva específica
/**
 * @swagger
 * /api/datos-vuelo/reserva/{id_reserva}:
 *   get:
 *     summary: Obtiene todos los pasajeros de una reserva específica
 *     tags: [DatosVuelo]
 *     parameters:
 *       - in: path
 *         name: id_reserva
 *         required: true
 *         description: ID de la reserva
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lista de pasajeros de la reserva
 *       404:
 *         description: Reserva no encontrada
 *       500:
 *         description: Error al obtener los datos de vuelo
 */
router.get('/reserva/:id_reserva', datosVueloController.getDatosVueloByReserva);

// Obtener todas las reservas de un usuario
/**
 * @swagger
 * /api/datos-vuelo/usuario/{id_user}:
 *   get:
 *     summary: Obtiene todas las reservas de un usuario específico
 *     tags: [DatosVuelo]
 *     parameters:
 *       - in: path
 *         name: id_user
 *         required: true
 *         description: ID del usuario
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lista de reservas del usuario
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error al obtener las reservas
 */
router.get('/usuario/:id_user', datosVueloController.getReservasByUser);

// Obtener información de un pasajero específico
/**
 * @swagger
 * /api/datos-vuelo/{id}:
 *   get:
 *     summary: Obtiene la información de un pasajero específico
 *     tags: [DatosVuelo]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del dato de vuelo (pasajero)
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Detalle del pasajero
 *       404:
 *         description: Pasajero no encontrado
 *       500:
 *         description: Error al obtener los datos del pasajero
 */
router.get('/:id', datosVueloController.getDatosVueloById);

// Actualizar un DatoVuelo
/**
 * @swagger
 * /api/datos-vuelo/{id}:
 *   put:
 *     summary: Actualiza la información de un dato de vuelo
 *     tags: [DatosVuelo]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del dato de vuelo a actualizar
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
 *               estado:
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
router.put('/:id', datosVueloController.updateDatosVuelo);

// Eliminar un DatoVuelo
/**
 * @swagger
 * /api/datos-vuelo/{id}:
 *   delete:
 *     summary: Elimina un dato de vuelo específico
 *     tags: [DatosVuelo]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del dato de vuelo a eliminar
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Dato de vuelo eliminado exitosamente
 *       404:
 *         description: Dato de vuelo no encontrado
 *       500:
 *         description: Error al eliminar el dato de vuelo
 */
router.delete('/:id', datosVueloController.deleteDatosVuelo);

module.exports = router;
