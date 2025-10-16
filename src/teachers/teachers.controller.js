const TeachersService = require("./teachers.service");

class TeachersController {
  async saveTeacher(req, res) {
    try {
      const result = await TeachersService.saveTeacher(req.body);
      return res.status(201).json(result);
    } catch (error) {
      return res.status(500).json({ 
        respuesta: "Error al guardar el maestro titular.",
        error: error.message 
      });
    }
  }

  async getTeachers(req, res) {
    try {
      const result = await TeachersService.getTeachers();
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({ 
        res: "Error al consultar los maestros titulares.",
        error: error.message 
      });
    }
  }

  async updateTeacher(req, res) {
    try {
      const result = await TeachersService.updateTeacher(req.params.id, req.body);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({ 
        res: "Error al actualizar el maestro titular.",
        error: error.message 
      });
    }
  }

  async inactivateTeacher(req, res) {
    try {
      const result = await TeachersService.inactivateTeacher(req.params.id);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({ 
        res: "Error al eliminar el maestro titular.",
        error: error.message 
      });
    }
  }
}

module.exports = new TeachersController();
