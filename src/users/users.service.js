const UsersRepository = require("./repositories/users.repository");
const jwt = require("jsonwebtoken");
const config = require("../configs/environment");
const { comparePassword } = require("../shared/utils/password.util");
const { securityLogger } = require("../configs/logger");

class UsersService {
  async authenticateUser(credentials, clientInfo = {}) {
    const { login, password } = credentials;
    const { ip, userAgent } = clientInfo;
    
    if (!login || !password) {
      securityLogger.warn('Authentication attempt with missing credentials', {
        ip,
        userAgent,
        hasLogin: !!login,
        hasPassword: !!password
      });
      throw new Error("Usuario y contraseña son obligatorios");
    }

    // Find user by username only
    const user = await UsersRepository.findByUsername(login);
    
    if (!user) {
      securityLogger.warn('Authentication attempt with non-existent user', {
        ip,
        userAgent,
        attemptedUsername: login
      });
      throw new Error("Usuario o contraseña incorrectos");
    }

    let isPasswordValid = false;

    // Check if password is already hashed (bcrypt format)
    if (user.password.startsWith('$2')) {
      // Use bcrypt comparison for hashed passwords
      isPasswordValid = await comparePassword(password, user.password);
    } else {
      // Direct comparison for plain text passwords (legacy support)
      isPasswordValid = password === user.password;
      
      // Log that we're using legacy authentication
      securityLogger.warn('Legacy plain text password authentication used', {
        userId: user.id,
        username: user.user,
        ip,
        userAgent,
        message: 'Consider migrating to hashed passwords'
      });
    }
    
    if (!isPasswordValid) {
      securityLogger.warn('Authentication attempt with invalid password', {
        ip,
        userAgent,
        userId: user.id,
        username: user.user
      });
      throw new Error("Usuario o contraseña incorrectos");
    }

    // Generate JWT token
    const payload = {
      check: true,
      userId: user.id,
      username: user.user,
      iat: Math.floor(Date.now() / 1000)
    };

    const token = jwt.sign(payload, config.jwt.secret, {
      expiresIn: config.jwt.expiresIn
    });

    securityLogger.info('Successful authentication', {
      userId: user.id,
      username: user.user,
      ip,
      userAgent,
      passwordType: user.password.startsWith('$2') ? 'hashed' : 'plaintext'
    });

    return {
      res: {
        message: "Autenticación correcta",
        token: token,
        name: user.name,
        expiresIn: config.jwt.expiresIn
      }
    };
  }

  verifyToken(token) {
    try {
      return jwt.verify(token, config.jwt.secret);
    } catch (error) {
      throw new Error("Token inválido");
    }
  }
}

module.exports = new UsersService();
