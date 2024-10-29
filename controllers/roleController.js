// controllers/roleController.js

const { Role } = require('../models');

module.exports = {
  // Crear un nuevo rol
  async createRole(req, res) {
    try {
      const { nombreRole } = req.body;

      // Verificar si el rol ya existe
      const roleExistente = await Role.findOne({ where: { nombreRole } });
      if (roleExistente) {
        return res.status(400).json({ error: 'Error.- Rol ya registrado' });
      }

      // Crear el nuevo rol
      const nuevoRole = await Role.create({ nombreRole });
      return res.status(201).json(nuevoRole);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // Obtener todos los roles
  async getRoles(req, res) {
    try {
      const roles = await Role.findAll();
      return res.status(200).json(roles);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // Obtener un rol por ID
  async getRoleById(req, res) {
    try {
      const { id } = req.params;
      const role = await Role.findByPk(id);

      if (!role) {
        return res.status(404).json({ error: 'Rol no encontrado' });
      }

      return res.status(200).json(role);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // Actualizar un rol
  async updateRole(req, res) {
    try {
      const { id } = req.params;
      const { nombreRole } = req.body;

      const role = await Role.findByPk(id);
      if (!role) {
        return res.status(404).json({ error: 'Rol no encontrado' });
      }

      role.nombreRole = nombreRole;
      await role.save();

      return res.status(200).json(role);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // Eliminar un rol
  async deleteRole(req, res) {
    try {
      const { id } = req.params;

      const role = await Role.findByPk(id);
      if (!role) {
        return res.status(404).json({ error: 'Rol no encontrado' });
      }

      await role.destroy();
      return res.status(200).json({ message: 'Rol eliminado correctamente' });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
};
