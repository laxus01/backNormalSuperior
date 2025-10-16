const { verifyToken } = require('./auth.middleware');
const { strictLimiter } = require('./security.middleware');

/**
 * Middleware to protect routes that require authentication
 */
const protectRoute = [
  verifyToken
];

/**
 * Middleware to protect sensitive routes with strict rate limiting
 */
const protectSensitiveRoute = [
  strictLimiter,
  verifyToken
];

/**
 * Middleware for admin-only routes
 */
const adminOnly = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      status: 'error',
      message: 'Acceso no autorizado'
    });
  }

  // Check if user has admin privileges (you can customize this logic)
  if (req.user.role !== 'admin' && req.user.username !== 'admin') {
    return res.status(403).json({
      status: 'error',
      message: 'Permisos insuficientes'
    });
  }

  next();
};

module.exports = {
  protectRoute,
  protectSensitiveRoute,
  adminOnly
};
