// controllers/datosVueloController.js
const { DatosVuelo, Reserva, ClaseVuelo, User } = require('../models');

module.exports = {
  // Crear un nuevo DatoVuelo
  async createDatosVuelo(req, res) {
    try {
      const { id_user, id_reserva, id_classvuelo, asiento, pasaporte } = req.body;
      const nuevoDatosVuelo = await DatosVuelo.create({
        id_user,
        id_reserva,
        id_classvuelo,
        asiento,
        pasaporte,
        estado: true, // Confirmado por defecto
      });
      return res.status(201).json(nuevoDatosVuelo);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // Obtener todos los DatosVuelo por id_reserva (listado de pasajeros de una reserva)
  async getDatosVueloByReserva(req, res) {
    try {
      const { id_reserva } = req.params;
      const datosVuelos = await DatosVuelo.findAll({
        where: { id_reserva },
        include: [
          { model: User, as: 'usuario', attributes: ['nombre', 'apellido'] },
          { model: ClaseVuelo, as: 'claseVuelo' },
        ],
      });
      return res.status(200).json(datosVuelos);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // Obtener todas las reservas de un usuario (historial de reservas de un usuario)
  async getReservasByUser(req, res) {
    try {
      const { id_user } = req.params;
      const datosVuelos = await DatosVuelo.findAll({
        where: { id_user },
        include: [{ model: Reserva, as: 'reserva' }, { model: ClaseVuelo, as: 'claseVuelo' }],
      });
      return res.status(200).json(datosVuelos);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // Obtener información de un pasajero específico
  async getDatosVueloById(req, res) {
    try {
      const { id } = req.params;
      const datosVuelo = await DatosVuelo.findByPk(id, {
        include: [{ model: Reserva, as: 'reserva' }, { model: ClaseVuelo, as: 'claseVuelo' }],
      });
      if (!datosVuelo) return res.status(404).json({ error: 'Pasajero no encontrado' });
      return res.status(200).json(datosVuelo);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // Actualizar un DatoVuelo
  async updateDatosVuelo(req, res) {
    try {
      const { id } = req.params;
      const { pasaporte, asiento, estado } = req.body;

      const datosVuelo = await DatosVuelo.findByPk(id);
      if (!datosVuelo) {
        return res.status(404).json({ error: 'Pasajero no encontrado' });
      }

      datosVuelo.pasaporte = pasaporte;
      datosVuelo.asiento = asiento;
      datosVuelo.estado = estado;
      await datosVuelo.save();

      return res.status(200).json(datosVuelo);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // Eliminar un DatoVuelo
  async deleteDatosVuelo(req, res) {
    try {
      const { id } = req.params;
      const datosVuelo = await DatosVuelo.findByPk(id);

      if (!datosVuelo) {
        return res.status(404).json({ error: 'Pasajero no encontrado' });
      }

      await datosVuelo.destroy();
      return res.status(200).json({ message: 'Pasajero eliminado correctamente' });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
};
