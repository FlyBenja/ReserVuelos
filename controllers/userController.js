const { User, Role, Pasajero } = require('../models');
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

      // Crear el pasajero asociado al nuevo usuario
      const newPasajero = await Pasajero.create({
        user_id: newUser.id // Establecer la relación aquí
      });
      
      return res.status(201).json({ user: newUser, pasajero: newPasajero });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // Obtener todos los usuarios
  async getAllUsers(req, res) {
    try {
      const users = await User.findAll();
      return res.status(200).json(users);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // Eliminar un usuario específico
  async deleteUser(req, res) {
    try {
      const { id } = req.params;
      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }

      // Eliminar los pasajeros asociados al usuario
      await Pasajero.destroy({ where: { user_id: id } });
      await user.destroy();
      return res.status(200).json({ message: 'Usuario eliminado correctamente' });
    } catch (error) {
      console.error('Error en deleteUser:', error.message);
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
      console.error('Error en loginUser:', error.message);
      return res.status(500).json({ error: error.message });
    }
  },

  // Obtener el usuario autenticado mediante el token
  async getUserByToken(req, res) {
    try {
      const userId = req.user.id;
      const user = await User.findByPk(userId);

      if (!user) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }

      return res.status(200).json(user);
    } catch (error) {
      console.error('Error en getUserByToken:', error.message);
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
      console.error('Error en updatePassword:', error.message);
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
      console.error('Error en updateUsername:', error.message);
      return res.status(500).json({ error: error.message });
    }
  },
};
