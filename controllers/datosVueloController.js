// controllers/datosVueloController.js

const { DatosVuelo } = require('../models');

module.exports = {
  // Primer POST: Crear un nuevo DatoVuelo solo con id_user
  async createBasicDatosVuelo(req, res) {
    try {
      const { user_id } = req.body;
      const nuevoDatosVuelo = await DatosVuelo.create({ user_id });
      return res.status(201).json(nuevoDatosVuelo);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // Segundo POST: Actualizar un DatoVuelo con detalles adicionales
  async updateDatosVueloDetails(req, res) {
    try {
      const { id } = req.params;
      const { reserva_id, clasevuelo_id, pasaporte, asiento, status } = req.body;

      const datosVuelo = await DatosVuelo.findByPk(id);
      if (!datosVuelo) {
        return res.status(404).json({ error: 'DatosVuelo no encontrado' });
      }

      datosVuelo.reserva_id = reserva_id;
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

  // Obtener todos los DatosVuelo
  async getAllDatosVuelo(req, res) {
    try {
      const datosVuelos = await DatosVuelo.findAll();
      return res.status(200).json(datosVuelos);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // Obtener información de un pasajero específico
  async getDatosVueloById(req, res) {
    try {
      const { id } = req.params;
      const datosVuelo = await DatosVuelo.findByPk(id);
      if (!datosVuelo) {
        return res.status(404).json({ error: 'DatosVuelo no encontrado' });
      }
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
        return res.status(404).json({ error: 'DatosVuelo no encontrado' });
      }

      await datosVuelo.destroy();
      return res.status(200).json({ message: 'DatosVuelo eliminado correctamente' });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
};
