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

// Ruta para crear un nuevo usuario
router.post('/', userController.createUser);

// Ruta para iniciar sesión
router.post('/login', userController.loginUser);

// Ruta para obtener el usuario autenticado a través del token
router.get('/me', authenticateToken(), userController.getUserByToken);

// Ruta para actualizar la contraseña del usuario autenticado
router.put('/me/password', authenticateToken(), userController.updatePassword);

// Ruta para actualizar el nombre de usuario del usuario autenticado
router.put('/me/username', authenticateToken(), userController.updateUsername);

module.exports = router;
