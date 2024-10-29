// routes/role.js

const express = require('express');
const router = express.Router();
const roleController = require('../controllers/roleController');

/**
 * @swagger
 * tags:
 *   name: Roles
 *   description: API para gestionar los roles
 */

/**
 * @swagger
 * /api/roles:
 *   post:
 *     summary: Crea un nuevo rol
 *     tags: [Roles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombreRole:
 *                 type: string
 *                 example: "Admin"
 *     responses:
 *       201:
 *         description: Rol creado exitosamente
 *       400:
 *         description: Error.- Rol ya registrado
 *       500:
 *         description: Error al crear el rol
 */
router.post('/', roleController.createRole);

/**
 * @swagger
 * /api/roles:
 *   get:
 *     summary: Obtiene todos los roles
 *     tags: [Roles]
 *     responses:
 *       200:
 *         description: Lista de roles
 */
router.get('/', roleController.getRoles);

/**
 * @swagger
 * /api/roles/{id}:
 *   get:
 *     summary: Obtiene un rol por ID
 *     tags: [Roles]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del rol
 *     responses:
 *       200:
 *         description: Rol encontrado
 *       404:
 *         description: Rol no encontrado
 */
router.get('/:id', roleController.getRoleById);

/**
 * @swagger
 * /api/roles/{id}:
 *   put:
 *     summary: Actualiza un rol
 *     tags: [Roles]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del rol
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombreRole:
 *                 type: string
 *                 example: "User"
 *     responses:
 *       200:
 *         description: Rol actualizado correctamente
 *       404:
 *         description: Rol no encontrado
 */
router.put('/:id', roleController.updateRole);

/**
 * @swagger
 * /api/roles/{id}:
 *   delete:
 *     summary: Elimina un rol
 *     tags: [Roles]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del rol
 *     responses:
 *       200:
 *         description: Rol eliminado correctamente
 *       404:
 *         description: Rol no encontrado
 */
router.delete('/:id', roleController.deleteRole);

module.exports = router;
