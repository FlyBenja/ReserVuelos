const { Pasajero } = require('../models');

module.exports = {
  // Crear un pasajero asociado a un nuevo usuario
  async createPasajeroForUser(userId) {
    try {
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

  // Eliminar un pasajero por ID
  async deletePasajero(req, res) {
    try {
      const { id } = req.params;
      const pasajero = await Pasajero.findByPk(id);
      if (!pasajero) {
        return res.status(404).json({ error: 'Pasajero no encontrado' });
      }
      await pasajero.destroy();
      return res.status(200).json({ message: 'Pasajero eliminado correctamente' });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
};
