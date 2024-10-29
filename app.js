require('dotenv').config();
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./swaggerConfig');  // Importa la configuración de Swagger
const db = require('./models');
const reservaRoutes = require('./routes/reserva');
const claseVueloRoutes = require('./routes/claseVuelo');
const pasajeroRoutes = require('./routes/pasajero');
const userRoutes = require('./routes/user');
const roleRoutes = require('./routes/role');
const authenticateToken = require('./Middleware/authenticateToken');

const app = express();
app.use(express.json());

// Swagger setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Rutas sin autenticación (Users)
app.use('/api/users', userRoutes); // Ruta sin autenticación para creación y login de usuarios

// Rutas protegidas con autenticación y roles específicos
app.use('/api/roles', authenticateToken([1]), roleRoutes);            // Solo accesible para roleId = 1 (Admin)
app.use('/api/clases-vuelo', authenticateToken([1]), claseVueloRoutes); // Solo accesible para roleId = 1
app.use('/api/reservas', authenticateToken([1]), reservaRoutes);       // Solo accesible para roleId = 1
app.use('/api/pasajeros', authenticateToken([2]), pasajeroRoutes);     // Solo accesible para roleId = 2

const PORT = process.env.PORT || 3000;
db.sequelize.sync().then(() => {
  app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
});
