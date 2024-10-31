const { Reserva } = require('../models');

module.exports = {
  // Crear una nueva reserva sin pasajeros
  async createReserva(req, res) {
    try {
      const nuevaReserva = await Reserva.create({
        codigoReserva: "RSV12345", // Fijo
        fechaInicio: "2024-10-28", // Fijo
        fechaFinal: "2024-11-02" // Fijo
      });
      console.log("Reserva creada exitosamente.");
      return res.status(201).json(nuevaReserva);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
};
