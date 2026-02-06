const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require('cors');
const config = require("./configs/environment");
const { logger } = require('./configs/logger');
const { 
  generalLimiter, 
  helmetConfig, 
  sanitizeInput, 
  securityHeaders, 
  securityLogging 
} = require('./shared/middlewares/security.middleware');

// Module paths
const usersPath = "/users";
const campusPath = "/api/campus";
const institutionsPath = "/api/institutions";
const teachersPath = "/api/teachers";
const studentsPath = "/api/students";
const practicesPath = "/api/practices";
const periodsPath = "/api/periods";

// Intializations
const app = express();

// Settings
app.set("port", config.port);
app.set("trust proxy", 1); // Trust first proxy for rate limiting
app.disable('x-powered-by'); // Remove Express signature

// Security Middlewares
app.use(helmetConfig);
app.use(securityHeaders);
app.use(securityLogging);

// Apply rate limiter only to public routes (login, etc.)
// API routes are protected by JWT authentication
app.use(usersPath, generalLimiter);

// CORS Configuration
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (mobile apps, etc.)
    if (!origin) return callback(null, true);
    
    // Allow exact matches from configuration, and Railway subdomains
    let isAllowed = config.cors.allowedOrigins.indexOf(origin) !== -1;
    if (!isAllowed) {
      try {
        const { hostname } = new URL(origin);
        if (hostname.endsWith('.railway.app')) {
          isAllowed = true;
        }
      } catch (e) {
        // Ignore URL parse errors; will be handled as not allowed
      }
    }

    if (isAllowed) {
      callback(null, true);
    } else {
      logger.warn('CORS blocked request', { origin, userAgent: 'unknown' });
      callback(new Error('No permitido por CORS'));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'X-Requested-With',
    'Accept',
    'Origin',
    'sec-ch-ua',
    'sec-ch-ua-mobile',
    'sec-ch-ua-platform'
  ]
};

app.use(cors(corsOptions));
// Explicitly handle preflight for all routes and the login endpoint
app.options('*', cors(corsOptions));
app.options(usersPath + '/login', cors(corsOptions));

// Body parsing middlewares
app.use(bodyParser.urlencoded({ 
  extended: false, 
  limit: '10mb',
  parameterLimit: 20
}));
app.use(bodyParser.json({ 
  limit: '10mb',
  strict: true
}));

// Input sanitization
app.use(sanitizeInput);

// Logging middleware
app.use(morgan('combined', {
  stream: {
    write: (message) => logger.info(message.trim())
  }
}));

// Modular Routes - Following Controller-Service-Repository pattern
app.use(usersPath, require("./users/users.module"));
app.use(campusPath, require("./campus/campus.module"));
app.use(institutionsPath, require("./institutions/institutions.module"));
app.use(teachersPath, require("./teachers/teachers.module"));
app.use(studentsPath, require("./students/students.module"));
app.use(practicesPath, require("./practices/practices.module"));
app.use(periodsPath, require("./shared/utils/periods.module"));


// Global error handler
app.use((error, req, res, next) => {
  logger.error('Global error handler', {
    error: error.message,
    stack: error.stack,
    url: req.originalUrl,
    method: req.method,
    ip: req.ip,
    userAgent: req.get('User-Agent')
  });

  // Don't leak error details in production
  const isDevelopment = config.nodeEnv === 'development';
  
  res.status(error.status || 500).json({
    status: "error",
    message: isDevelopment ? error.message : "Error interno del servidor",
    ...(isDevelopment && { stack: error.stack })
  });
});

// 404 handler
app.use('*', (req, res) => {
  logger.warn('404 - Route not found', {
    url: req.originalUrl,
    method: req.method,
    ip: req.ip,
    userAgent: req.get('User-Agent')
  });
  
  res.status(404).json({
    status: 'error',
    message: 'Ruta no encontrada'
  });
});

// Graceful shutdown
process.on('SIGTERM', () => {
  logger.info('SIGTERM received, shutting down gracefully');
  process.exit(0);
});

process.on('SIGINT', () => {
  logger.info('SIGINT received, shutting down gracefully');
  process.exit(0);
});

// Unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  logger.error('Unhandled Rejection at:', { promise, reason });
});

// Uncaught exceptions
process.on('uncaughtException', (error) => {
  logger.error('Uncaught Exception:', { error: error.message, stack: error.stack });
  process.exit(1);
});

// Starting server
const server = app.listen(app.get("port"), () => {
  logger.info(`Server started successfully`, {
    port: app.get("port"),
    environment: config.nodeEnv,
    timestamp: new Date().toISOString()
  });
  console.log(`🚀 Server running on port ${app.get("port")}`);
  console.log(`🌍 Environment: ${config.nodeEnv}`);
  console.log(`🔗 URL: http://localhost:${app.get("port")}`);
}).on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    logger.error(`Port ${app.get("port")} is already in use`, { error });
    console.error(`❌ Error: Puerto ${app.get("port")} ya está en uso`);
    console.error(`💡 Solución: Ejecuta 'npm run restart' para reiniciar el servidor`);
    process.exit(1);
  } else {
    logger.error('Server startup error', { error });
    console.error('❌ Error iniciando servidor:', error.message);
    process.exit(1);
  }
});

// Set server timeout
server.timeout = 30000; // 30 seconds

module.exports = app;


