const InstitutionsService = require("./institutions.service");

class InstitutionsController {
  async saveInstitution(req, res) {
    try {
      const result = await InstitutionsService.saveInstitution(req.body);
      return res.status(201).json(result);
    } catch (error) {
      return res.status(500).json({ 
        respuesta: "Error al guardar la institución.",
        error: error.message 
      });
    }
  }

  async getInstitutions(req, res) {
    try {
      const result = await InstitutionsService.getInstitutions();
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({ 
        res: "Error al consultar las instituciones.",
        error: error.message 
      });
    }
  }

  async updateInstitution(req, res) {
    try {
      const result = await InstitutionsService.updateInstitution(req.params.id, req.body);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({ 
        res: "Error al actualizar la institución.",
        error: error.message 
      });
    }
  }

  async inactivateInstitution(req, res) {
    try {
      const result = await InstitutionsService.inactivateInstitution(req.params.id);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({ 
        res: "Error al eliminar la institución.",
        error: error.message 
      });
    }
  }
}

module.exports = new InstitutionsController();
