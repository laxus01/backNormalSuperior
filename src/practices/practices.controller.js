const PracticesService = require("./practices.service");

class PracticesController {
  async savePractice(req, res) {
    try {
      const result = await PracticesService.savePractice(req.body);
      return res.status(201).json(result);
    } catch (error) {
      return res.status(500).json({ 
        respuesta: "Error al guardar la práctica.",
        error: error.message 
      });
    }
  }

  async saveAssign(req, res) {
    try {
      const result = await PracticesService.saveAssign(req.body);
      return res.status(201).json(result);
    } catch (error) {
      return res.status(500).json({ 
        respuesta: "Error al asignar la práctica.",
        error: error.message 
      });
    }
  }

  async saveRecord(req, res) {
    try {
      const result = await PracticesService.saveRecord(req.body);
      return res.status(201).json(result);
    } catch (error) {
      return res.status(500).json({ 
        respuesta: "Error al guardar la calificación.",
        error: error.message 
      });
    }
  }

  async getPractices(req, res) {
    try {
      const result = await PracticesService.getPractices();
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({ 
        res: "Error al consultar las prácticas.",
        error: error.message 
      });
    }
  }

  async getPracticesByGroup(req, res) {
    try {
      const result = await PracticesService.getPracticesByGroup(req.params.id);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({ 
        res: "Error al consultar las prácticas.",
        error: error.message 
      });
    }
  }

  async getPracticesByInstitution(req, res) {
    try {
      const result = await PracticesService.getPracticesByInstitution(req.params.id);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({ 
        res: "Error al consultar las prácticas.",
        error: error.message 
      });
    }
  }

  async getPracticesBySupervisor(req, res) {
    try {
      const result = await PracticesService.getPracticesBySupervisor(req.params.id);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({ 
        res: "Error al consultar las prácticas.",
        error: error.message 
      });
    }
  }

  async getPracticesAssign(req, res) {
    try {
      const result = await PracticesService.getPracticesAssign();
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({ 
        res: "Error al consultar las prácticas.",
        error: error.message 
      });
    }
  }

  async getListStudentsAvailable(req, res) {
    try {
      const result = await PracticesService.getListStudentsAvailable();
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({ 
        res: "Error al consultar los maestros en formación.",
        error: error.message 
      });
    }
  }

  async getConsolidateRecords(req, res) {
    try {
      const result = await PracticesService.getConsolidateRecords();
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({ 
        res: "Error al consultar el consolidado de notas.",
        error: error.message 
      });
    }
  }

  async getConsolidateRecordsByGroup(req, res) {
    try {
      const result = await PracticesService.getConsolidateRecordsByGroup(req.params.id);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({ 
        res: "Error al consultar el consolidado de notas.",
        error: error.message 
      });
    }
  }

  async getJudgments(req, res) {
    try {
      const result = await PracticesService.getJudgments();
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({ 
        res: "Error al consultar los juicios.",
        error: error.message 
      });
    }
  }

  async getTypePractice(req, res) {
    try {
      const result = await PracticesService.getTypePractice();
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({ 
        res: "Error al consultar tipos de prácticas.",
        error: error.message 
      });
    }
  }

  async updatePractice(req, res) {
    try {
      const result = await PracticesService.updatePractice(req.params.id, req.body);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({ 
        res: "Error al actualizar el maestro titular.",
        error: error.message 
      });
    }
  }

  async inactivatePractice(req, res) {
    try {
      const result = await PracticesService.inactivatePractice(req.params.id);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({ 
        res: "Error al eliminar la asignación.",
        error: error.message 
      });
    }
  }

  async deleteAssign(req, res) {
    try {
      const result = await PracticesService.deleteAssign(req.params.id);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({ 
        res: "Error al eliminar la solicitud.",
        error: error.message 
      });
    }
  }
}

module.exports = new PracticesController();
