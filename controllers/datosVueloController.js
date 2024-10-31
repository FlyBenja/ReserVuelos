// controllers/datosVueloController.js
const { DatosVuelo, Reserva } = require('../models');

module.exports = {
  // Crear un nuevo DatoVuelo
  async createDatosVuelo(req, res) {
    try {
      const { id_user, pasaporte, asiento, reserva_id, id_classvuelo } = req.body;
      const nuevoDatosVuelo = await DatosVuelo.create({
        id_user,
        pasaporte,
        asiento,
        reserva_id,
        id_classvuelo,
      });
      return res.status(201).json(nuevoDatosVuelo);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // Obtener todos los DatosVuelo
  async getAllDatosVuelo(req, res) {
    try {
      const datosVuelos = await DatosVuelo.findAll({
        include: [{ model: Reserva, as: 'reserva' }],
      });
      return res.status(200).json(datosVuelos);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // Actualizar un DatoVuelo
  async updateDatosVuelo(req, res) {
    try {
      const { id } = req.params;
      const { pasaporte, asiento, reserva_id, id_classvuelo } = req.body;

      const datosVuelo = await DatosVuelo.findByPk(id);
      if (!datosVuelo) {
        return res.status(404).json({ error: 'DatosVuelo no encontrado' });
      }

      datosVuelo.pasaporte = pasaporte;
      datosVuelo.asiento = asiento;
      datosVuelo.reserva_id = reserva_id;
      datosVuelo.id_classvuelo = id_classvuelo;
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
        return res.status(404).json({ error: 'DatosVuelo no encontrado' });
      }

      await datosVuelo.destroy();
      return res.status(200).json({ message: 'DatosVuelo eliminado correctamente' });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
};
