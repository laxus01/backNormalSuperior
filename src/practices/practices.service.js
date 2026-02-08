const PracticesRepository = require("./repositories/practices.repository");

class PracticesService {
  async savePractice(practiceData) {
    const { sede_id, jornada_id, detallegrupoc_id, detalle, docente_id } = practiceData;
    
    if (!sede_id || !jornada_id || !detallegrupoc_id || !docente_id) {
      throw new Error("Todos los campos obligatorios deben ser proporcionados");
    }

    await PracticesRepository.createPractice({
      sede_id,
      jornada_id,
      detallegrupoc_id,
      detalle,
      docente_id
    });

    return { respuesta: "La práctica se registró correctamente" };
  }

  async saveAssign(assignData) {
    const { solicitud_id, estudiante_id, tipopractica_id, semestre_id, periodo_id } = assignData;
    
    if (!solicitud_id || !estudiante_id || !tipopractica_id || !semestre_id || !periodo_id) {
      throw new Error("Todos los campos obligatorios deben ser proporcionados");
    }

    await PracticesRepository.createAssign({
      solicitud_id,
      estudiante_id,
      tipopractica_id,
      semestre_id,
      periodo_id
    });

    return { respuesta: "La práctica se asignó correctamente" };
  }

  async saveRecord(recordData) {
    const { solicitud_id, periodo_id, juicio_id, nota } = recordData;
    
    if (!solicitud_id || !periodo_id || !juicio_id || nota === undefined) {
      throw new Error("Todos los campos obligatorios deben ser proporcionados");
    }

    const existingRecord = await PracticesRepository.findExistingRecord(
      solicitud_id, 
      juicio_id, 
      periodo_id
    );

    if (existingRecord && existingRecord.length > 0) {
      await PracticesRepository.updateRecord(solicitud_id, juicio_id, periodo_id, nota);
      return { res: "La nota ha sido actualizada correctamente" };
    } else {
      await PracticesRepository.createRecord({ solicitud_id, periodo_id, juicio_id, nota });
      return { respuesta: "La calificación se registró correctamente" };
    }
  }

  async getPractices() {
    const practices = await PracticesRepository.findAllPractices();
    
    if (practices.length === 0) {
      return { res: "No existen prácticas registradas" };
    }

    return { desserts: practices };
  }

  async getPracticesByGroup(groupId) {
    if (!groupId) {
      throw new Error("El ID del grupo es obligatorio");
    }

    const practices = await PracticesRepository.findPracticesByGroup(groupId);
    
    if (practices.length === 0) {
      return { res: "No existen prácticas registradas" };
    }

    return { desserts: practices };
  }

  async getPracticesByInstitution(institutionId) {
    if (!institutionId) {
      throw new Error("El ID de la institución es obligatorio");
    }

    const practices = await PracticesRepository.findPracticesByInstitution(institutionId);
    
    if (practices.length === 0) {
      return { res: "No existen prácticas registradas" };
    }

    return { desserts: practices };
  }

  async getPracticesBySupervisor(supervisorId) {
    if (!supervisorId) {
      throw new Error("El ID del supervisor es obligatorio");
    }

    const practices = await PracticesRepository.findPracticesBySupervisor(supervisorId);
    
    if (practices.length === 0) {
      return { res: "No existen prácticas registradas" };
    }

    return { desserts: practices };
  }

  async getPracticesAssign() {
    const practices = await PracticesRepository.findPracticesAssign();
    
    if (practices.length === 0) {
      return { res: "No existen prácticas asignadas" };
    }

    return { desserts: practices };
  }

  async getListStudentsAvailable() {
    const students = await PracticesRepository.findStudentsAvailable();
    
    if (students.length === 0) {
      return { res: "No existen maestros en formación registrados" };
    }

    return { desserts: students };
  }

  async getConsolidateRecords() {
    const records = await PracticesRepository.findConsolidateRecords();
    
    if (records.length === 0) {
      return { res: "No existen notas registradas" };
    }

    return { desserts: records };
  }

  async getConsolidateRecordsByGroup(groupId) {
    if (!groupId) {
      throw new Error("El ID del grupo es obligatorio");
    }

    const records = await PracticesRepository.findConsolidateRecordsByGroup(groupId);
    
    if (records.length === 0) {
      return { res: "No existen notas registradas" };
    }

    return { desserts: records };
  }

  async getJudgments() {
    const judgments = await PracticesRepository.findAllJudgments();
    
    if (judgments.length === 0) {
      return { res: "No existen juicios registrados" };
    }

    return { desserts: judgments };
  }

  async getTypePractice() {
    const types = await PracticesRepository.findAllTypePractices();
    
    if (types.length === 0) {
      return { res: "No existen tipos de prácticas registrados" };
    }

    return { desserts: types };
  }

  async updatePractice(practiceId, practiceData) {
    if (!practiceId) {
      throw new Error("El ID de la práctica es obligatorio");
    }

    const { nombre, telefono, correo } = practiceData;

    await PracticesRepository.updatePractice(practiceId, {
      nombre,
      telefono,
      correo
    });

    return { res: "El maestro titular actualizado correctamente" };
  }

  async inactivatePractice(practiceId) {
    if (!practiceId) {
      throw new Error("El ID de la práctica es obligatorio");
    }

    await PracticesRepository.inactivatePractice(practiceId);
    return { res: "Asignación eliminada correctamente" };
  }

  async updateSolicitud(solicitudId, solicitudData) {
    if (!solicitudId) {
      throw new Error("El ID de la solicitud es obligatorio");
    }

    const { sede_id, jornada_id, detallegrupoc_id, detalle, docente_id } = solicitudData;

    if (!sede_id || !jornada_id || !detallegrupoc_id || !docente_id) {
      throw new Error("Todos los campos obligatorios deben ser proporcionados");
    }

    await PracticesRepository.updateSolicitud(solicitudId, {
      sede_id,
      jornada_id,
      detallegrupoc_id,
      detalle,
      docente_id
    });

    return { res: "La solicitud se actualizó correctamente" };
  }

  async updateAssign(assignId, assignData) {
    if (!assignId) {
      throw new Error("El ID de la asignación es obligatorio");
    }

    const { estudiante_id } = assignData;

    if (!estudiante_id) {
      throw new Error("El maestro en formación es obligatorio");
    }

    await PracticesRepository.updateAssign(assignId, estudiante_id);
    return { res: "La asignación se actualizó correctamente" };
  }

  async getAllStudentsByPeriod() {
    const students = await PracticesRepository.findAllStudentsByPeriod();
    
    if (students.length === 0) {
      return { res: "No existen maestros en formación registrados" };
    }

    return { desserts: students };
  }

  async deleteAssign(assignId) {
    if (!assignId) {
      throw new Error("El ID de la asignación es obligatorio");
    }

    await PracticesRepository.deleteAssign(assignId);
    return { res: "Solicitud eliminada correctamente" };
  }
}

module.exports = new PracticesService();
