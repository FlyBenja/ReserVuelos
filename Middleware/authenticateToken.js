const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

function authenticateToken(roles = []) {
  return (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ error: 'Acceso denegado. Token no proporcionado.' });
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({ error: 'Token inválido.' });
      }

      // Verificar si el rol del usuario está permitido para acceder a la ruta
      if (roles.length && !roles.includes(user.roleId)) {
        return res.status(403).json({ error: 'Acceso denegado. Permisos insuficientes.' });
      }

      req.user = user;
      next();
    });
  };
}

// Función para generar un nuevo token con duración de 1 hora
function generateToken(user) {
  return jwt.sign({ id: user.id, roleId: user.roleId }, JWT_SECRET, { expiresIn: '1h' });
}

module.exports = { authenticateToken, generateToken };
