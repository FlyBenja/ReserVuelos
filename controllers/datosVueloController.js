// controllers/datosVueloController.js

const { DatosVuelo } = require('../models');

module.exports = {
  // POST: Crear un nuevo DatoVuelo con todos los campos necesarios, incluyendo user_id
  async createDatosVuelo(req, res) {
    try {
      const { user_id, reserva_id, clasevuelo_id, pasaporte, asiento, status } = req.body;

      const nuevoDatosVuelo = await DatosVuelo.create({
        user_id,
        reserva_id,
        clasevuelo_id,
        pasaporte,
        asiento,
        status,
      });
      return res.status(201).json(nuevoDatosVuelo);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // GET: Obtener todas las reservas de un usuario (user_id)
  async getReservasByUser(req, res) {
    try {
      const { user_id } = req.params;
      const datosVuelos = await DatosVuelo.findAll({
        where: { user_id },
      });
      return res.status(200).json(datosVuelos);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // GET: Obtener todos los usuarios de una reserva específica (id_reserva)
  async getUsersByReserva(req, res) {
    try {
      const { reserva_id } = req.params;
      const datosVuelos = await DatosVuelo.findAll({
        where: { reserva_id },
      });
      return res.status(200).json(datosVuelos);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // UPDATE: Actualizar un DatoVuelo utilizando user_id y reserva_id
  async updateDatosVuelo(req, res) {
    try {
      const { user_id, reserva_id } = req.params;
      const { clasevuelo_id, pasaporte, asiento, status } = req.body;

      const datosVuelo = await DatosVuelo.findOne({
        where: { user_id, reserva_id },
      });
      if (!datosVuelo) {
        return res.status(404).json({ error: 'DatosVuelo no encontrado' });
      }

      datosVuelo.clasevuelo_id = clasevuelo_id;
      datosVuelo.pasaporte = pasaporte;
      datosVuelo.asiento = asiento;
      datosVuelo.status = status;
      await datosVuelo.save();

      return res.status(200).json({ message: 'DatosVuelo actualizado con éxito', datosVuelo });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // DELETE: Eliminar un DatoVuelo utilizando user_id y reserva_id
  async deleteDatosVuelo(req, res) {
    try {
      const { user_id, reserva_id } = req.params;
      const datosVuelo = await DatosVuelo.findOne({
        where: { user_id, reserva_id },
      });
      if (!datosVuelo) {
        return res.status(404).json({ error: 'DatosVuelo no encontrado' });
      }

      await datosVuelo.destroy();
      return res.status(200).json({ message: 'DatosVuelo eliminado correctamente' });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
};
