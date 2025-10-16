const UsersRepository = require("./repositories/users.repository");
const { logger } = require("../configs/logger");

class UsersDebug {
  async checkUsers(req, res) {
    try {
      // Solo permitir en desarrollo
      if (process.env.NODE_ENV === 'production') {
        return res.status(403).json({
          status: 'error',
          message: 'Debug endpoint not available in production'
        });
      }

      const db = require('../database');
      
      // Verificar si la tabla users existe
      try {
        const tableInfo = await db.query('DESCRIBE users');
        logger.info('Users table structure:', tableInfo);
      } catch (error) {
        return res.status(500).json({
          status: 'error',
          message: 'Users table does not exist',
          error: error.message
        });
      }

      // Obtener todos los usuarios (sin contraseñas)
      const users = await db.query('SELECT id, user, name, permissions FROM users');
      
      // Contar usuarios
      const userCount = await db.query('SELECT COUNT(*) as count FROM users');
      
      return res.status(200).json({
        status: 'success',
        data: {
          totalUsers: userCount[0].count,
          users: users,
          message: users.length === 0 ? 'No users found in database' : `Found ${users.length} users`
        }
      });
      
    } catch (error) {
      logger.error('Error in debug endpoint:', error);
      return res.status(500).json({
        status: 'error',
        message: 'Database error',
        error: error.message
      });
    }
  }

  async createTestUser(req, res) {
    try {
      // Solo permitir en desarrollo
      if (process.env.NODE_ENV === 'production') {
        return res.status(403).json({
          status: 'error',
          message: 'Debug endpoint not available in production'
        });
      }

      const { createTestUser } = require('../shared/utils/migration.util');
      await createTestUser();
      
      return res.status(201).json({
        status: 'success',
        message: 'Test user created successfully',
        credentials: {
          username: 'admin',
          password: 'password123'
        }
      });
      
    } catch (error) {
      logger.error('Error creating test user:', error);
      return res.status(500).json({
        status: 'error',
        message: 'Error creating test user',
        error: error.message
      });
    }
  }
}

module.exports = new UsersDebug();
