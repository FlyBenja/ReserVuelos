// controllers/userController.js

const { User, Role } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

module.exports = {
  // Crear un nuevo usuario
  async createUser(req, res) {
    try {
      const { username, password, roleId } = req.body;

      // Verificar si el usuario ya existe
      const userExistente = await User.findOne({ where: { username } });
      if (userExistente) {
        return res.status(400).json({ error: 'Error.- Usuario ya registrado' });
      }

      // Verificar que el rol existe
      const role = await Role.findByPk(roleId);
      if (!role) {
        return res.status(400).json({ error: 'Error.- Rol no encontrado' });
      }

      // Hashear la contraseña
      const hashedPassword = await bcrypt.hash(password, 10);

      // Crear el nuevo usuario
      const newUser = await User.create({
        username,
        password: hashedPassword,
        roleId,
      });

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
};
