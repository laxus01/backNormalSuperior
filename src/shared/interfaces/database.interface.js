/**
 * Interfaces completas de la base de datos basadas en normal.sql
 * Todas las interfaces están validadas contra la estructura real
 */

/**
 * @typedef {Object} User
 * @property {number} id - User unique identifier
 * @property {string} user - Username (email format)
 * @property {string} password - Hashed password (VARCHAR 255)
 * @property {string} permissions - User permissions level
 * @property {string} name - User full name
 */

/**
 * @typedef {Object} Student
 * @property {number} id - Student unique identifier
 * @property {number} identificacion - Student identification (UNIQUE)
 * @property {string} nombre - Student name
 * @property {string} telefono - Phone number
 * @property {string} correo - Email address
 * @property {number} estado - Status (1: active, 0: inactive)
 */

/**
 * @typedef {Object} Teacher
 * @property {number} id - Teacher unique identifier
 * @property {string} nombre - Teacher name
 * @property {string} telefono - Phone number
 * @property {string} correo - Email address
 * @property {number} sede_id - Campus ID
 * @property {number} estado - Status (1: active, 0: inactive)
 */

/**
 * @typedef {Object} Institution
 * @property {number} id - Institution unique identifier
 * @property {string} institucion - Institution name
 * @property {string} rector - Principal name
 * @property {string} direccion - Address
 * @property {string} telefono - Phone number
 * @property {string} sector - Sector (public/private)
 * @property {number} estado - Status (1: active, 0: inactive)
 */

/**
 * @typedef {Object} Campus
 * @property {number} id - Campus unique identifier
 * @property {string} sede - Campus name
 * @property {string} coordinador - Coordinator name
 * @property {string} telefono - Phone number
 * @property {string} direccion - Address
 * @property {number} supervisor_id - Supervisor ID
 * @property {number} institucion_id - Institution ID
 * @property {number} estado - Status (1: active, 0: inactive)
 */

/**
 * @typedef {Object} PracticeRequest
 * @property {number} id - Request unique identifier
 * @property {number} sede_id - Campus ID
 * @property {number} jornada_id - Schedule ID
 * @property {number} detallegrupoc_id - Group detail ID
 * @property {string} detalle - Practice details
 * @property {number} docente_id - Teacher ID
 */

/**
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
 * @typedef {Object} PracticeGrade
 * @property {number} id - Grade unique identifier
 * @property {number} juicio_id - Judgment ID
 * @property {string} nota - Grade/Note (longtext)
 * @property {number} solicitud_id - Request ID
 * @property {number} periodo_id - Period ID
 * @property {Date} fecha - Timestamp
 */

/**
 * @typedef {Object} Enrollment
 * @property {number} id - Enrollment unique identifier
 * @property {number} estudiante_id - Student ID
 * @property {number} grupo_id - Group ID
 * @property {number} periodo_id - Period ID
 */

/**
 * @typedef {Object} Group
 * @property {number} id - Group unique identifier
 * @property {string} grupo - Group name/identifier
 * @property {number} semestre_id - Semester ID
 * @property {number} estado - Status (1: active, 0: inactive)
 */

/**
 * @typedef {Object} Semester
 * @property {number} id - Semester unique identifier
 * @property {string} semestre - Semester name
 * @property {number} orden - Order/sequence
 */

/**
 * @typedef {Object} Period
 * @property {number} id - Period unique identifier
 * @property {string} periodo - Period name
 * @property {number} estado - Status (1: active, 0: inactive)
 */

/**
 * @typedef {Object} Schedule
 * @property {number} id - Schedule unique identifier
 * @property {string} jornada - Schedule name (morning, afternoon, night)
 */

/**
 * @typedef {Object} Judgment
 * @property {number} id - Judgment unique identifier
 * @property {string} juicio - Judgment criteria
 */

/**
 * @typedef {Object} PracticeType
 * @property {number} id - Practice type unique identifier
 * @property {string} tipo - Practice type name
 */

/**
 * @typedef {Object} Supervisor
 * @property {number} id - Supervisor unique identifier
 * @property {string} supervisor - Supervisor name
 * @property {string} telefono - Phone number
 */

/**
 * @typedef {Object} GroupDetail
 * @property {number} id - Group detail unique identifier
 * @property {number} sede_id - Campus ID
 * @property {number} grado_id - Grade ID
 * @property {string} grupo - Group identifier
 * @property {number} estado - Status (1: active, 0: inactive)
 */

/**
 * @typedef {Object} StudentState
 * @property {number} id - State unique identifier
 * @property {string} estado - State name
 */

/**
 * @typedef {Object} Graduate
 * @property {number} id - Graduate record unique identifier
 * @property {number} periodo_id - Period ID
 * @property {number} grupo_id - Group ID
 * @property {number} estudiante_id - Student ID
 */

module.exports = {
  // Export for JSDoc usage - all types are defined above
};
