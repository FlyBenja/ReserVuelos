// routes/datosVueloRoutes.js
const express = require('express');
const router = express.Router();
const datosVueloController = require('../controllers/datosVueloController');
const { authenticateToken } = require('../Middleware/authenticateToken');

/**
 * @swagger
 * tags:
 *   name: DatosVuelo
 *   description: API para gestionar los datos de vuelo
 */

// Crear un nuevo DatoVuelo
/**
 * @swagger
 * /api/datos-vuelo:
 *   post:
 *     summary: Crea un nuevo dato de vuelo
 *     tags: [DatosVuelo]
 *     security:
 *       - bearerAuth: []
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
 *               pasaporte:
 *                 type: string
 *                 example: "X1234567"
 *               asiento:
 *                 type: string
 *                 example: "12A"
 *               reserva_id:
 *                 type: integer
 *                 example: 2
 *               id_classvuelo:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Dato de vuelo creado exitosamente
 *       500:
 *         description: Error al crear el dato de vuelo
 */
router.post('/', authenticateToken([1, 2]), datosVueloController.createDatosVuelo);

// Obtener todos los DatosVuelo
/**
 * @swagger
 * /api/datos-vuelo:
 *   get:
 *     summary: Obtiene todos los datos de vuelo
 *     tags: [DatosVuelo]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de datos de vuelo
 *       500:
 *         description: Error al obtener los datos de vuelo
 */
router.get('/', authenticateToken([1]), datosVueloController.getAllDatosVuelo);

// Actualizar un DatoVuelo
/**
 * @swagger
 * /api/datos-vuelo/{id}:
 *   put:
 *     summary: Actualiza un dato de vuelo
 *     tags: [DatosVuelo]
 *     security:
 *       - bearerAuth: []
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
 *       404:
 *         description: Dato de vuelo no encontrado
 *       500:
 *         description: Error al actualizar el dato de vuelo
 */
router.put('/:id', authenticateToken([1, 2]), datosVueloController.updateDatosVuelo);

// Eliminar un DatoVuelo
/**
 * @swagger
 * /api/datos-vuelo/{id}:
 *   delete:
 *     summary: Elimina un dato de vuelo
 *     tags: [DatosVuelo]
 *     security:
 *       - bearerAuth: []
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
 *       404:
 *         description: Dato de vuelo no encontrado
 *       500:
 *         description: Error al eliminar el dato de vuelo
 */
router.delete('/:id', authenticateToken([1]), datosVueloController.deleteDatosVuelo);

module.exports = router;
x