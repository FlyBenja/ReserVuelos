const { Reserva, Pasajero } = require('../models');

module.exports = {
  // Crear una nueva reserva sin pasajeros
  async createReserva(req, res) {
    try {
      const nuevaReserva = await Reserva.create({
        codigoReserva: "RSV12345", // Cambiado a fijo
        fechaInicio: "2024-10-28", // Cambiado a fijo
        fechaFinal: "2024-11-02" // Cambiado a fijo
      });
      console.log("Reserva creada exitosamente.");
      return res.status(201).json(nuevaReserva);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // Agregar un pasajero existente a una reserva con detalles adicionales
  async addPasajeroToReserva(req, res) {
    try {
      const { id } = req.params; // ID de la reserva
      const { pasajeroId, pasaporte, asiento, numeroVuelo, claseVuelo } = req.body;

      const reserva = await Reserva.findByPk(id);
      if (!reserva) {
        return res.status(404).json({ error: 'Reserva no encontrada' });
      }

      const pasajero = await Pasajero.findByPk(pasajeroId);
      if (!pasajero) {
        return res.status(404).json({ error: 'Pasajero no encontrado' });
      }

      // Agregar el pasajero a la reserva
      await pasajero.update({
        pasaporte,
        asiento,
        numeroVuelo,
        claseVuelo,
        reservaId: id,
      });

      return res.status(201).json({ message: 'Pasajero agregado a la reserva con detalles', pasajero });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // Obtener todas las reservas junto con la información completa de los pasajeros
  async getReservasWithPasajeros(req, res) {
    try {
      const reservas = await Reserva.findAll({
        include: [{ model: Pasajero, as: 'pasajeros' }],
      });
      return res.status(200).json(reservas);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // Obtener todos los pasajeros de una reserva específica
  async getPasajerosByReservaId(req, res) {
    try {
      const { id } = req.params;
      const reserva = await Reserva.findByPk(id, {
        include: [{ model: Pasajero, as: 'pasajeros' }],
      });

      if (!reserva) {
        return res.status(404).json({ error: 'Reserva no encontrada' });
      }

      return res.status(200).json(reserva.pasajeros);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // Actualizar el estatus de un pasajero
  async updatePasajeroStatus(req, res) {
    try {
      const { id } = req.params; // ID del pasajero
      const { status } = req.body; // Nuevo estatus

      const pasajero = await Pasajero.findByPk(id);
      if (!pasajero) {
        return res.status(404).json({ error: 'Pasajero no encontrado' });
      }

      pasajero.status = status;
      await pasajero.save();

      return res.status(200).json({ message: 'Estatus del pasajero actualizado', pasajero });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // Obtener todas las reservas de un pasajero específico
  async getReservasByPasajeroId(req, res) {
    try {
      const { pasajeroId } = req.params;

      const reservas = await Reserva.findAll({
        include: [{ model: Pasajero, as: 'pasajeros', where: { id: pasajeroId } }],
      });

      if (!reservas.length) {
        return res.status(404).json({ error: 'No se encontraron reservas para el pasajero' });
      }

      return res.status(200).json(reservas);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
};
