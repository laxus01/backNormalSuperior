const InstitutionsRepository = require("./repositories/institutions.repository");

class InstitutionsService {
  async saveInstitution(institutionData) {
    const { institucion, rector, telefono, direccion, sector } = institutionData;
    
    if (!institucion || !rector || !sector) {
      throw new Error("Los campos institución, rector y sector son obligatorios");
    }

    await InstitutionsRepository.createInstitution({
      institucion,
      rector,
      telefono,
      direccion,
      sector
    });

    return { respuesta: "La institución se registró correctamente" };
  }

  async getInstitutions() {
    const institutions = await InstitutionsRepository.findAllInstitutions();
    
    if (institutions.length === 0) {
      return { res: "No existen instituciones registradas" };
    }

    return { desserts: institutions };
  }

  async updateInstitution(institutionId, institutionData) {
    if (!institutionId) {
      throw new Error("El ID de la institución es obligatorio");
    }

    const { institucion, rector, telefono, direccion, sector } = institutionData;

    await InstitutionsRepository.updateInstitution(institutionId, {
      institucion,
      rector,
      telefono,
      direccion,
      sector
    });

    return { res: "Institución actualizada correctamente" };
  }

  async inactivateInstitution(institutionId) {
    if (!institutionId) {
      throw new Error("El ID de la institución es obligatorio");
    }

    await InstitutionsRepository.inactivateInstitution(institutionId);
    return { res: "La institución se eliminó correctamente" };
  }
}

module.exports = new InstitutionsService();
