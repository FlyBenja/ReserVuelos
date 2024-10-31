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

// Primer POST: Crear un nuevo DatoVuelo solo con id_user
/**
 * @swagger
 * /api/datos-vuelo:
 *   post:
 *     summary: Crea un nuevo dato de vuelo con id_user solamente
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
 *     responses:
 *       201:
 *         description: Dato de vuelo creado exitosamente
 *       500:
 *         description: Error al crear el dato de vuelo
 */
router.post('/', datosVueloController.createBasicDatosVuelo);

// Segundo POST: Actualizar un DatoVuelo con reserva, clase de vuelo, pasaporte, asiento y status
/**
 * @swagger
 * /api/datos-vuelo/{id}/detalles:
 *   post:
 *     summary: Actualiza un DatoVuelo existente con detalles de vuelo
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
 *       200:
 *         description: Dato de vuelo actualizado con éxito
 *       404:
 *         description: Dato de vuelo no encontrado
 *       500:
 *         description: Error al actualizar el dato de vuelo
 */
router.post('/:id/detalles', datosVueloController.updateDatosVueloDetails);

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
 *       500:
 *         description: Error al obtener los datos de vuelo
 */
router.get('/', datosVueloController.getAllDatosVuelo);

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
 *         description: ID del dato de vuelo
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Información del pasajero
 *       404:
 *         description: Dato de vuelo no encontrado
 *       500:
 *         description: Error al obtener el dato de vuelo
 */
router.get('/:id', datosVueloController.getDatosVueloById);

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
 *         description: Dato de vuelo eliminado correctamente
 *       404:
 *         description: Dato de vuelo no encontrado
 *       500:
 *         description: Error al eliminar el dato de vuelo
 */
router.delete('/:id', datosVueloController.deleteDatosVuelo);

module.exports = router;
