const { Pasajero, User } = require('../models'); // Asegúrate de que User esté en el modelo
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const JWT_SECRET = process.env.JWT_SECRET || 'tu_secreto_jwt';

module.exports = {
  // Crear un nuevo pasajero con relación a User
  async createPasajero(req, res) {
    try {
      const { nombre, pasaporte, asiento, id_user } = req.body;

      // Verificar si ya existe un pasajero con el mismo pasaporte
      const pasaporteExistente = await Pasajero.findOne({ where: { pasaporte } });
      if (pasaporteExistente) {
        return res.status(400).json({ error: 'Error.- Pasaporte ya registrado' });
      }

      // Crear el pasajero relacionado con un usuario existente
      const nuevoPasajero = await Pasajero.create({
        nombre,
        pasaporte,
        asiento,
        id_user,
      });

      return res.status(201).json(nuevoPasajero);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // Login del usuario usando usuario y contraseña en User
  async loginUser(req, res) {
    try {
      const { usuario, contraseña } = req.body;

      // Verificar si el usuario existe en User
      const user = await User.findOne({ where: { user: usuario } });
      if (!user) {
        return res.status(401).json({ error: 'Credenciales incorrectas' });
      }

      // Verificar la contraseña
      const validPassword = await bcrypt.compare(contraseña, user.contraseña);
      if (!validPassword) {
        return res.status(401).json({ error: 'Credenciales incorrectas' });
      }

      // Crear el token JWT
      const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });

      return res.status(200).json({ token });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // Obtener todos los pasajeros
  async getPasajeros(req, res) {
    try {
      const pasajeros = await Pasajero.findAll();
      return res.status(200).json(pasajeros);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // Obtener un pasajero por ID
  async getPasajeroById(req, res) {
    try {
      const { id } = req.params;
      const pasajero = await Pasajero.findByPk(id);

      if (!pasajero) {
        return res.status(404).json({ error: 'Pasajero no encontrado' });
      }

      return res.status(200).json(pasajero);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // Actualizar un pasajero
  async updatePasajero(req, res) {
    try {
      const { id } = req.params;
      const { nombre, pasaporte, asiento, id_user } = req.body;

      const pasajero = await Pasajero.findByPk(id);
      if (!pasajero) {
        return res.status(404).json({ error: 'Pasajero no encontrado' });
      }

      // Actualizar los campos
      pasajero.nombre = nombre;
      pasajero.pasaporte = pasaporte;
      pasajero.asiento = asiento;
      pasajero.id_user = id_user;

      await pasajero.save();

      return res.status(200).json(pasajero);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // Eliminar el campo reservaId de un pasajero
  async removeReservaId(req, res) {
    try {
      const { id } = req.params;

      const pasajero = await Pasajero.findByPk(id);
      if (!pasajero) {
        return res.status(404).json({ error: 'Pasajero no encontrado' });
      }

      pasajero.reservaId = null;
      await pasajero.save();

      return res.status(200).json({ message: 'reservaId eliminado correctamente', pasajero });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
};
