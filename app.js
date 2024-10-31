require('dotenv').config();
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./swaggerConfig'); // Configuración de Swagger
const cors = require("cors");
const db = require('./models');
const reservaRoutes = require('./routes/reserva');
const claseVueloRoutes = require('./routes/claseVuelo');
const pasajeroRoutes = require('./routes/pasajero');
const userRoutes = require('./routes/user');
const roleRoutes = require('./routes/role');
const { authenticateToken } = require('./Middleware/authenticateToken');

const app = express();

// Configuración de CORS
app.use(cors({
  origin: ["http://localhost:5173", "https://reservuelos.netlify.app"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(express.json());

// Swagger setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Rutas sin autenticación (Users)
app.use('/api/users', userRoutes); // Rutas públicas para creación y login de usuarios

// Rutas protegidas con autenticación y roles específicos
app.use('/api/roles', authenticateToken([1]), roleRoutes); // Accesible solo para roleId = 1 (Admin)
app.use('/api/clases-vuelo', authenticateToken([1]), claseVueloRoutes); // Accesible solo para roleId = 1
app.use('/api/reservas', authenticateToken([1, 2]), reservaRoutes); // Accesible para roleId = 1 y roleId = 2
app.use('/api/pasajeros', authenticateToken([1, 2]), pasajeroRoutes); // Accesible para roleId = 1 y roleId = 2

const PORT = process.env.PORT || 3000;
db.sequelize.sync().then(() => {
  app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
});
