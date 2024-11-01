// controllers/datosVueloController.js

const { DatosVuelo } = require('../models');

module.exports = {
  // POST: Crear un nuevo DatoVuelo con todos los campos necesarios
  async createDatosVuelo(req, res) {
    try {
      const { user_id, reserva_id, clasevuelo_id, pasaporte, asiento, numero_vuelo, status } = req.body;

      const nuevoDatosVuelo = await DatosVuelo.create({
        user_id,
        reserva_id,
        clasevuelo_id,
        pasaporte,
        asiento,
        numero_vuelo, // Nuevo campo "numero_vuelo"
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

  // GET: Obtener toda la información de un DatoVuelo incluyendo "numero_vuelo" utilizando el id
  async getDatosVueloById(req, res) {
    try {
      const { id } = req.params;

      const datosVuelo = await DatosVuelo.findByPk(id, {
        attributes: ['id', 'user_id', 'reserva_id', 'clasevuelo_id', 'pasaporte', 'asiento', 'numero_vuelo', 'status'],
      });
      if (!datosVuelo) {
        return res.status(404).json({ error: 'DatosVuelo no encontrado' });
      }

      return res.status(200).json(datosVuelo);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // UPDATE: Actualizar solo el campo "status" de un DatoVuelo usando id
  async updateDatosVuelo(req, res) {
    try {
      const { id } = req.params;
      const { status } = req.body;

      const datosVuelo = await DatosVuelo.findByPk(id);
      if (!datosVuelo) {
        return res.status(404).json({ error: 'DatosVuelo no encontrado' });
      }

      datosVuelo.status = status; // Actualizar solo el campo "status"
      await datosVuelo.save();

      return res.status(200).json({ message: 'Status actualizado con éxito', datosVuelo });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // DELETE: Eliminar un DatoVuelo usando id (llave primaria)
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
