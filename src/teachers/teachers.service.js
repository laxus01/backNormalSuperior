const TeachersRepository = require("./repositories/teachers.repository");

class TeachersService {
  async saveTeacher(teacherData) {
    const { nombre, telefono, correo, sede_id } = teacherData;
    
    if (!nombre || !sede_id) {
      throw new Error("El nombre y la sede son obligatorios");
    }

    await TeachersRepository.createTeacher({
      nombre,
      telefono,
      correo,
      sede_id
    });

    return { respuesta: "El maestro titular se registró correctamente" };
  }

  async getTeachers() {
    const teachers = await TeachersRepository.findAllTeachers();
    
    if (teachers.length === 0) {
      return { res: "No existen maestros titulares registrados" };
    }

    return { desserts: teachers };
  }

  async updateTeacher(teacherId, teacherData) {
    if (!teacherId) {
      throw new Error("El ID del maestro titular es obligatorio");
    }

    const { nombre, telefono, correo } = teacherData;

    await TeachersRepository.updateTeacher(teacherId, {
      nombre,
      telefono,
      correo
    });

    return { res: "El maestro titular actualizado correctamente" };
  }

  async inactivateTeacher(teacherId) {
    if (!teacherId) {
      throw new Error("El ID del maestro titular es obligatorio");
    }

    await TeachersRepository.inactivateTeacher(teacherId);
    return { res: "El maestro titular se eliminó correctamente" };
  }
}

module.exports = new TeachersService();
