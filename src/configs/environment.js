require('dotenv').config();

const config = {
  // Server Configuration
  port: process.env.PORT || 8084,
  nodeEnv: process.env.NODE_ENV || 'development',
  
  // Database Configuration
  database: {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'normal',
    port: parseInt(process.env.DB_PORT) || 3306,
    connectionLimit: 10,
    // Removed invalid options for mysql2
    // acquireTimeout, timeout, reconnect are not valid for mysql2
    waitForConnections: true,
    queueLimit: 0
  },
  
  // JWT Configuration
  jwt: {
    secret: process.env.JWT_SECRET || 'fallback_secret_key_change_in_production',
    expiresIn: process.env.JWT_EXPIRES_IN || '24h'
  },
  
  // Security Configuration
  security: {
    bcryptRounds: parseInt(process.env.BCRYPT_ROUNDS) || 12,
    rateLimitWindowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 900000, // 15 minutes
    rateLimitMaxRequests: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 1000
  },
  
  // CORS Configuration
  cors: {
    allowedOrigins: process.env.ALLOWED_ORIGINS ? 
      process.env.ALLOWED_ORIGINS.split(',') : 
      ['http://localhost:3000', 'http://localhost:8080']
  }
};

// Validation
if (!process.env.JWT_SECRET && config.nodeEnv === 'production') {
  throw new Error('JWT_SECRET must be defined in production environment');
}

if (!process.env.DB_PASSWORD && config.nodeEnv === 'production') {
  throw new Error('DB_PASSWORD must be defined in production environment');
}

module.exports = config;
