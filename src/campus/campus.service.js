const CampusRepository = require("./repositories/campus.repository");

class CampusService {
  async saveCampus(campusData) {
    const { sede, coordinador, telefono, direccion, institucion_id, supervisor_id } = campusData;
    
    if (!sede || !coordinador || !institucion_id || !supervisor_id) {
      throw new Error("Faltan campos obligatorios para crear la sede");
    }

    const result = await CampusRepository.createCampus({
      sede,
      coordinador,
      telefono,
      direccion,
      institucion_id,
      supervisor_id
    });

    return { respuesta: "La sede se registró correctamente" };
  }

  async saveSupervisor(supervisorData) {
    const { supervisor, telefono } = supervisorData;
    
    if (!supervisor) {
      throw new Error("El nombre del supervisor es obligatorio");
    }

    const result = await CampusRepository.createSupervisor({
      supervisor,
      telefono
    });

    return { respuesta: "El supervisor se registró correctamente" };
  }

  async saveDegree(degreeData) {
    const { grado } = degreeData;
    
    if (!grado) {
      throw new Error("El nombre del grado es obligatorio");
    }

    const result = await CampusRepository.createDegree({ grado });
    return { respuesta: "El grado se registró correctamente" };
  }

  async saveGroup(groupData) {
    const { sede_id, grado_id, grupo } = groupData;
    
    if (!sede_id || !grado_id || !grupo) {
      throw new Error("Todos los campos son obligatorios para crear el grupo");
    }

    const result = await CampusRepository.createGroup({
      sede_id,
      grado_id,
      grupo
    });

    return { respuesta: "El grupo se registró correctamente" };
  }

  async getCampus() {
    const campuses = await CampusRepository.findAllCampuses();
    
    if (campuses.length === 0) {
      return { res: "No existen sedes registradas" };
    }

    return { desserts: campuses };
  }

  async getSupervisors() {
    const supervisors = await CampusRepository.findAllSupervisors();
    
    if (supervisors.length === 0) {
      return { res: "No existen supervisores registrados" };
    }

    return { desserts: supervisors };
  }

  async getDegrees() {
    const degrees = await CampusRepository.findAllDegrees();
    
    if (degrees.length === 0) {
      return { res: "No existen grados registrados" };
    }

    return { desserts: degrees };
  }

  async getGroups() {
    const groups = await CampusRepository.findAllGroups();
    
    if (groups.length === 0) {
      return { res: "No existen grupos registrados" };
    }

    return { desserts: groups };
  }

  async getTeachersByCampus(campusId) {
    if (!campusId) {
      throw new Error("El ID de la sede es obligatorio");
    }

    const teachers = await CampusRepository.findTeachersByCampus(campusId);
    
    if (teachers.length === 0) {
      return { res: "No existen docentes registrados para esta sede" };
    }

    return { desserts: teachers };
  }

  async getDegreesByCampus(campusId) {
    if (!campusId) {
      throw new Error("El ID de la sede es obligatorio");
    }

    const degrees = await CampusRepository.findDegreesByCampus(campusId);
    
    if (degrees.length === 0) {
      return { res: "No existen grados registrados para esta sede" };
    }

    return { desserts: degrees };
  }

  async getGroupsByDegree(degreeId, sedeId) {
    if (!degreeId || !sedeId) {
      throw new Error("El ID del grado y sede son obligatorios");
    }

    const groups = await CampusRepository.findGroupsByDegree(degreeId, sedeId);
    
    if (groups.length === 0) {
      return { res: "No existen grupos registrados para este grado" };
    }

    return { desserts: groups };
  }

  async getJornadas() {
    const jornadas = await CampusRepository.findAllJornadas();
    
    if (jornadas.length === 0) {
      return { res: "No existen jornadas registradas" };
    }

    return { desserts: jornadas };
  }

  async listCampusByInstitution() {
    const campuses = await CampusRepository.findCampusByInstitution();
    
    if (campuses.length === 0) {
      return { res: "No existen sedes registradas" };
    }

    return { desserts: campuses };
  }

  async updateCampus(campusId, campusData) {
    if (!campusId) {
      throw new Error("El ID de la sede es obligatorio");
    }

    const { sede, coordinador, telefono, direccion, supervisor_id } = campusData;

    await CampusRepository.updateCampus(campusId, {
      sede,
      coordinador,
      telefono,
      direccion,
      supervisor_id
    });

    return { res: "Sede actualizada correctamente" };
  }

  async updateGroup(groupId, groupData) {
    if (!groupId) {
      throw new Error("El ID del grupo es obligatorio");
    }

    const { grado_id, grupo } = groupData;

    await CampusRepository.updateGroup(groupId, {
      grado_id,
      grupo
    });

    return { res: "Grupo actualizado correctamente" };
  }

  async inactivateGroup(groupId) {
    if (!groupId) {
      throw new Error("El ID del grupo es obligatorio");
    }

    await CampusRepository.inactivateGroup(groupId);
    return { res: "El grupo se eliminó correctamente" };
  }

  async inactivateCampus(campusId) {
    if (!campusId) {
      throw new Error("El ID de la sede es obligatorio");
    }

    await CampusRepository.inactivateCampus(campusId);
    return { res: "La sede se eliminó correctamente" };
  }
}

module.exports = new CampusService();
