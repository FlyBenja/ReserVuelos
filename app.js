require('dotenv').config();
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const db = require('./models');
const reservaRoutes = require('./routes/reserva');
const claseVueloRoutes = require('./routes/claseVuelo');
const pasajeroRoutes = require('./routes/pasajero'); // Importa las rutas de pasajero

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
  },
  apis: ['./routes/*.js'], // Asegúrate de que Swagger documente todas las rutas en la carpeta routes
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Rutas
app.use('/api/reservas', reservaRoutes);
app.use('/api/clases-vuelo', claseVueloRoutes);
app.use('/api/pasajeros', pasajeroRoutes); // Añadir la ruta de pasajero

const PORT = process.env.PORT || 3000;
db.sequelize.sync().then(() => {
  app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
});
