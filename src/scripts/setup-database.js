#!/usr/bin/env node

/**
 * Script para configurar la base de datos con usuarios de prueba
 * Uso: node src/scripts/setup-database.js
 */

require('dotenv').config();
const { migratePasswordsToHash, createTestUser, checkUsersTable } = require('../shared/utils/migration.util');
const { logger } = require('../configs/logger');

async function setupDatabase() {
  try {
    console.log('🔧 Configurando base de datos...\n');
    
    // 1. Verificar estructura de la tabla
    console.log('📊 Verificando estructura de usuarios...');
    await checkUsersTable();
    console.log('✅ Verificación completada\n');
    
    // 2. Migrar contraseñas existentes
    console.log('🔐 Migrando contraseñas a bcrypt...');
    await migratePasswordsToHash();
    console.log('✅ Migración completada\n');
    
    // 3. Crear usuario de prueba si no existe
    console.log('👤 Creando usuario de prueba...');
    await createTestUser();
    console.log('✅ Usuario de prueba configurado\n');
    
    console.log('🎉 Configuración de base de datos completada!');
    console.log('\n📋 Credenciales de prueba:');
    console.log('   Usuario: admin');
    console.log('   Contraseña: password123');
    console.log('\n🧪 Prueba el login con:');
    console.log('curl -X POST http://localhost:8084/users/login \\');
    console.log('  -H "Content-Type: application/json" \\');
    console.log('  -d \'{"login": "admin", "password": "password123"}\'');
    
    process.exit(0);
    
  } catch (error) {
    logger.error('Error setting up database:', error);
    console.error('❌ Error configurando la base de datos:', error.message);
    process.exit(1);
  }
}

// Ejecutar solo si es llamado directamente
if (require.main === module) {
  setupDatabase();
}

module.exports = { setupDatabase };
