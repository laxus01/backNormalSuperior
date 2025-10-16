/**
 * Interface for User entity
 * @typedef {Object} User
 * @property {number} id - User unique identifier
 * @property {string} user - Username
 * @property {string} password - User password (hashed)
 * @property {string} name - User full name
 * @property {string} email - User email address
 * @property {Date} created_at - Account creation date
 * @property {Date} updated_at - Last update date
 */

/**
 * Interface for Login credentials
 * @typedef {Object} LoginCredentials
 * @property {string} login - Username
 * @property {string} password - User password
 */

/**
 * Interface for Authentication response
 * @typedef {Object} AuthResponse
 * @property {Object} res - Response object
 * @property {string} res.message - Authentication message
 * @property {string} res.token - JWT token
 * @property {string} res.name - User name
 */

module.exports = {
  // Export types for JSDoc usage
};
