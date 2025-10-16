const StudentsService = require("./students.service");

class StudentsController {
  async saveStudent(req, res) {
    try {
      const result = await StudentsService.saveStudent(req.body);
      return res.status(201).json(result);
    } catch (error) {
      return res.status(500).json({ 
        respuesta: "Error al guardar el maestro en formación.",
        error: error.message 
      });
    }
  }

  async saveEnroll(req, res) {
    try {
      const result = await StudentsService.saveEnroll(req.body);
      return res.status(201).json(result);
    } catch (error) {
      return res.status(500).json({ 
        respuesta: "Error al guardar la matrícula.",
        error: error.message 
      });
    }
  }

  async saveEnrollGroup(req, res) {
    try {
      const result = await StudentsService.saveEnrollGroup(req.body);
      return res.status(201).json(result);
    } catch (error) {
      return res.status(500).json({ 
        respuesta: "Error al guardar la matrícula.",
        error: error.message 
      });
    }
  }

  async getStudent(req, res) {
    try {
      const result = await StudentsService.getStudent();
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({ 
        res: "Error al consultar los estudiantes.",
        error: error.message 
      });
    }
  }

  async getStudentEnrroll(req, res) {
    try {
      const result = await StudentsService.getStudentEnrroll();
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({ 
        res: "Error al consultar las matrículas.",
        error: error.message 
      });
    }
  }

  async getStudentsByPracticeActive(req, res) {
    try {
      const result = await StudentsService.getStudentsByPracticeActive();
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({ 
        res: "Error al consultar las matrículas.",
        error: error.message 
      });
    }
  }

  async getGroups(req, res) {
    try {
      const result = await StudentsService.getGroups();
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({ 
        res: "Error al consultar los grupos.",
        error: error.message 
      });
    }
  }

  async updateStudent(req, res) {
    try {
      const result = await StudentsService.updateStudent(req.params.id, req.body);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({ 
        res: "Error al actualizar el estudiante.",
        error: error.message 
      });
    }
  }

  async updateEnroll(req, res) {
    try {
      const result = await StudentsService.updateEnroll(req.params.id, req.body);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({ 
        res: "Error al actualizar el grupo.",
        error: error.message 
      });
    }
  }

  async changeStateStudent(req, res) {
    try {
      const result = await StudentsService.changeStateStudent(req.params.id, req.params.state);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({ 
        res: "Error al cambiar estado del estudiante.",
        error: error.message 
      });
    }
  }

  async deleteEnroll(req, res) {
    try {
      const result = await StudentsService.deleteEnroll(req.params.id);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({ 
        res: "Error al eliminar la matrícula.",
        error: error.message 
      });
    }
  }
}

module.exports = new StudentsController();
