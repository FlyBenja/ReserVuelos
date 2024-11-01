// controllers/datosVueloController.js

const { DatosVuelo } = require('../models');

module.exports = {
  // POST: Crear un nuevo DatoVuelo con todos los campos necesarios, incluyendo numeroVuelo
  async createDatosVuelo(req, res) {
    try {
      const { user_id, reserva_id, clasevuelo_id, pasaporte, asiento, numeroVuelo, status } = req.body;

      const nuevoDatosVuelo = await DatosVuelo.create({
        user_id,
        reserva_id,
        clasevuelo_id,
        pasaporte,
        asiento,
        numeroVuelo,
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

  // GET: Obtener todos los usuarios de una reserva específica (reserva_id)
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

  // UPDATE: Actualizar el estatus de un DatoVuelo utilizando id (llave primaria)
  async updateDatosVuelo(req, res) {
    try {
      const { id } = req.params;
      const { status } = req.body;

      const datosVuelo = await DatosVuelo.findByPk(id);
      if (!datosVuelo) {
        return res.status(404).json({ error: 'DatosVuelo no encontrado' });
      }

      // Solo permite cambiar el campo 'status'
      datosVuelo.status = status;
      await datosVuelo.save();

      return res.status(200).json({ message: 'Status actualizado con éxito', datosVuelo });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // DELETE: Eliminar un DatoVuelo utilizando id (llave primaria)
  async deleteDatosVuelo(req, res) {
    try {
      const { id } = req.params;
      const datosVuelo = await DatosVuelo.findByPk(id);
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
