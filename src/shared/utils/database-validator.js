const db = require('../../database');
const { logger } = require('../../configs/logger');

/**
 * Validador de estructura de base de datos
 * Verifica que las tablas y columnas existan según nuestros modelos
 */
class DatabaseValidator {
  
  /**
   * Validar estructura completa de la base de datos
   */
  async validateDatabaseStructure() {
    logger.info('Starting database structure validation...');
    
    const validationResults = {
      tables: {},
      errors: [],
      warnings: []
    };

    try {
      // Definir estructura esperada basada en el SQL
      const expectedTables = {
        users: ['id', 'user', 'password', 'permissions', 'name'],
        estudiantes: ['id', 'identificacion', 'nombre', 'telefono', 'correo', 'estado'],
        docentes: ['id', 'nombre', 'telefono', 'correo', 'sede_id', 'estado'],
        sedes: ['id', 'sede', 'coordinador', 'telefono', 'direccion', 'supervisor_id', 'institucion_id', 'estado'],
        instituciones: ['id', 'institucion', 'rector', 'direccion', 'telefono', 'sector', 'estado'],
        solicitudes: ['id', 'sede_id', 'jornada_id', 'detallegrupoc_id', 'detalle', 'docente_id'],
        solicitudes_asignadas: ['id', 'solicitud_id', 'estudiante_id', 'tipopractica_id', 'semestre_id', 'periodo_id', 'estado'],
        notas_practicas: ['id', 'juicio_id', 'nota', 'solicitud_id', 'periodo_id', 'fecha'],
        matriculas_periodo: ['id', 'estudiante_id', 'grupo_id', 'periodo_id'],
        grupos: ['id', 'grupo', 'semestre_id', 'estado'],
        semestres: ['id', 'semestre', 'orden'],
        periodos: ['id', 'periodo', 'estado'],
        jornadas: ['id', 'jornada'],
        juicios: ['id', 'juicio'],
        tipopractica: ['id', 'tipo'],
        supervisores: ['id', 'supervisor', 'telefono'],
        detalle_grupoc: ['id', 'sede_id', 'grado_id', 'grupo', 'estado'],
        estado_estudiantes: ['id', 'estado']
      };

      // Validar cada tabla
      for (const [tableName, expectedColumns] of Object.entries(expectedTables)) {
        try {
          const tableResult = await this.validateTable(tableName, expectedColumns);
          validationResults.tables[tableName] = tableResult;
          
          if (!tableResult.exists) {
            validationResults.errors.push(`Table '${tableName}' does not exist`);
          } else if (tableResult.missingColumns.length > 0) {
            validationResults.warnings.push(`Table '${tableName}' missing columns: ${tableResult.missingColumns.join(', ')}`);
          }
        } catch (error) {
          validationResults.errors.push(`Error validating table '${tableName}': ${error.message}`);
        }
      }

      // Validaciones específicas importantes
      await this.validateCriticalConstraints(validationResults);

      logger.info('Database structure validation completed', {
        tablesValidated: Object.keys(validationResults.tables).length,
        errors: validationResults.errors.length,
        warnings: validationResults.warnings.length
      });

      return validationResults;

    } catch (error) {
      logger.error('Database validation failed', { error: error.message });
      throw error;
    }
  }

  /**
   * Validar una tabla específica
   */
  async validateTable(tableName, expectedColumns) {
    try {
      // Verificar si la tabla existe
      const tableExists = await db.query(`SHOW TABLES LIKE '${tableName}'`);
      
      if (tableExists.length === 0) {
        return {
          exists: false,
          columns: [],
          missingColumns: expectedColumns,
          extraColumns: []
        };
      }

      // Obtener estructura de la tabla
      const tableStructure = await db.query(`DESCRIBE ${tableName}`);
      const actualColumns = tableStructure.map(col => col.Field);

      // Comparar columnas
      const missingColumns = expectedColumns.filter(col => !actualColumns.includes(col));
      const extraColumns = actualColumns.filter(col => !expectedColumns.includes(col));

      return {
        exists: true,
        columns: actualColumns,
        missingColumns,
        extraColumns,
        structure: tableStructure
      };

    } catch (error) {
      throw new Error(`Failed to validate table ${tableName}: ${error.message}`);
    }
  }

  /**
   * Validaciones críticas específicas
   */
  async validateCriticalConstraints(validationResults) {
    // 1. Verificar que la columna password en users sea VARCHAR(255)
    if (validationResults.tables.users && validationResults.tables.users.exists) {
      const usersStructure = validationResults.tables.users.structure;
      const passwordColumn = usersStructure.find(col => col.Field === 'password');
      
      if (passwordColumn) {
        if (!passwordColumn.Type.includes('varchar(255)')) {
          validationResults.warnings.push(
            `users.password column is '${passwordColumn.Type}' but should be 'varchar(255)' for bcrypt hashes`
          );
        }
      }
    }

    // 2. Verificar índices únicos importantes
    try {
      const estudiantesIndexes = await db.query(`SHOW INDEX FROM estudiantes WHERE Key_name = 'identificacion'`);
      if (estudiantesIndexes.length === 0) {
        validationResults.warnings.push('estudiantes table missing unique index on identificacion');
      }
    } catch (error) {
      // Tabla no existe, ya reportado
    }

    // 3. Verificar que existan datos básicos
    try {
      const userCount = await db.query('SELECT COUNT(*) as count FROM users');
      if (userCount[0].count === 0) {
        validationResults.warnings.push('users table is empty - no users configured');
      }
    } catch (error) {
      // Tabla no existe, ya reportado
    }
  }

  /**
   * Generar reporte de validación
   */
  generateValidationReport(validationResults) {
    let report = '\n📊 DATABASE STRUCTURE VALIDATION REPORT\n';
    report += '=' .repeat(50) + '\n\n';

    // Resumen
    const totalTables = Object.keys(validationResults.tables).length;
    const existingTables = Object.values(validationResults.tables).filter(t => t.exists).length;
    
    report += `📋 Summary:\n`;
    report += `   Tables validated: ${totalTables}\n`;
    report += `   Tables existing: ${existingTables}\n`;
    report += `   Errors: ${validationResults.errors.length}\n`;
    report += `   Warnings: ${validationResults.warnings.length}\n\n`;

    // Errores
    if (validationResults.errors.length > 0) {
      report += `❌ ERRORS:\n`;
      validationResults.errors.forEach(error => {
        report += `   - ${error}\n`;
      });
      report += '\n';
    }

    // Warnings
    if (validationResults.warnings.length > 0) {
      report += `⚠️  WARNINGS:\n`;
      validationResults.warnings.forEach(warning => {
        report += `   - ${warning}\n`;
      });
      report += '\n';
    }

    // Detalles por tabla
    report += `📋 TABLE DETAILS:\n`;
    for (const [tableName, tableInfo] of Object.entries(validationResults.tables)) {
      const status = tableInfo.exists ? '✅' : '❌';
      report += `   ${status} ${tableName}`;
      
      if (tableInfo.exists) {
        report += ` (${tableInfo.columns.length} columns)`;
        if (tableInfo.missingColumns.length > 0) {
          report += ` - Missing: ${tableInfo.missingColumns.join(', ')}`;
        }
        if (tableInfo.extraColumns.length > 0) {
          report += ` - Extra: ${tableInfo.extraColumns.join(', ')}`;
        }
      }
      report += '\n';
    }

    return report;
  }
}

module.exports = new DatabaseValidator();
