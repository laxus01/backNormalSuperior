const jwt = require('jsonwebtoken');
const config = require('../../configs/environment');
const { securityLogger } = require('../../configs/logger');

/**
 * Middleware to verify JWT token
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
      securityLogger.warn('Access attempt without authorization header', {
        ip: req.ip,
        userAgent: req.get('User-Agent'),
        url: req.originalUrl,
        method: req.method
      });
      
      return res.status(401).json({
        status: 'error',
        message: 'Token de acceso requerido'
      });
    }

    const token = authHeader.startsWith('Bearer ') 
      ? authHeader.slice(7) 
      : authHeader;

    if (!token) {
      securityLogger.warn('Access attempt with malformed authorization header', {
        ip: req.ip,
        userAgent: req.get('User-Agent'),
        url: req.originalUrl,
        method: req.method,
        authHeader: authHeader.substring(0, 20) + '...'
      });
      
      return res.status(401).json({
        status: 'error',
        message: 'Token de acceso inválido'
      });
    }

    const decoded = jwt.verify(token, config.jwt.secret);
    
    // Add user info to request
    req.user = {
      id: decoded.userId,
      username: decoded.username,
      check: decoded.check
    };

    securityLogger.info('Successful token verification', {
      userId: decoded.userId,
      username: decoded.username,
      ip: req.ip,
      url: req.originalUrl,
      method: req.method
    });

    next();
    
  } catch (error) {
    securityLogger.warn('Token verification failed', {
      error: error.message,
      ip: req.ip,
      userAgent: req.get('User-Agent'),
      url: req.originalUrl,
      method: req.method
    });

    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        status: 'error',
        message: 'Token expirado'
      });
    }

    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        status: 'error',
        message: 'Token inválido'
      });
    }

    return res.status(500).json({
      status: 'error',
      message: 'Error interno del servidor'
    });
  }
};

/**
 * Optional authentication middleware - doesn't fail if no token
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
const optionalAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader) {
    return next();
  }

  try {
    const token = authHeader.startsWith('Bearer ') 
      ? authHeader.slice(7) 
      : authHeader;

    const decoded = jwt.verify(token, config.jwt.secret);
    req.user = {
      id: decoded.userId,
      username: decoded.username,
      check: decoded.check
    };
  } catch (error) {
    // Log but don't fail
    securityLogger.info('Optional auth failed', {
      error: error.message,
      ip: req.ip
    });
  }

  next();
};

module.exports = {
  verifyToken,
  optionalAuth
};
