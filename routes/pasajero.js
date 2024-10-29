const express = require('express');
const router = express.Router();
const pasajeroController = require('../controllers/pasajeroController');
const authenticateToken = require('../Middleware/authenticateToken'); // Middleware para proteger rutas

/**
 * @swagger
 * tags:
 *   name: Pasajeros
 *   description: API para gestionar los pasajeros de las reservas
 */

// Ruta de login para obtener un JWT
/**
 * @swagger
 * /api/pasajeros/login:
 *   post:
 *     summary: Inicia sesión de pasajero y devuelve un JWT
 *     tags: [Pasajeros]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               usuario:
 *                 type: string
 *                 example: "juan123"
 *               contraseña:
 *                 type: string
 *                 example: "miContraseñaSegura"
 *     responses:
 *       200:
 *         description: Login exitoso, devuelve un JWT
 *       401:
 *         description: Credenciales incorrectas
 *       500:
 *         description: Error del servidor
 */
router.post('/login', pasajeroController.loginPasajero);

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
 *               nombre:
 *                 type: string
 *                 example: "Juan Pérez"
 *               pasaporte:
 *                 type: string
 *                 example: "A1234567"
 *               asiento:
 *                 type: string
 *                 example: "12A"
 *               usuario:
 *                 type: string
 *                 example: "juan123"
 *               contraseña:
 *                 type: string
 *                 example: "miContraseñaSegura"
 *               role:
 *                 type: string
 *                 example: "Cliente"
 *     responses:
 *       201:
 *         description: Pasajero creado exitosamente
 *       400:
 *         description: Error.- Usuario o pasaporte ya registrado
 *       500:
 *         description: Error al crear el pasajero
 */
router.post('/', pasajeroController.createPasajero);

// Obtener todos los pasajeros (protegida)
/**
 * @swagger
 * /api/pasajeros:
 *   get:
 *     summary: Obtiene todos los pasajeros
 *     tags: [Pasajeros]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de pasajeros
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error al obtener los pasajeros
 */
router.get('/', authenticateToken, pasajeroController.getPasajeros);

// Obtener un pasajero por ID (protegida)
/**
 * @swagger
 * /api/pasajeros/{id}:
 *   get:
 *     summary: Obtiene un pasajero por ID
 *     tags: [Pasajeros]
 *     security:
 *       - bearerAuth: []
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
 *       401:
 *         description: No autorizado
 */
router.get('/:id', authenticateToken, pasajeroController.getPasajeroById);

// Actualizar un pasajero por ID (protegida)
/**
 * @swagger
 * /api/pasajeros/{id}:
 *   put:
 *     summary: Actualiza un pasajero por ID
 *     tags: [Pasajeros]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del pasajero
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: "Juan Pérez"
 *               pasaporte:
 *                 type: string
 *                 example: "A1234567"
 *               asiento:
 *                 type: string
 *                 example: "12A"
 *               usuario:
 *                 type: string
 *                 example: "juan123"
 *               contraseña:
 *                 type: string
 *                 example: "miNuevaContraseña"
 *               role:
 *                 type: string
 *                 example: "Cliente"
 *     responses:
 *       200:
 *         description: Pasajero actualizado exitosamente
 *       404:
 *         description: Pasajero no encontrado
 *       400:
 *         description: Error.- Usuario o pasaporte ya registrado
 *       401:
 *         description: No autorizado
 */
router.put('/:id', authenticateToken, pasajeroController.updatePasajero);

// Eliminar el campo reservaId de un pasajero, sin eliminar el pasajero completo (protegida)
/**
 * @swagger
 * /api/pasajeros/{id}/reservaId:
 *   delete:
 *     summary: Elimina la reservaId de un pasajero sin eliminar el pasajero
 *     tags: [Pasajeros]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del pasajero
 *     responses:
 *       200:
 *         description: reservaId eliminado correctamente
 *       404:
 *         description: Pasajero no encontrado
 *       401:
 *         description: No autorizado
 */
router.delete('/:id/reservaId', authenticateToken, pasajeroController.removeReservaId);

module.exports = router;
