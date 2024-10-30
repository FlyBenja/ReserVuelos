const { Reserva, Pasajero } = require('../models');

module.exports = {
  // Crear una nueva reserva sin pasajeros
  async createReserva(req, res) {
    try {
      const { codigoReserva, fechaInicio, fechaFinal, status } = req.body;

      // Verificar si ya existe una reserva con el mismo código
      const reservaExistente = await Reserva.findOne({ where: { codigoReserva } });
      if (reservaExistente) {
        return res.status(400).json({ error: 'Error.- Código de reserva ya existe' });
      }

      // Crear la reserva sin pasajeros
      const nuevaReserva = await Reserva.create({ codigoReserva, fechaInicio, fechaFinal, status });
      return res.status(201).json(nuevaReserva);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // Agregar un pasajero existente a una reserva con detalles adicionales
  async addPasajeroToReserva(req, res) {
    try {
      const { id } = req.params; // ID de la reserva
      const { pasajeroId, pasaporte, asiento, numeroVuelo, claseVuelo } = req.body; // ID del pasajero y detalles adicionales

      const reserva = await Reserva.findByPk(id);
      if (!reserva) {
        return res.status(404).json({ error: 'Reserva no encontrada' });
      }

      const pasajero = await Pasajero.findByPk(pasajeroId);
      if (!pasajero) {
        return res.status(404).json({ error: 'Pasajero no encontrado' });
      }

      // Actualiza el pasajero con los detalles adicionales y lo asocia a la reserva
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

  // Obtener todas las reservas
  async getReservas(req, res) {
    try {
      const reservas = await Reserva.findAll({
        include: [{ model: Pasajero, as: 'pasajeros' }],
      });
      return res.status(200).json(reservas);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // Obtener todas las reservas en las que participa un pasajero por ID de pasajero
  async getReservasByPasajeroId(req, res) {
    try {
      const { pasajeroId } = req.params;

      const reservas = await Reserva.findAll({
        include: [
          {
            model: Pasajero,
            as: 'pasajeros',
            where: { id: pasajeroId },
          },
        ],
      });

      if (!reservas.length) {
        return res.status(404).json({ error: 'No se encontraron reservas para el pasajero' });
      }

      return res.status(200).json(reservas);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // Actualizar solo el estatus de una reserva por ID
  async updateReservaStatus(req, res) {
    try {
      const { id } = req.params;
      const { status } = req.body;

      const reserva = await Reserva.findByPk(id);
      if (!reserva) {
        return res.status(404).json({ error: 'Reserva no encontrada' });
      }

      reserva.status = status;
      await reserva.save();

      return res.status(200).json(reserva);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // Eliminar una reserva por ID
  async deleteReserva(req, res) {
    try {
      const { id } = req.params;
      const reserva = await Reserva.findByPk(id);

      if (!reserva) {
        return res.status(404).json({ error: 'Reserva no encontrada' });
      }

      await reserva.destroy();
      return res.status(200).json({ message: 'Reserva eliminada correctamente' });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
};
