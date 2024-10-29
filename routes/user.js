// routes/user.js

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API para gestionar los usuarios y autenticación
 */

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Crea un nuevo usuario
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: "juan123"
 *               password:
 *                 type: string
 *                 example: "miContraseñaSegura"
 *               roleId:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente
 *       400:
 *         description: Error.- Usuario o rol no encontrado
 *       500:
 *         description: Error al crear el usuario
 */
router.post('/', userController.createUser);

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Inicia sesión y devuelve un JWT
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: "juan123"
 *               password:
 *                 type: string
 *                 example: "miContraseñaSegura"
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso
 *       401:
 *         description: Credenciales incorrectas
 *       500:
 *         description: Error al iniciar sesión
 */
router.post('/login', userController.loginUser);

module.exports = router;
