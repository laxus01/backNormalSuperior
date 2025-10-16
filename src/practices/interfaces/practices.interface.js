/**
 * Interface for Practice entity
 * @typedef {Object} Practice
 * @property {number} id - Practice unique identifier
 * @property {number} sede_id - Campus ID
 * @property {number} jornada_id - Schedule ID
 * @property {number} detallegrupoc_id - Group detail ID
 * @property {string} detalle - Practice details
 * @property {number} docente_id - Teacher ID
 * @property {number} estado - Status (1: active, 0: inactive)
 */

/**
 * Interface for Practice Assignment entity
 * @typedef {Object} PracticeAssignment
 * @property {number} id - Assignment unique identifier
 * @property {number} solicitud_id - Request ID
 * @property {number} estudiante_id - Student ID
 * @property {number} tipopractica_id - Practice type ID
 * @property {number} semestre_id - Semester ID
 * @property {number} periodo_id - Period ID
 * @property {number} estado - Status (1: active, 0: inactive)
 */

/**
 * Interface for Practice Record entity
 * @typedef {Object} PracticeRecord
 * @property {number} id - Record unique identifier
 * @property {number} solicitud_id - Request ID
 * @property {number} periodo_id - Period ID
 * @property {number} juicio_id - Judgment ID
 * @property {number} nota - Grade (0-5)
 */

/**
 * Interface for Judgment entity
 * @typedef {Object} Judgment
 * @property {number} id - Judgment unique identifier
 * @property {string} juicio - Judgment name
 */

/**
 * Interface for Practice Type entity
 * @typedef {Object} PracticeType
 * @property {number} id - Practice type unique identifier
 * @property {string} tipo - Practice type name
 */

module.exports = {
  // Export types for JSDoc usage
};
