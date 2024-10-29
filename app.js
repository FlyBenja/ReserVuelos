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

const app = express();
app.use(express.json());

// Swagger setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Rutas en el orden especificado en Swagger
app.use('/api/roles', roleRoutes);             // Roles
app.use('/api/users', userRoutes);             // Users
app.use('/api/clases-vuelo', claseVueloRoutes); // Clases de Vuelo
app.use('/api/reservas', reservaRoutes);       // Reservaciones
app.use('/api/pasajeros', pasajeroRoutes);     // Pasajeros

const PORT = process.env.PORT || 3000;
db.sequelize.sync().then(() => {
  app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
});
