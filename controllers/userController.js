// controllers/userController.js
const { User, Role } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pasajeroController = require('./pasajeroController'); // Importa el controlador de Pasajero
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

module.exports = {
  // Crear un nuevo usuario y un pasajero relacionado
  async createUser(req, res) {
    try {
      const { username, password, roleId } = req.body;

      // Verificar si el usuario ya existe
      const userExistente = await User.findOne({ where: { username } });
      if (userExistente) {
        return res.status(400).json({ error: 'Error.- Usuario ya registrado' });
      }

      // Hashear la contraseña
      const hashedPassword = await bcrypt.hash(password, 10);

      // Crear el nuevo usuario
      const newUser = await User.create({
        username,
        password: hashedPassword,
        roleId,
      });

      // Crear automáticamente un pasajero relacionado con el nuevo usuario
      await pasajeroController.createPasajeroForUser(newUser.id);

      return res.status(201).json(newUser);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // Login de usuario
  async loginUser(req, res) {
    try {
      const { username, password } = req.body;

      // Buscar el usuario
      const user = await User.findOne({ where: { username } });
      if (!user) {
        return res.status(401).json({ error: 'Credenciales incorrectas' });
      }

      // Verificar la contraseña
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Credenciales incorrectas' });
      }

      // Crear el token JWT
      const token = jwt.sign({ id: user.id, roleId: user.roleId }, JWT_SECRET, { expiresIn: '1h' });

      return res.status(200).json({ token });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // Obtener un usuario por ID
  async getUserById(req, res) {
    try {
      const { id } = req.params;

      const user = await User.findByPk(id, {
        include: [{ model: Role, as: 'role' }],
      });

      if (!user) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }

      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // Actualizar contraseña del usuario
  async updatePassword(req, res) {
    try {
      const { id } = req.params;
      const { currentPassword, newPassword, confirmPassword } = req.body;

      // Verificar que la nueva contraseña y la confirmación coinciden
      if (newPassword !== confirmPassword) {
        return res.status(400).json({ error: 'Las contraseñas no coinciden' });
      }

      // Buscar el usuario y verificar la contraseña actual
      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }

      const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.password);
      if (!isCurrentPasswordValid) {
        return res.status(401).json({ error: 'La contraseña actual es incorrecta' });
      }

      // Hashear la nueva contraseña
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      // Actualizar la contraseña
      user.password = hashedPassword;
      await user.save();

      return res.status(200).json({ message: 'Contraseña actualizada correctamente' });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // Actualizar nombre de usuario
  async updateUsername(req, res) {
    try {
      const { id } = req.params;
      const { newUsername } = req.body;

      // Verificar si el nuevo nombre de usuario ya está en uso
      const usernameExistente = await User.findOne({ where: { username: newUsername } });
      if (usernameExistente) {
        return res.status(400).json({ error: 'Error.- Nombre de usuario ya registrado' });
      }

      // Buscar el usuario y actualizar el nombre de usuario
      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }

      user.username = newUsername;
      await user.save();

      return res.status(200).json({ message: 'Nombre de usuario actualizado correctamente' });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
};
