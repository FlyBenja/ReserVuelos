const { ClaseVuelo } = require('../models');

module.exports = {
  // Crear una nueva clase de vuelo
  async createClaseVuelo(req, res) {
    try {
      const { nombreClase } = req.body;

      // Verificar si ya existe una clase de vuelo con el mismo nombre
      const claseExistente = await ClaseVuelo.findOne({ where: { nombreClase } });
      if (claseExistente) {
        return res.status(400).json({ error: 'Error.- Clase de Vuelo ya creada' });
      }

      // Crear la clase de vuelo
      const nuevaClaseVuelo = await ClaseVuelo.create({ nombreClase });
      return res.status(201).json(nuevaClaseVuelo);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // Obtener todas las clases de vuelo
  async getClasesVuelo(req, res) {
    try {
      const clasesVuelo = await ClaseVuelo.findAll();
      return res.status(200).json(clasesVuelo);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // Obtener una clase de vuelo por ID
  async getClaseVueloById(req, res) {
    try {
      const { id } = req.params;
      const claseVuelo = await ClaseVuelo.findByPk(id);

      if (!claseVuelo) {
        return res.status(404).json({ error: 'Clase de Vuelo no encontrada' });
      }

      return res.status(200).json(claseVuelo);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // Actualizar una clase de vuelo por ID
  async updateClaseVuelo(req, res) {
    try {
      const { id } = req.params;
      const { nombreClase } = req.body;

      // Verificar si ya existe una clase con el mismo nombre
      const claseExistente = await ClaseVuelo.findOne({ where: { nombreClase } });
      if (claseExistente && claseExistente.id !== parseInt(id, 10)) {
        return res.status(400).json({ error: 'Error.- Clase de Vuelo ya creada con ese nombre' });
      }

      // Buscar y actualizar la clase de vuelo
      const claseVuelo = await ClaseVuelo.findByPk(id);
      if (!claseVuelo) {
        return res.status(404).json({ error: 'Clase de Vuelo no encontrada' });
      }

      claseVuelo.nombreClase = nombreClase;
      await claseVuelo.save();

      return res.status(200).json(claseVuelo);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // Eliminar una clase de vuelo por ID
  async deleteClaseVuelo(req, res) {
    try {
      const { id } = req.params;
      const claseVuelo = await ClaseVuelo.findByPk(id);

      if (!claseVuelo) {
        return res.status(404).json({ error: 'Clase de Vuelo no encontrada' });
      }

      await claseVuelo.destroy();
      return res.status(200).json({ message: 'Clase de Vuelo eliminada correctamente' });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
};
