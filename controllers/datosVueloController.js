// controllers/datosVueloController.js
const { DatosVuelo, Reserva } = require('../models');

module.exports = {
  // Crear un nuevo DatoVuelo solo con id_user
  async createDatosVuelo(req, res) {
    try {
      const { id_user } = req.body;

      const nuevoDatosVuelo = await DatosVuelo.create({
        id_user,
      });
      return res.status(201).json(nuevoDatosVuelo);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // Asignar una reserva a un DatoVuelo existente con detalles adicionales
  async assignReservaToDatosVuelo(req, res) {
    try {
      const { id } = req.params; // ID del DatoVuelo
      const { id_reserva, id_classvuelo, pasaporte, asiento } = req.body;

      const datoVuelo = await DatosVuelo.findByPk(id);
      if (!datoVuelo) {
        return res.status(404).json({ error: 'Dato de vuelo no encontrado' });
      }

      // Crea o asocia la reserva con el dato de vuelo
      const reservaAsignada = await Reserva.create({
        id_datoVuelo: id,
        id_reserva,
        id_classvuelo,
        pasaporte,
        asiento,
      });

      return res.status(201).json(reservaAsignada);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // Obtener todos los DatosVuelo
  async getAllDatosVuelo(req, res) {
    try {
      const datosVuelos = await DatosVuelo.findAll({
        include: [{ model: Reserva, as: 'reservas' }],
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
      const { pasaporte, asiento } = req.body;

      const datosVuelo = await DatosVuelo.findByPk(id);
      if (!datosVuelo) {
        return res.status(404).json({ error: 'DatosVuelo no encontrado' });
      }

      datosVuelo.pasaporte = pasaporte;
      datosVuelo.asiento = asiento;
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
