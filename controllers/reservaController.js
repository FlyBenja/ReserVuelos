const { Reserva, Pasajero, ClaseVuelo } = require('../models');

module.exports = {
  // Crear una nueva reserva sin pasajeros
  async createReserva(req, res) {
    try {
      const { codigoReserva, fechaReserva, claseVueloId } = req.body;

      // Verificar si ya existe una reserva con el mismo código
      const reservaExistente = await Reserva.findOne({ where: { codigoReserva } });
      if (reservaExistente) {
        return res.status(400).json({ error: 'Error.- Código de reserva ya existe' });
      }

      // Crear la reserva sin pasajeros
      const nuevaReserva = await Reserva.create({ codigoReserva, fechaReserva, claseVueloId });
      return res.status(201).json(nuevaReserva);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // Agregar pasajeros a una reserva existente
  async addPasajeros(req, res) {
    try {
      const { id } = req.params; // ID de la reserva
      const { pasajeros } = req.body; // Array de pasajeros a agregar

      const reserva = await Reserva.findByPk(id);
      if (!reserva) {
        return res.status(404).json({ error: 'Reserva no encontrada' });
      }

      // Crear cada pasajero y asociarlo con la reserva
      const nuevosPasajeros = await Promise.all(
        pasajeros.map(async (pasajeroData) => {
          const pasajeroExistente = await Pasajero.findOne({ where: { pasaporte: pasajeroData.pasaporte } });
          if (pasajeroExistente) {
            throw new Error(`El pasaporte ${pasajeroData.pasaporte} ya está registrado`);
          }
          return Pasajero.create({ ...pasajeroData, reservaId: id });
        })
      );

      return res.status(201).json({ message: 'Pasajeros agregados a la reserva', pasajeros: nuevosPasajeros });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // Obtener todas las reservas
  async getReservas(req, res) {
    try {
      const reservas = await Reserva.findAll({
        include: [
          { model: Pasajero, as: 'pasajeros' },
          { model: ClaseVuelo, as: 'claseVuelo' },
        ],
      });
      return res.status(200).json(reservas);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // Obtener una reserva por ID
  async getReservaById(req, res) {
    try {
      const { id } = req.params;
      const reserva = await Reserva.findByPk(id, {
        include: [
          { model: Pasajero, as: 'pasajeros' },
          { model: ClaseVuelo, as: 'claseVuelo' },
        ],
      });

      if (!reserva) {
        return res.status(404).json({ error: 'Reserva no encontrada' });
      }

      return res.status(200).json(reserva);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // Actualizar una reserva por ID
  async updateReserva(req, res) {
    try {
      const { id } = req.params;
      const { codigoReserva, fechaReserva, claseVueloId } = req.body;

      // Verificar si ya existe una reserva con el mismo código
      const reservaExistente = await Reserva.findOne({ where: { codigoReserva } });
      if (reservaExistente && reservaExistente.id !== parseInt(id, 10)) {
        return res.status(400).json({ error: 'Error.- Código de reserva ya existe' });
      }

      // Buscar y actualizar la reserva
      const reserva = await Reserva.findByPk(id);
      if (!reserva) {
        return res.status(404).json({ error: 'Reserva no encontrada' });
      }

      reserva.codigoReserva = codigoReserva;
      reserva.fechaReserva = fechaReserva;
      reserva.claseVueloId = claseVueloId;
      await reserva.save();

      return res.status(200).json(reserva);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // Eliminar una reserva por ID
  async deleteReserva(req, res) {
    try {
      const { id } = req.params;
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
