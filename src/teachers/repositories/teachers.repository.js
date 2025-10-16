const db = require("../../database");

class TeachersRepository {
  async createTeacher(teacherData) {
    const { nombre, telefono, correo, sede_id } = teacherData;
    
    const query = "INSERT INTO docentes (nombre, telefono, correo, sede_id) VALUES (?, ?, ?, ?)";
    const values = [nombre, telefono, correo, sede_id];
    
    return await db.query(query, values);
  }

  async findAllTeachers() {
    const query = `
      SELECT d.id, d.nombre, d.telefono, d.correo, i.institucion, s.sede 
      FROM docentes d, instituciones i, sedes s 
      WHERE d.sede_id = s.id 
        AND s.institucion_id = i.id 
        AND d.estado = 1 
      ORDER BY i.institucion ASC, d.nombre ASC
    `;
    
    return await db.query(query);
  }

  async updateTeacher(teacherId, teacherData) {
    const { nombre, telefono, correo } = teacherData;
    
    const query = "UPDATE docentes SET nombre = ?, telefono = ?, correo = ? WHERE id = ?";
    const values = [nombre, telefono, correo, teacherId];
    
    return await db.query(query, values);
  }

  async inactivateTeacher(teacherId) {
    const query = "UPDATE docentes SET estado = ? WHERE id = ?";
    return await db.query(query, [0, teacherId]);
  }

  async findById(teacherId) {
    const query = "SELECT * FROM docentes WHERE id = ? AND estado = 1";
    const result = await db.query(query, [teacherId]);
    return result[0];
  }

  async findByCampus(campusId) {
    const query = "SELECT * FROM docentes WHERE sede_id = ? AND estado = 1 ORDER BY nombre ASC";
    return await db.query(query, [campusId]);
  }
}

module.exports = new TeachersRepository();
