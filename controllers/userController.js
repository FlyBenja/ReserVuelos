const { User, Role } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pasajeroController = require('./pasajeroController');
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

module.exports = {
  // Crear un nuevo usuario y un pasajero relacionado
  async createUser(req, res) {
    try {
      const { username, password, roleId } = req.body;

      const userExistente = await User.findOne({ where: { username } });
      if (userExistente) {
        return res.status(400).json({ error: 'Error.- Usuario ya registrado' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await User.create({
        username,
        password: hashedPassword,
        roleId,
      });

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

      const user = await User.findOne({ where: { username } });
      if (!user) {
        return res.status(401).json({ error: 'Credenciales incorrectas' });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Credenciales incorrectas' });
      }

      const token = jwt.sign({ id: user.id, roleId: user.roleId }, JWT_SECRET, { expiresIn: '1h' });
      return res.status(200).json({ token });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // Obtener datos del usuario autenticado mediante el token
  async getUserByToken(req, res) {
    try {
      const userId = req.user.id;

      const user = await User.findByPk(userId, {
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

  // Actualizar contraseña del usuario autenticado
  async updatePassword(req, res) {
    try {
      const userId = req.user.id;
      const { currentPassword, newPassword, confirmPassword } = req.body;

      if (newPassword !== confirmPassword) {
        return res.status(400).json({ error: 'Las contraseñas no coinciden' });
      }

      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }

      const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.password);
      if (!isCurrentPasswordValid) {
        return res.status(401).json({ error: 'La contraseña actual es incorrecta' });
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
      await user.save();

      return res.status(200).json({ message: 'Contraseña actualizada correctamente' });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // Actualizar nombre de usuario del usuario autenticado
  async updateUsername(req, res) {
    try {
      const userId = req.user.id;
      const { newUsername } = req.body;

      const usernameExistente = await User.findOne({ where: { username: newUsername } });
      if (usernameExistente) {
        return res.status(400).json({ error: 'Error.- Nombre de usuario ya registrado' });
      }

      const user = await User.findByPk(userId);
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
