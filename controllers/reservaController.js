// controllers/reservaController.js
const { Reserva, Pasajero } = require('../models');

module.exports = {
  // Crear una nueva reserva sin pasajeros
  async createReserva(req, res) {
    try {
      const { codigoReserva, fechaInicio, fechaFinal } = req.body;

      const nuevaReserva = await Reserva.create({
        codigoReserva,
        fechaInicio,
        fechaFinal,
      });
      console.log("Reserva creada exitosamente.");
      return res.status(201).json(nuevaReserva);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // Actualizar una reserva sin pasajeros
  async updateReserva(req, res) {
    try {
      const { id } = req.params; // ID de la reserva
      const { codigoReserva, fechaInicio, fechaFinal } = req.body;

      const reserva = await Reserva.findByPk(id);
      if (!reserva) {
        return res.status(404).json({ error: 'Reserva no encontrada' });
      }

      reserva.codigoReserva = codigoReserva;
      reserva.fechaInicio = fechaInicio;
      reserva.fechaFinal = fechaFinal;
      await reserva.save();

      return res.status(200).json({ message: 'Reserva actualizada', reserva });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // Obtener todas las reservas sin pasajeros
  async getAllReservas(req, res) {
    try {
      const reservas = await Reserva.findAll();
      return res.status(200).json(reservas);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // Agregar pasajeros a una reserva
  async addPasajeroToReserva(req, res) {
    try {
      const { id } = req.params; // ID de la reserva
      const { pasajeroId, pasaporte, asiento, numeroVuelo, claseVuelo, status = true } = req.body;

      const reserva = await Reserva.findByPk(id);
      if (!reserva) {
        return res.status(404).json({ error: 'Reserva no encontrada' });
      }

      const nuevoPasajero = await Pasajero.create({
        reservaId: id,
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

  // Obtener todos los pasajeros de una reserva específica
  async getPasajerosByReserva(req, res) {
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

  // Actualizar el estatus de un pasajero
  async updatePasajeroStatus(req, res) {
    try {
      const { pasajeroId } = req.params; // ID del pasajero
      const { status } = req.body; // Nuevo estatus

      const pasajero = await Pasajero.findByPk(pasajeroId);
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
