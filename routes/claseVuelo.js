const express = require('express');
const router = express.Router();
const claseVueloController = require('../controllers/claseVueloController');

/**
 * @swagger
 * tags:
 *   name: Clases de Vuelo
 *   description: API para gestionar las clases de vuelo
 */

/**
 * @swagger
 * /api/clases-vuelo:
 *   post:
 *     summary: Crea una nueva clase de vuelo
 *     tags: [Clases de Vuelo]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombreClase:
 *                 type: string
 *                 example: "Económica"
 *     responses:
 *       201:
 *         description: Clase de vuelo creada exitosamente
 *       400:
 *         description: Error.- Clase de Vuelo ya creada
 *       500:
 *         description: Error al crear la clase de vuelo
 */
router.post('/', claseVueloController.createClaseVuelo);

/**
 * @swagger
 * /api/clases-vuelo:
 *   get:
 *     summary: Obtiene todas las clases de vuelo
 *     tags: [Clases de Vuelo]
 *     responses:
 *       200:
 *         description: Lista de clases de vuelo
 */
router.get('/', claseVueloController.getClasesVuelo);

/**
 * @swagger
 * /api/clases-vuelo/{id}:
 *   get:
 *     summary: Obtiene una clase de vuelo por ID
 *     tags: [Clases de Vuelo]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la clase de vuelo
 *     responses:
 *       200:
 *         description: Clase de vuelo encontrada
 *       404:
 *         description: Clase de vuelo no encontrada
 */
router.get('/:id', claseVueloController.getClaseVueloById);

/**
 * @swagger
 * /api/clases-vuelo/{id}:
 *   put:
 *     summary: Actualiza una clase de vuelo por ID
 *     tags: [Clases de Vuelo]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la clase de vuelo
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombreClase:
 *                 type: string
 *                 example: "Primera Clase"
 *     responses:
 *       200:
 *         description: Clase de vuelo actualizada exitosamente
 *       404:
 *         description: Clase de vuelo no encontrada
 *       400:
 *         description: Error.- Clase de Vuelo ya creada con ese nombre
 */
router.put('/:id', claseVueloController.updateClaseVuelo);

/**
 * @swagger
 * /api/clases-vuelo/{id}:
 *   delete:
 *     summary: Elimina una clase de vuelo por ID
 *     tags: [Clases de Vuelo]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la clase de vuelo
 *     responses:
 *       200:
 *         description: Clase de vuelo eliminada correctamente
 *       404:
 *         description: Clase de vuelo no encontrada
 */
router.delete('/:id', claseVueloController.deleteClaseVuelo);

module.exports = router;
