// controllers/pasajeroController.js
const { Pasajero } = require('../models');

module.exports = {
  // Crear un pasajero asociado a un nuevo usuario
  async createPasajeroForUser(userId) {
    try {
      // Crear el pasajero sin necesidad de asignar un reservaId
      const newPasajero = await Pasajero.create({ user_id: userId });
      return newPasajero;
    } catch (error) {
      console.error('Error al crear el pasajero para el usuario:', error.message);
      throw new Error(error.message);
    }
  },

  // Agregar un pasajero a una reserva existente
  async addPasajeroToReserva(req, res) {
    try {
      const { id } = req.params; // ID de la reserva
      const { pasajeroId, pasaporte, asiento, numeroVuelo, claseVuelo, status = true } = req.body;

      const reserva = await Reserva.findByPk(id);
      if (!reserva) {
        return res.status(404).json({ error: 'Reserva no encontrada' });
      }

      const nuevoPasajero = await Pasajero.create({
        reservaId: id, // Aquí se debe asignar correctamente si es necesario
        pasajeroId,
        pasaporte,
        asiento,
        numeroVuelo,
        claseVuelo,
        status, // Agregado el estatus
      });

      return res.status(201).json({ message: 'Pasajero agregado a la reserva', pasajero: nuevoPasajero });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
};
