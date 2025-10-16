const UsersService = require("./users.service");

class UsersController {
  async login(req, res) {
    try {
      const clientInfo = {
        ip: req.ip || req.connection.remoteAddress,
        userAgent: req.get('User-Agent')
      };
      
      const result = await UsersService.authenticateUser(req.body, clientInfo);
      return res.status(200).json(result);
    } catch (error) {
      if (error.message === "Usuario o contraseña incorrectos") {
        return res.status(401).json({ 
          status: 'error',
          message: error.message 
        });
      }
      if (error.message === "Usuario y contraseña son obligatorios") {
        return res.status(400).json({ 
          status: 'error',
          message: error.message 
        });
      }
      return res.status(500).json({ 
        status: 'error',
        message: "Error interno del servidor"
      });
    }
  }
}

module.exports = new UsersController();
