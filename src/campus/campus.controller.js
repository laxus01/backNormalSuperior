const CampusService = require("./campus.service");

class CampusController {
  async saveCampus(req, res) {
    try {
      const result = await CampusService.saveCampus(req.body);
      return res.status(201).json(result);
    } catch (error) {
      return res.status(500).json({ 
        respuesta: "Error al guardar la sede.",
        error: error.message 
      });
    }
  }

  async saveSupervisor(req, res) {
    try {
      const result = await CampusService.saveSupervisor(req.body);
      return res.status(201).json(result);
    } catch (error) {
      return res.status(500).json({ 
        respuesta: "Error al guardar el supervisor.",
        error: error.message 
      });
    }
  }

  async saveDegree(req, res) {
    try {
      const result = await CampusService.saveDegree(req.body);
      return res.status(201).json(result);
    } catch (error) {
      return res.status(500).json({ 
        respuesta: "Error al guardar el grado.",
        error: error.message 
      });
    }
  }

  async saveGroup(req, res) {
    try {
      const result = await CampusService.saveGroup(req.body);
      return res.status(201).json(result);
    } catch (error) {
      return res.status(500).json({ 
        respuesta: "Error al guardar el grupo.",
        error: error.message 
      });
    }
  }

  async getCampus(req, res) {
    try {
      const result = await CampusService.getCampus();
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({ 
        res: "Error al consultar las sedes.",
        error: error.message 
      });
    }
  }

  async getSupervisors(req, res) {
    try {
      const result = await CampusService.getSupervisors();
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({ 
        res: "Error al consultar los supervisores.",
        error: error.message 
      });
    }
  }

  async getDegrees(req, res) {
    try {
      const result = await CampusService.getDegrees();
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({ 
        res: "Error al consultar los grados.",
        error: error.message 
      });
    }
  }

  async getGroups(req, res) {
    try {
      const result = await CampusService.getGroups();
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({ 
        res: "Error al consultar los grupos.",
        error: error.message 
      });
    }
  }

  async getTeachersByCampus(req, res) {
    try {
      const result = await CampusService.getTeachersByCampus(req.params.id);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({ 
        res: "Error al consultar los docentes.",
        error: error.message 
      });
    }
  }

  async getDegreesByCampus(req, res) {
    try {
      const result = await CampusService.getDegreesByCampus(req.params.id);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({ 
        res: "Error al consultar los grados.",
        error: error.message 
      });
    }
  }

  async getGroupsByDegree(req, res) {
    try {
      const result = await CampusService.getGroupsByDegree(req.params.id, req.params.sede);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({ 
        res: "Error al consultar los grupos.",
        error: error.message 
      });
    }
  }

  async getJornadas(req, res) {
    try {
      const result = await CampusService.getJornadas();
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({ 
        res: "Error al consultar las jornadas.",
        error: error.message 
      });
    }
  }

  async listCampusByInstitution(req, res) {
    try {
      const result = await CampusService.listCampusByInstitution();
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({ 
        res: "Error al consultar las sedes.",
        error: error.message 
      });
    }
  }

  async updateCampus(req, res) {
    try {
      const result = await CampusService.updateCampus(req.params.id, req.body);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({ 
        res: "Error al actualizar la sede.",
        error: error.message 
      });
    }
  }

  async updateGroup(req, res) {
    try {
      const result = await CampusService.updateGroup(req.params.id, req.body);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({ 
        res: "Error al actualizar el grupo.",
        error: error.message 
      });
    }
  }

  async inactivateGroup(req, res) {
    try {
      const result = await CampusService.inactivateGroup(req.params.id);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({ 
        res: "Error al eliminar el grupo.",
        error: error.message 
      });
    }
  }

  async inactivateCampus(req, res) {
    try {
      const result = await CampusService.inactivateCampus(req.params.id);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({ 
        res: "Error al eliminar la sede.",
        error: error.message 
      });
    }
  }
}

module.exports = new CampusController();
