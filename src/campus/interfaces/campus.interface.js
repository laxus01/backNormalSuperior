/**
 * Interface for Campus entity
 * @typedef {Object} Campus
 * @property {number} id - Campus unique identifier
 * @property {string} sede - Campus name
 * @property {string} coordinador - Coordinator name
 * @property {string} telefono - Phone number
 * @property {string} direccion - Address
 * @property {number} institucion_id - Institution ID
 * @property {number} supervisor_id - Supervisor ID
 * @property {number} estado - Status (1: active, 0: inactive)
 */

/**
 * Interface for Supervisor entity
 * @typedef {Object} Supervisor
 * @property {number} id - Supervisor unique identifier
 * @property {string} supervisor - Supervisor name
 * @property {string} telefono - Phone number
 */

/**
 * Interface for Degree entity
 * @typedef {Object} Degree
 * @property {number} id - Degree unique identifier
 * @property {string} grado - Degree name
 */

/**
 * Interface for Group entity
 * @typedef {Object} Group
 * @property {number} id - Group unique identifier
 * @property {number} sede_id - Campus ID
 * @property {number} grado_id - Degree ID
 * @property {string} grupo - Group name
 * @property {number} estado - Status (1: active, 0: inactive)
 */

/**
 * Interface for Jornada entity
 * @typedef {Object} Jornada
 * @property {number} id - Jornada unique identifier
 * @property {string} jornada - Jornada name (morning, afternoon, etc.)
 */

module.exports = {
  // Export types for JSDoc usage
};
