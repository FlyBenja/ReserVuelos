const { Reserva, Pasajero } = require('../models');

module.exports = {
  // Crear una nueva reserva sin pasajeros
  async createReserva(req, res) {
    try {
      const { codigoReserva, fechaInicio, fechaFinal } = req.body;

      // Verificar si ya existe una reserva con el mismo código
      const reservaExistente = await Reserva.findOne({ where: { codigoReserva } });
      if (reservaExistente) {
        return res.status(400).json({ error: 'Error.- Código de reserva ya existe' });
      }

      // Crear la reserva sin pasajeros
      const nuevaReserva = await Reserva.create({ codigoReserva, fechaInicio, fechaFinal });
      return res.status(201).json(nuevaReserva);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // Agregar un pasajero existente a una reserva con detalles adicionales
  async addPasajeroToReserva(req, res) {
    try {
      const { id } = req.params; // ID de la reserva
      const { pasajeroId, pasaporte, asiento, numeroVuelo, claseVuelo, status } = req.body;

      const reserva = await Reserva.findByPk(id);
      if (!reserva) {
        return res.status(404).json({ error: 'Reserva no encontrada' });
      }

      const pasajero = await Pasajero.findByPk(pasajeroId);
      if (!pasajero) {
        return res.status(404).json({ error: 'Pasajero no encontrado' });
      }

      await pasajero.update({
        pasaporte,
        asiento,
        numeroVuelo,
        claseVuelo,
        reservaId: id,
        status,
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
        include: [
          {
            model: Pasajero,
            as: 'pasajeros',
            attributes: ['id', 'nombre', 'pasaporte', 'status', 'asiento', 'numeroVuelo', 'claseVuelo'],
          },
        ],
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
        include: [
          {
            model: Pasajero,
            as: 'pasajeros',
          },
        ],
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
      const { id } = req.params;
      const { status } = req.body;

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
};
