// controllers/pasajeroController.js
const { Pasajero, User } = require('../models');

module.exports = {
  // Crear un pasajero automáticamente al crear un usuario
  async createPasajeroForUser(userId) {
    try {
      // Crear el pasajero relacionado con el nuevo usuario
      const newPasajero = await Pasajero.create({ user_id: userId });
      return newPasajero;
    } catch (error) {
      console.error('Error al crear el pasajero para el usuario:', error.message);
      throw new Error(error.message);
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
};
