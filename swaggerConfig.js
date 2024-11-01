const swaggerJsDoc = require('swagger-jsdoc');

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Flight Reservation API',
      version: '1.0.0',
      description: 'API para gestionar reservas de vuelo',
    },
    servers: [{ url: `https://reservuelos.onrender.com`}],
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
    tags: [
      { name: 'Roles', description: 'API para gestionar los roles' },
      { name: 'Users', description: 'API para gestionar los usuarios y autenticación' },
      { name: 'Clases de Vuelo', description: 'API para gestionar las clases de vuelo' },
      { name: 'Reservaciones', description: 'API para gestionar las reservaciones' },
    ],
  },
  apis: ['./routes/*.js'],
};

module.exports = swaggerJsDoc(swaggerOptions);
