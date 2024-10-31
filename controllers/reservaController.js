// controllers/reservaController.js
const { Reserva, User } = require('../models');

module.exports = {
  // Crear una nueva reserva
  async createReserva(req, res) {
    try {
      const { codigoReserva, fechaInicio, fechaFinal, user_id } = req.body; // Incluye user_id en el cuerpo de la solicitud

      const nuevaReserva = await Reserva.create({
        codigoReserva,
        fechaInicio,
        fechaFinal,
        user_id, // Relaciona la reserva con el usuario
      });
      console.log("Reserva creada exitosamente.");
      return res.status(201).json(nuevaReserva);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // Actualizar una reserva
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

  // Obtener todas las reservas
  async getAllReservas(req, res) {
    try {
      const reservas = await Reserva.findAll();
      return res.status(200).json(reservas);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // Eliminar una reserva
  async deleteReserva(req, res) {
    try {
      const { id } = req.params; // ID de la reserva
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
