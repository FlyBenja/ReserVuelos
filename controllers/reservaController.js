const { Reserva } = require('../models');

module.exports = {
  // Crear una nueva reserva sin pasajeros
  async createReserva(req, res) {
    try {
      const nuevaReserva = await Reserva.create({
        codigoReserva: "RSV12345", // Cambiado a fijo
        fechaInicio: "2024-10-28", // Cambiado a fijo
        fechaFinal: "2024-11-02" // Cambiado a fijo
      });
      console.log("Reserva creada exitosamente.");
      return res.status(201).json(nuevaReserva);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
};
