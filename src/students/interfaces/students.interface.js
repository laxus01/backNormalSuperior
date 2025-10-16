/**
 * Interface for Student entity
 * @typedef {Object} Student
 * @property {number} id - Student unique identifier
 * @property {string} identificacion - Student identification number
 * @property {string} nombre - Student name
 * @property {string} telefono - Phone number
 * @property {string} correo - Email address
 * @property {number} estado - Status (1: active, 0: inactive)
 */

/**
 * Interface for Enrollment entity
 * @typedef {Object} Enrollment
 * @property {number} id - Enrollment unique identifier
 * @property {number} estudiante_id - Student ID
 * @property {number} grupo_id - Group ID
 * @property {number} periodo_id - Period ID
 */

/**
 * Interface for Group entity
 * @typedef {Object} Group
 * @property {number} id - Group unique identifier
 * @property {string} grupo - Group name/identifier
 * @property {number} semestre_id - Semester ID
 */

/**
 * Interface for Student State entity
 * @typedef {Object} StudentState
 * @property {number} id - State unique identifier
 * @property {string} estado - State name (active, withdrawn, etc.)
 */

module.exports = {
  // Export types for JSDoc usage
};
