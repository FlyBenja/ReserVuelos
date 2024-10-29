const { Pasajero, Reserva } = require('../models');

module.exports = {
  // Crear un nuevo pasajero
  async createPasajero(req, res) {
    try {
      const { nombre, pasaporte, asiento, reservaId } = req.body;

      // Verificar si ya existe un pasajero con el mismo pasaporte
      const pasajeroExistente = await Pasajero.findOne({ where: { pasaporte } });
      if (pasajeroExistente) {
        return res.status(400).json({ error: 'Error.- Pasaporte ya registrado para otro pasajero' });
      }

      // Crear el pasajero
      const nuevoPasajero = await Pasajero.create({ nombre, pasaporte, asiento, reservaId });
      return res.status(201).json(nuevoPasajero);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // Obtener todos los pasajeros
  async getPasajeros(req, res) {
    try {
      const pasajeros = await Pasajero.findAll({
        include: [{ model: Reserva, as: 'reserva' }],
      });
      return res.status(200).json(pasajeros);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // Obtener un pasajero por ID
  async getPasajeroById(req, res) {
    try {
      const { id } = req.params;
      const pasajero = await Pasajero.findByPk(id, {
        include: [{ model: Reserva, as: 'reserva' }],
      });

      if (!pasajero) {
        return res.status(404).json({ error: 'Pasajero no encontrado' });
      }

      return res.status(200).json(pasajero);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // Actualizar un pasajero por ID
  async updatePasajero(req, res) {
    try {
      const { id } = req.params;
      const { nombre, pasaporte, asiento, reservaId } = req.body;

      // Verificar si el pasaporte ya está en uso por otro pasajero
      const pasajeroExistente = await Pasajero.findOne({ where: { pasaporte } });
      if (pasajeroExistente && pasajeroExistente.id !== parseInt(id, 10)) {
        return res.status(400).json({ error: 'Error.- Pasaporte ya registrado para otro pasajero' });
      }

      // Buscar y actualizar el pasajero
      const pasajero = await Pasajero.findByPk(id);
      if (!pasajero) {
        return res.status(404).json({ error: 'Pasajero no encontrado' });
      }

      pasajero.nombre = nombre;
      pasajero.pasaporte = pasaporte;
      pasajero.asiento = asiento;
      pasajero.reservaId = reservaId;
      await pasajero.save();

      return res.status(200).json(pasajero);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // Eliminar un pasajero por ID
  async deletePasajero(req, res) {
    try {
      const { id } = req.params;
      const pasajero = await Pasajero.findByPk(id);

      if (!pasajero) {
        return res.status(404).json({ error: 'Pasajero no encontrado' });
      }

      await pasajero.destroy();
      return res.status(200).json({ message: 'Pasajero eliminado correctamente' });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
};
