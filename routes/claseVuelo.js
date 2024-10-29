const express = require('express');
const router = express.Router();
const { ClaseVuelo } = require('../models');

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
router.post('/', async (req, res) => {
  try {
    const { nombreClase } = req.body;

    // Verificar si la clase de vuelo ya existe
    const claseExistente = await ClaseVuelo.findOne({ where: { nombreClase } });
    if (claseExistente) {
      return res.status(400).json({ error: "Error.- Clase de Vuelo ya creada" });
    }

    // Crear la nueva clase de vuelo
    const claseVuelo = await ClaseVuelo.create({ nombreClase });
    res.status(201).json(claseVuelo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /api/clases-vuelo:
 *   get:
 *     summary: Obtiene todas las clases de vuelo
 *     tags: [Clases de Vuelo]
 *     responses:
 *       200:
 *         description: Lista de clases de vuelo
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   nombreClase:
 *                     type: string
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 */
router.get('/', async (req, res) => {
  try {
    const clasesVuelo = await ClaseVuelo.findAll();
    res.status(200).json(clasesVuelo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
