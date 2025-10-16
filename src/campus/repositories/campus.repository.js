const db = require("../../database");

class CampusRepository {
  async createCampus(campusData) {
    const { sede, coordinador, telefono, direccion, institucion_id, supervisor_id } = campusData;
    
    const query = "INSERT INTO sedes (sede, coordinador, telefono, direccion, institucion_id, supervisor_id) VALUES (?, ?, ?, ?, ?, ?)";
    const values = [sede, coordinador, telefono, direccion, institucion_id, supervisor_id];
    
    return await db.query(query, values);
  }

  async createSupervisor(supervisorData) {
    const { supervisor, telefono } = supervisorData;
    
    const query = "INSERT INTO supervisores (supervisor, telefono) VALUES (?, ?)";
    const values = [supervisor, telefono];
    
    return await db.query(query, values);
  }

  async createDegree(degreeData) {
    const { grado } = degreeData;
    
    const query = "INSERT INTO grados (grado) VALUES (?)";
    const values = [grado];
    
    return await db.query(query, values);
  }

  async createGroup(groupData) {
    const { sede_id, grado_id, grupo } = groupData;
    
    const query = "INSERT INTO detalle_grupoc (sede_id, grado_id, grupo) VALUES (?, ?, ?)";
    const values = [sede_id, grado_id, grupo];
    
    return await db.query(query, values);
  }

  async findAllCampuses() {
    const query = `
      SELECT s.id, s.sede, s.coordinador, s.telefono, s.direccion, 
             i.institucion, sp.supervisor, sp.id AS supervisor_id 
      FROM sedes s, instituciones i, supervisores sp 
      WHERE i.id = s.institucion_id 
        AND s.supervisor_id = sp.id 
        AND s.estado = '1' 
      ORDER BY i.institucion, s.sede ASC
    `;
    
    return await db.query(query);
  }

  async findAllSupervisors() {
    const query = "SELECT * FROM supervisores ORDER BY supervisor ASC";
    return await db.query(query);
  }

  async findAllDegrees() {
    const query = "SELECT * FROM grados ORDER BY grado ASC";
    return await db.query(query);
  }

  async findAllGroups() {
    const query = `
      SELECT d.id, i.institucion, s.sede, g.id AS grado_id, g.grado, d.grupo 
      FROM instituciones i, sedes s, detalle_grupoc d, grados g 
      WHERE i.id = s.institucion_id 
        AND s.id = d.sede_id 
        AND d.grado_id = g.id 
        AND d.estado = '1' 
      ORDER BY g.id ASC
    `;
    
    return await db.query(query);
  }

  async findTeachersByCampus(campusId) {
    const query = "SELECT id, nombre FROM docentes WHERE sede_id = ? ORDER BY nombre ASC";
    return await db.query(query, [campusId]);
  }

  async findDegreesByCampus(campusId) {
    const query = `
      SELECT g.id, g.grado 
      FROM grados g, detalle_grupoc d 
      WHERE g.id = d.grado_id 
        AND d.sede_id = ? 
      GROUP BY g.id
    `;
    
    return await db.query(query, [campusId]);
  }

  async findGroupsByDegree(degreeId, sedeId) {
    const query = `
      SELECT d.id, d.grupo 
      FROM detalle_grupoc d 
      WHERE d.grado_id = ? 
        AND d.sede_id = ?
    `;
    
    return await db.query(query, [degreeId, sedeId]);
  }

  async findAllJornadas() {
    const query = "SELECT * FROM jornadas ORDER BY id ASC";
    return await db.query(query);
  }

  async findCampusByInstitution() {
    const query = `
      SELECT s.id, CONCAT(i.institucion,' - ',s.sede) AS sede 
      FROM sedes s, instituciones i 
      WHERE i.id = s.institucion_id 
        AND s.estado = '1' 
        AND i.estado = '1' 
      ORDER BY i.institucion, s.sede ASC
    `;
    
    return await db.query(query);
  }

  async updateCampus(campusId, campusData) {
    const { sede, coordinador, telefono, direccion, supervisor_id } = campusData;
    
    const query = `
      UPDATE sedes 
      SET sede = ?, coordinador = ?, telefono = ?, direccion = ?, supervisor_id = ? 
      WHERE id = ?
    `;
    const values = [sede, coordinador, telefono, direccion, supervisor_id, campusId];
    
    return await db.query(query, values);
  }

  async updateGroup(groupId, groupData) {
    const { grado_id, grupo } = groupData;
    
    const query = "UPDATE detalle_grupoc SET grado_id = ?, grupo = ? WHERE id = ?";
    const values = [grado_id, grupo, groupId];
    
    return await db.query(query, values);
  }

  async inactivateGroup(groupId) {
    const query = "UPDATE detalle_grupoc SET estado = ? WHERE id = ?";
    return await db.query(query, [0, groupId]);
  }

  async inactivateCampus(campusId) {
    const query = "UPDATE sedes SET estado = ? WHERE id = ?";
    return await db.query(query, [0, campusId]);
  }
}

module.exports = new CampusRepository();
