const StudentsRepository = require("./repositories/students.repository");

class StudentsService {
  async saveStudent(studentData) {
    const { identificacion, nombre, telefono, correo } = studentData;
    
    if (!identificacion || !nombre) {
      throw new Error("La identificación y el nombre son obligatorios");
    }

    await StudentsRepository.createStudent({
      identificacion,
      nombre,
      telefono,
      correo
    });

    return { respuesta: "El maestro en formación se registró correctamente" };
  }

  async saveEnroll(enrollData) {
    const { estudiante_id, grupo_id, periodo_id } = enrollData;
    
    if (!estudiante_id || !grupo_id || !periodo_id) {
      throw new Error("Todos los campos son obligatorios para la matrícula");
    }

    await StudentsRepository.createEnroll({
      estudiante_id,
      grupo_id,
      periodo_id
    });

    return { respuesta: "La matrícula se registró correctamente" };
  }

  async saveEnrollGroup(enrollGroupData) {
    const { grupo_anterior, grupo_actual, periodo_id } = enrollGroupData;
    
    if (!grupo_anterior || !grupo_actual || !periodo_id) {
      throw new Error("Todos los campos son obligatorios para la matrícula grupal");
    }

    await StudentsRepository.createEnrollGroup({
      grupo_anterior,
      grupo_actual,
      periodo_id
    });

    return { respuesta: "La matrícula se registró correctamente" };
  }

  async getStudent() {
    const students = await StudentsRepository.findAllStudents();
    
    if (students.length === 0) {
      return { res: "No existen estudiantes registrados" };
    }

    return { desserts: students };
  }

  async getStudentEnrroll() {
    const enrollments = await StudentsRepository.findAllEnrollments();
    
    if (enrollments.length === 0) {
      return { res: "No existen matrículas registradas" };
    }

    return { desserts: enrollments };
  }

  async getStudentsByPracticeActive() {
    const students = await StudentsRepository.findStudentsByPracticeActive();
    
    if (students.length === 0) {
      return { res: "No existen matrículas registradas" };
    }

    return { desserts: students };
  }

  async getGroups() {
    const groups = await StudentsRepository.findAllGroups();
    
    if (groups.length === 0) {
      return { res: "No existen grupos registrados" };
    }

    return { desserts: groups };
  }

  async updateStudent(studentId, studentData) {
    if (!studentId) {
      throw new Error("El ID del estudiante es obligatorio");
    }

    const { identificacion, nombre, telefono, correo, estado } = studentData;

    await StudentsRepository.updateStudent(studentId, {
      identificacion,
      nombre,
      telefono,
      correo,
      estado
    });

    return { res: "Estudiante actualizado correctamente" };
  }

  async updateEnroll(enrollId, enrollData) {
    if (!enrollId) {
      throw new Error("El ID de la matrícula es obligatorio");
    }

    const { grupo_id } = enrollData;

    await StudentsRepository.updateEnroll(enrollId, { grupo_id });
    return { res: "Grupo actualizado correctamente" };
  }

  async changeStateStudent(studentId, state) {
    if (!studentId) {
      throw new Error("El ID del estudiante es obligatorio");
    }

    const stateValue = state === "RETIRADO" ? 1 : 0;
    await StudentsRepository.changeStateStudent(studentId, stateValue);
    
    return { res: "El estudiante se eliminó correctamente" };
  }

  async deleteEnroll(enrollId) {
    if (!enrollId) {
      throw new Error("El ID de la matrícula es obligatorio");
    }

    await StudentsRepository.deleteEnroll(enrollId);
    return { res: "Matrícula eliminada correctamente" };
  }
}

module.exports = new StudentsService();
