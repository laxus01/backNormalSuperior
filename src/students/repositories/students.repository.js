const db = require("../../database");

class StudentsRepository {
  async createStudent(studentData) {
    const { identificacion, nombre, telefono, correo } = studentData;
    
    const query = "INSERT INTO estudiantes (identificacion, nombre, telefono, correo) VALUES (?, ?, ?, ?)";
    const values = [identificacion, nombre, telefono, correo];
    
    return await db.query(query, values);
  }

  async createEnroll(enrollData) {
    const { estudiante_id, grupo_id, periodo_id } = enrollData;
    
    const query = "INSERT INTO matriculas_periodo (estudiante_id, grupo_id, periodo_id) VALUES (?, ?, ?)";
    const values = [estudiante_id, grupo_id, periodo_id];
    
    return await db.query(query, values);
  }

  async createEnrollGroup(enrollGroupData) {
    const { grupo_anterior, grupo_actual, periodo_id } = enrollGroupData;
    
    const query = `
      INSERT INTO matriculas_periodo (estudiante_id, grupo_id, periodo_id) 
      SELECT estudiante_id, ${grupo_actual}, ${periodo_id} 
      FROM matriculas_periodo 
      WHERE grupo_id = ? AND periodo_id = (? - 1)
    `;
    
    return await db.query(query, [grupo_anterior, periodo_id]);
  }

  async findAllStudents() {
    const query = `
      SELECT a.id, a.nombre, a.identificacion, a.telefono, a.correo, b.estado 
      FROM estudiantes a, estado_estudiantes b 
      WHERE a.estado = b.id 
      ORDER BY b.estado ASC, a.nombre ASC
    `;
    
    return await db.query(query);
  }

  async findAllEnrollments() {
    const query = `
      SELECT m.id, e.identificacion, e.nombre, CONCAT(s.semestre,' ',g.grupo) AS grupo 
      FROM semestres s, grupos g, estudiantes e, matriculas_periodo m, periodos p 
      WHERE m.grupo_id = g.id 
        AND g.semestre_id = s.id 
        AND e.id = m.estudiante_id 
        AND m.periodo_id = p.id 
        AND p.estado = '1' 
      ORDER BY s.id ASC, g.grupo ASC, e.nombre ASC
    `;
    
    return await db.query(query);
  }

  async findStudentsByPracticeActive() {
    const query = `
      SELECT sa.id, e.nombre, i.institucion, CONCAT(sm.semestre,' ',g.grupo) AS grupo 
      FROM estudiantes e, solicitudes_asignadas sa, solicitudes s, sedes se, instituciones i, 
           grupos g, semestres sm, matriculas_periodo mp 
      WHERE e.id = sa.estudiante_id 
        AND sa.estado = '1' 
        AND sa.solicitud_id = s.id 
        AND s.sede_id = se.id 
        AND se.institucion_id = i.id 
        AND sa.semestre_id = sm.id 
        AND e.id = mp.estudiante_id 
        AND mp.grupo_id = g.id
    `;
    
    return await db.query(query);
  }

  async findAllGroups() {
    const query = `
      SELECT CONCAT(s.semestre,' ',g.grupo) AS grupo, g.id 
      FROM semestres s, grupos g 
      WHERE g.semestre_id = s.id 
      ORDER BY s.id ASC, g.grupo ASC
    `;
    
    return await db.query(query);
  }

  async updateStudent(studentId, studentData) {
    const { identificacion, nombre, telefono, correo, estado } = studentData;
    
    const query = `
      UPDATE estudiantes 
      SET identificacion = ?, nombre = ?, telefono = ?, correo = ?, estado = ? 
      WHERE id = ?
    `;
    const values = [identificacion, nombre, telefono, correo, estado, studentId];
    
    return await db.query(query, values);
  }

  async updateEnroll(enrollId, enrollData) {
    const { grupo_id } = enrollData;
    
    const query = "UPDATE matriculas_periodo SET grupo_id = ? WHERE id = ?";
    return await db.query(query, [grupo_id, enrollId]);
  }

  async changeStateStudent(studentId, state) {
    const query = "UPDATE estudiantes SET estado = ? WHERE id = ?";
    return await db.query(query, [state, studentId]);
  }

  async deleteEnroll(enrollId) {
    const query = "DELETE FROM matriculas_periodo WHERE id = ?";
    return await db.query(query, [enrollId]);
  }

  async findById(studentId) {
    const query = "SELECT * FROM estudiantes WHERE id = ?";
    const result = await db.query(query, [studentId]);
    return result[0];
  }
}

module.exports = new StudentsRepository();
