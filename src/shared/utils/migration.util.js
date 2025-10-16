const db = require('../../database');
const { hashPassword } = require('./password.util');
const { logger } = require('../../configs/logger');

/**
 * Migrar contraseñas de texto plano a hash bcrypt
 */
const migratePasswordsToHash = async () => {
  try {
    logger.info('Starting password migration to bcrypt hashes...');
    
    // Obtener todos los usuarios con contraseñas en texto plano
    const users = await db.query('SELECT id, user, password FROM users');
    
    if (users.length === 0) {
      logger.info('No users found to migrate');
      return;
    }

    logger.info(`Found ${users.length} users to migrate`);

    for (const user of users) {
      // Verificar si la contraseña ya está hasheada (bcrypt hashes empiezan con $2a$, $2b$, etc.)
      if (user.password.startsWith('$2')) {
        logger.info(`User ${user.user} already has hashed password, skipping`);
        continue;
      }

      // Hash de la contraseña actual
      const hashedPassword = await hashPassword(user.password);
      
      // Actualizar en la base de datos
      await db.query(
        'UPDATE users SET password = ? WHERE id = ?',
        [hashedPassword, user.id]
      );

      logger.info(`Migrated password for user: ${user.user}`);
    }

    logger.info('Password migration completed successfully');
    
  } catch (error) {
    logger.error('Error during password migration:', error);
    throw error;
  }
};

/**
 * Crear usuario de prueba con contraseña hasheada
 */
const createTestUser = async () => {
  try {
    // Verificar si ya existe el usuario admin
    const existingUser = await db.query('SELECT id FROM users WHERE user = ?', ['admin']);
    
    if (existingUser.length > 0) {
      logger.info('Admin user already exists');
      return;
    }

    // Crear usuario admin con contraseña hasheada
    const hashedPassword = await hashPassword('password123');
    
    await db.query(
      'INSERT INTO users (user, password, name, permissions) VALUES (?, ?, ?, ?)',
      ['admin', hashedPassword, 'Administrador', 'admin']
    );

    logger.info('Test admin user created successfully');
    logger.info('Credentials: admin / password123');
    
  } catch (error) {
    logger.error('Error creating test user:', error);
    throw error;
  }
};

/**
 * Verificar estructura de tabla users
 */
const checkUsersTable = async () => {
  try {
    const tableInfo = await db.query('DESCRIBE users');
    logger.info('Users table structure:', tableInfo);
    
    const userCount = await db.query('SELECT COUNT(*) as count FROM users');
    logger.info(`Total users in database: ${userCount[0].count}`);
    
    // Mostrar usuarios existentes (sin contraseñas)
    const users = await db.query('SELECT id, user, name, email FROM users');
    logger.info('Existing users:', users);
    
  } catch (error) {
    logger.error('Error checking users table:', error);
    throw error;
  }
};

module.exports = {
  migratePasswordsToHash,
  createTestUser,
  checkUsersTable
};
