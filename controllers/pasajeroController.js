const { Pasajero } = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const JWT_SECRET = process.env.JWT_SECRET || 'tu_secreto_jwt';

module.exports = {
  // Crear un nuevo pasajero con usuario y contraseña
  async createPasajero(req, res) {
    try {
      const { nombre, pasaporte, asiento, usuario, contraseña, role, reservaId } = req.body;

      // Verificar si ya existe un pasajero con el mismo usuario o pasaporte
      const pasajeroExistente = await Pasajero.findOne({ where: { usuario } });
      if (pasajeroExistente) {
        return res.status(400).json({ error: 'Error.- Usuario ya registrado' });
      }

      const pasaporteExistente = await Pasajero.findOne({ where: { pasaporte } });
      if (pasaporteExistente) {
        return res.status(400).json({ error: 'Error.- Pasaporte ya registrado' });
      }

      // Hashear la contraseña
      const hashedPassword = await bcrypt.hash(contraseña, 10);

      // Crear el pasajero
      const nuevoPasajero = await Pasajero.create({
        nombre,
        pasaporte,
        asiento,
        usuario,
        contraseña: hashedPassword,
        role,
        reservaId,
      });
      return res.status(201).json(nuevoPasajero);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // Login del pasajero usando usuario y contraseña
  async loginPasajero(req, res) {
    try {
      const { usuario, contraseña } = req.body;

      // Verificar si el usuario existe
      const pasajero = await Pasajero.findOne({ where: { usuario } });
      if (!pasajero) {
        return res.status(401).json({ error: 'Credenciales incorrectas' });
      }

      // Verificar la contraseña
      const validPassword = await bcrypt.compare(contraseña, pasajero.contraseña);
      if (!validPassword) {
        return res.status(401).json({ error: 'Credenciales incorrectas' });
      }

      // Crear el token JWT
      const token = jwt.sign({ id: pasajero.id, role: pasajero.role }, JWT_SECRET, { expiresIn: '1h' });

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
      const { nombre, pasaporte, asiento, usuario, contraseña, role, reservaId } = req.body;

      const pasajero = await Pasajero.findByPk(id);
      if (!pasajero) {
        return res.status(404).json({ error: 'Pasajero no encontrado' });
      }

      // Actualizar los campos, incluyendo el hash de la contraseña si se proporciona
      pasajero.nombre = nombre;
      pasajero.pasaporte = pasaporte;
      pasajero.asiento = asiento;
      pasajero.usuario = usuario;
      pasajero.role = role;
      pasajero.reservaId = reservaId || null;

      if (contraseña) {
        pasajero.contraseña = await bcrypt.hash(contraseña, 10);
      }

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
