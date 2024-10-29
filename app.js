require('dotenv').config();
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const db = require('./models');
const reservaRoutes = require('./routes/reserva');
const claseVueloRoutes = require('./routes/claseVuelo');
const pasajeroRoutes = require('./routes/pasajero');
const userRoutes = require('./routes/user');
const roleRoutes = require('./routes/role'); // Nueva ruta para roles

const app = express();
app.use(express.json());

// Configuración de Swagger
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Flight Reservation API',
      version: '1.0.0',
      description: 'API para gestionar reservas de vuelo',
    },
    servers: [{ url: `http://localhost:${process.env.PORT || 3000}` }],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ['./routes/*.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Rutas
app.use('/api/roles', roleRoutes);       // Roles
app.use('/api/users', userRoutes);       // Users
app.use('/api/clases-vuelo', claseVueloRoutes); // Clases de Vuelo
app.use('/api/reservas', reservaRoutes);        // Reservaciones
app.use('/api/pasajeros', pasajeroRoutes);      // Pasajeros

const PORT = process.env.PORT || 3000;
db.sequelize.sync().then(() => {
  app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
});
