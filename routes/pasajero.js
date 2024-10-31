const express = require('express');
const router = express.Router();
const pasajeroController = require('../controllers/pasajeroController');

/**
 * @swagger
 * tags:
 *   name: Pasajeros
 *   description: API para gestionar los pasajeros
 */

// Obtener todos los pasajeros
/**
 * @swagger
 * /api/pasajeros:
 *   get:
 *     summary: Obtiene todos los pasajeros
 *     tags: [Pasajeros]
 *     responses:
 *       200:
 *         description: Lista de pasajeros
 */
router.get('/', pasajeroController.getPasajeros);

// Obtener un pasajero por ID
/**
 * @swagger
 * /api/pasajeros/{id}:
 *   get:
 *     summary: Obtiene un pasajero por ID
 *     tags: [Pasajeros]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del pasajero
 *     responses:
 *       200:
 *         description: Pasajero encontrado
 *       404:
 *         description: Pasajero no encontrado
 */
router.get('/:id', pasajeroController.getPasajeroById);

// Crear un nuevo pasajero
/**
 * @swagger
 * /api/pasajeros:
 *   post:
 *     summary: Crea un nuevo pasajero
 *     tags: [Pasajeros]
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
 *         description: Pasajero creado exitosamente
 *       400:
 *         description: Error.- Usuario ya registrado
 *       500:
 *         description: Error al crear el pasajero
 */
router.post('/', async (req, res) => {
  const { user_id } = req.body;
  if (!user_id) {
    return res.status(400).json({ error: 'El campo user_id es obligatorio.' });
  }
  try {
    const nuevoPasajero = await pasajeroController.createPasajeroForUser(user_id);
    return res.status(201).json(nuevoPasajero);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Eliminar un pasajero por ID
/**
 * @swagger
 * /api/pasajeros/{id}:
 *   delete:
 *     summary: Elimina un pasajero por ID
 *     tags: [Pasajeros]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del pasajero
 *     responses:
 *       200:
 *         description: Pasajero eliminado correctamente
 *       404:
 *         description: Pasajero no encontrado
 *       500:
 *         description: Error al eliminar el pasajero
 */
router.delete('/:id', pasajeroController.deletePasajero);

module.exports = router;
