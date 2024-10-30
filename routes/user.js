const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authenticateToken = require('../Middleware/authenticateToken');

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
 *                 example: "benja"
 *               password:
 *                 type: string
 *                 example: "admin"
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
 *                 example: "benja"
 *               password:
 *                 type: string
 *                 example: "admin"
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso
 *       401:
 *         description: Credenciales incorrectas
 *       500:
 *         description: Error al iniciar sesión
 */
router.post('/login', userController.loginUser);

/**
 * @swagger
 * /api/users/me:
 *   get:
 *     summary: Obtiene el usuario autenticado usando el token
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Usuario encontrado
 *       404:
 *         description: Usuario no encontrado
 */
router.get('/me', authenticateToken(), userController.getUserByToken);

/**
 * @swagger
 * /api/users/me/password:
 *   put:
 *     summary: Actualiza la contraseña del usuario autenticado
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               currentPassword:
 *                 type: string
 *                 example: "contraseña_actual"
 *               newPassword:
 *                 type: string
 *                 example: "nueva_contraseña"
 *               confirmPassword:
 *                 type: string
 *                 example: "nueva_contraseña"
 *     responses:
 *       200:
 *         description: Contraseña actualizada correctamente
 *       404:
 *         description: Usuario no encontrado
 *       401:
 *         description: La contraseña actual es incorrecta
 *       400:
 *         description: Las contraseñas no coinciden
 *       500:
 *         description: Error al actualizar la contraseña
 */
router.put('/me/password', authenticateToken(), userController.updatePassword);

/**
 * @swagger
 * /api/users/me/username:
 *   put:
 *     summary: Actualiza el nombre de usuario del usuario autenticado
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               newUsername:
 *                 type: string
 *                 example: "nuevo_nombre"
 *     responses:
 *       200:
 *         description: Nombre de usuario actualizado correctamente
 *       404:
 *         description: Usuario no encontrado
 *       400:
 *         description: Error.- Nombre de usuario ya registrado
 *       500:
 *         description: Error al actualizar el nombre de usuario
 */
router.put('/me/username', authenticateToken(), userController.updateUsername);

module.exports = router;
