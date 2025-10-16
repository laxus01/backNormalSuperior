const mysql = require('mysql2');
const { promisify } = require('util');
const config = require('./configs/environment');
const { logger } = require('./configs/logger');

const db = mysql.createPool(config.database);

db.getConnection((err, connection) => {
  if (err) {
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      logger.error('Database connection was closed', { error: err });
    } else if (err.code === 'ER_CON_COUNT_ERROR') {
      logger.error('Database has too many connections', { error: err });
    } else if (err.code === 'ECONNREFUSED') {
      logger.error('Database connection was refused', { error: err });
    } else {
      logger.error('Database connection error', { error: err });
    }
    return;
  }

  if (connection) {
    connection.release();
    logger.info('Database connected successfully', {
      host: config.database.host,
      database: config.database.database,
      port: config.database.port
    });
  }
});

// Promisify Pool Querys
db.query = promisify(db.query);

module.exports = db;
