// app.js
require('dotenv').config();
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./swaggerConfig');
const cors = require("cors");
const db = require('./models');
const reservaRoutes = require('./routes/reserva');
const claseVueloRoutes = require('./routes/claseVuelo');
const userRoutes = require('./routes/user');
const roleRoutes = require('./routes/role');
const datosVueloRoutes = require('./routes/datosVuelo'); // Ruta de DatosVuelo

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

// Rutas
app.use('/api/users', userRoutes);
app.use('/api/roles', roleRoutes);
app.use('/api/clases-vuelo', claseVueloRoutes);
app.use('/api/reservas', reservaRoutes);
app.use('/api/datos-vuelo', datosVueloRoutes);

const PORT = process.env.PORT || 3000;
db.sequelize.sync().then(() => {
  app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
});
