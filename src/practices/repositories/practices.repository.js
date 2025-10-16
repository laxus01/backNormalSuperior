const db = require("../../database");

class PracticesRepository {
  async createPractice(practiceData) {
    const { sede_id, jornada_id, detallegrupoc_id, detalle, docente_id } = practiceData;
    
    const query = "INSERT INTO solicitudes (sede_id, jornada_id, detallegrupoc_id, detalle, docente_id) VALUES (?, ?, ?, ?, ?)";
    const values = [sede_id, jornada_id, detallegrupoc_id, detalle, docente_id];
    
    return await db.query(query, values);
  }

  async createAssign(assignData) {
    const { solicitud_id, estudiante_id, tipopractica_id, semestre_id, periodo_id } = assignData;
    
    const query = "INSERT INTO solicitudes_asignadas (solicitud_id, estudiante_id, tipopractica_id, semestre_id, periodo_id) VALUES (?, ?, ?, ?, ?)";
    const values = [solicitud_id, estudiante_id, tipopractica_id, semestre_id, periodo_id];
    
    return await db.query(query, values);
  }

  async findExistingRecord(solicitudId, juicioId, periodoId) {
    const query = "SELECT * FROM notas_practicas WHERE solicitud_id = ? AND juicio_id = ? AND periodo_id = ?";
    return await db.query(query, [solicitudId, juicioId, periodoId]);
  }

  async updateRecord(solicitudId, juicioId, periodoId, nota) {
    const query = "UPDATE notas_practicas SET nota = ? WHERE solicitud_id = ? AND juicio_id = ? AND periodo_id = ?";
    return await db.query(query, [nota, solicitudId, juicioId, periodoId]);
  }

  async createRecord(recordData) {
    const { solicitud_id, periodo_id, juicio_id, nota } = recordData;
    
    const query = "INSERT INTO notas_practicas (solicitud_id, periodo_id, juicio_id, nota) VALUES (?, ?, ?, ?)";
    const values = [solicitud_id, periodo_id, juicio_id, nota];
    
    return await db.query(query, values);
  }

  async findAllPractices() {
    const query = `
      SELECT sa.id, i.id AS institucion_id, i.institucion, sd.sede, j.jornada, g.grado, d.grupo, 
             sa.estudiante_id, dc.nombre AS profesor, e.nombre AS estudiante, sp.id AS supervisor_id, 
             sp.supervisor, tp.tipo, CONCAT(sm.semestre,' ',gr.grupo) AS grupoxsemestre, gr.id AS grupo_id 
      FROM solicitudes s, solicitudes_asignadas sa, estudiantes e, sedes sd, docentes dc, instituciones i, 
           jornadas j, detalle_grupoc d, grados g, grupos gr, semestres sm, tipopractica tp, supervisores sp, 
           matriculas_periodo m 
      WHERE s.id = sa.solicitud_id 
        AND sa.estudiante_id = e.id 
        AND sa.estado = '1' 
        AND sa.tipopractica_id = tp.id 
        AND s.detallegrupoc_id = d.id 
        AND d.grado_id = g.id 
        AND s.jornada_id = j.id 
        AND s.sede_id = sd.id 
        AND sd.institucion_id = i.id 
        AND s.docente_id = dc.id 
        AND sd.supervisor_id = sp.id 
        AND e.id = m.estudiante_id 
        AND m.periodo_id = '8' 
        AND m.grupo_id = gr.id 
        AND gr.semestre_id = sm.id 
        AND sa.periodo_id = '8'
    `;
    
    return await db.query(query);
  }

  async findPracticesByGroup(groupId) {
    const query = `
      SELECT sa.id, i.id AS institucion_id, i.institucion, sd.sede, j.jornada, g.grado, d.grupo, 
             sa.estudiante_id, dc.nombre AS profesor, e.nombre AS estudiante, sp.id AS supervisor_id, 
             sp.supervisor, tp.tipo, CONCAT(sm.semestre,' ',gr.grupo) AS grupoxsemestre, gr.id AS grupo_id 
      FROM solicitudes s, solicitudes_asignadas sa, estudiantes e, sedes sd, docentes dc, instituciones i, 
           jornadas j, detalle_grupoc d, grados g, grupos gr, semestres sm, tipopractica tp, supervisores sp, 
           matriculas_periodo m 
      WHERE s.id = sa.solicitud_id 
        AND sa.estudiante_id = e.id 
        AND sa.estado = '1' 
        AND sa.tipopractica_id = tp.id 
        AND s.detallegrupoc_id = d.id 
        AND d.grado_id = g.id 
        AND s.jornada_id = j.id 
        AND s.sede_id = sd.id 
        AND sd.institucion_id = i.id 
        AND s.docente_id = dc.id 
        AND sd.supervisor_id = sp.id 
        AND e.id = m.estudiante_id 
        AND m.periodo_id = '8' 
        AND m.grupo_id = gr.id 
        AND gr.semestre_id = sm.id 
        AND sa.periodo_id = '8' 
        AND gr.id = ?
    `;
    
    return await db.query(query, [groupId]);
  }

  async findPracticesByInstitution(institutionId) {
    const query = `
      SELECT sa.id, i.id AS institucion_id, i.institucion, sd.sede, j.jornada, g.grado, d.grupo, 
             sa.estudiante_id, dc.nombre AS profesor, e.nombre AS estudiante, sp.id AS supervisor_id, 
             sp.supervisor, tp.tipo, CONCAT(sm.semestre,' ',gr.grupo) AS grupoxsemestre, gr.id AS grupo_id 
      FROM solicitudes s, solicitudes_asignadas sa, estudiantes e, sedes sd, docentes dc, instituciones i, 
           jornadas j, detalle_grupoc d, grados g, grupos gr, semestres sm, tipopractica tp, supervisores sp, 
           matriculas_periodo m 
      WHERE s.id = sa.solicitud_id 
        AND sa.estudiante_id = e.id 
        AND sa.estado = '1' 
        AND sa.tipopractica_id = tp.id 
        AND s.detallegrupoc_id = d.id 
        AND d.grado_id = g.id 
        AND s.jornada_id = j.id 
        AND s.sede_id = sd.id 
        AND sd.institucion_id = i.id 
        AND s.docente_id = dc.id 
        AND sd.supervisor_id = sp.id 
        AND e.id = m.estudiante_id 
        AND m.periodo_id = '8' 
        AND m.grupo_id = gr.id 
        AND gr.semestre_id = sm.id 
        AND sa.periodo_id = '8' 
        AND i.id = ?
    `;
    
    return await db.query(query, [institutionId]);
  }

  async findPracticesBySupervisor(supervisorId) {
    const query = `
      SELECT i.institucion, sd.sede, j.jornada, g.grado, d.grupo, dc.nombre AS profesor, 
             e.nombre AS estudiante, sp.supervisor, tp.tipo, CONCAT(sm.semestre,' ',gr.grupo) AS grupoxsemestre, 
             gr.id AS grupo_id, e.telefono AS telefonomf, dc.telefono AS telefonomt 
      FROM solicitudes s, solicitudes_asignadas sa, estudiantes e, sedes sd, docentes dc, instituciones i, 
           jornadas j, detalle_grupoc d, grados g, grupos gr, semestres sm, tipopractica tp, supervisores sp, 
           matriculas_periodo m 
      WHERE s.id = sa.solicitud_id 
        AND sa.estudiante_id = e.id 
        AND sa.estado = '1' 
        AND sa.tipopractica_id = tp.id 
        AND s.detallegrupoc_id = d.id 
        AND d.grado_id = g.id 
        AND s.jornada_id = j.id 
        AND s.sede_id = sd.id 
        AND sd.institucion_id = i.id 
        AND s.docente_id = dc.id 
        AND sd.supervisor_id = sp.id 
        AND e.id = m.estudiante_id 
        AND m.periodo_id = '8' 
        AND m.grupo_id = gr.id 
        AND gr.semestre_id = sm.id 
        AND sa.periodo_id = '8' 
        AND sp.id = ?
    `;
    
    return await db.query(query, [supervisorId]);
  }

  async findPracticesAssign() {
    const query = `
      SELECT i.institucion, s.id, se.sede, j.jornada, g.grado, dg.grupo, d.nombre, d.telefono 
      FROM solicitudes s, docentes d, grados g, detalle_grupoc dg, jornadas j, sedes se, instituciones i 
      WHERE se.institucion_id = i.id 
        AND s.sede_id = se.id 
        AND s.jornada_id = j.id 
        AND s.detallegrupoc_id = dg.id 
        AND dg.grado_id = g.id 
        AND s.docente_id = d.id 
        AND i.id = se.institucion_id  
        AND s.id NOT IN(SELECT solicitud_id FROM solicitudes_asignadas WHERE estado = '1') 
      ORDER BY i.institucion ASC, se.sede
    `;
    
    return await db.query(query);
  }

  async findStudentsAvailable() {
    const query = `
      SELECT e.id, e.nombre, CONCAT(s.semestre,' ',g.grupo) AS grupo, s.id AS semestre_id, 
             e.telefono, m.periodo_id 
      FROM estudiantes e, matriculas_periodo m, semestres s, grupos g, periodos p 
      WHERE m.periodo_id = p.id 
        AND e.id = m.estudiante_id 
        AND m.grupo_id = g.id 
        AND g.semestre_id = s.id 
        AND p.id = '8' 
        AND e.id NOT IN (SELECT sa.estudiante_id FROM solicitudes s, solicitudes_asignadas sa 
                         WHERE s.id = sa.solicitud_id AND sa.estado = '1') 
      ORDER BY e.nombre ASC
    `;
    
    return await db.query(query);
  }

  async findConsolidateRecords() {
    const query = `
      SELECT e.id, e.nombre, CONCAT(sm.semestre,' ',g.grupo) AS grupo, 
             (SELECT n.nota FROM notas_practicas n, solicitudes_asignadas s 
              WHERE s.id = n.solicitud_id AND n.juicio_id = '1' AND s.estudiante_id = e.id 
                AND n.periodo_id = '8' ORDER BY n.id DESC LIMIT 1) AS nota_ppi, 
             (SELECT n.nota FROM notas_practicas n, solicitudes_asignadas s 
              WHERE s.id = n.solicitud_id AND n.juicio_id = '2' AND s.estudiante_id = e.id 
                AND n.periodo_id = '8' ORDER BY n.id DESC LIMIT 1) AS nota_investigacion, 
             (SELECT n.nota FROM notas_practicas n, solicitudes_asignadas s 
              WHERE s.id = n.solicitud_id AND n.juicio_id = '3' AND s.estudiante_id = e.id 
                AND n.periodo_id = '8' ORDER BY n.id DESC LIMIT 1) AS nota_maestrotitular, 
             (SELECT n.nota FROM notas_practicas n, solicitudes_asignadas s 
              WHERE s.id = n.solicitud_id AND n.juicio_id = '4' AND s.estudiante_id = e.id 
                AND n.periodo_id = '8' ORDER BY n.id DESC LIMIT 1) AS nota_supervisor 
      FROM estudiantes e, matriculas_periodo m, grupos g, semestres sm 
      WHERE m.grupo_id = g.id 
        AND g.semestre_id = sm.id 
        AND e.id = m.estudiante_id 
        AND m.periodo_id = '8' 
        AND e.estado = '1' 
      ORDER BY sm.semestre, g.grupo, e.nombre
    `;
    
    return await db.query(query);
  }

  async findConsolidateRecordsByGroup(groupId) {
    const query = `
      SELECT e.id, e.nombre, CONCAT(sm.semestre,' ',g.grupo) AS grupo, 
             (SELECT n.nota FROM notas_practicas n, solicitudes_asignadas s 
              WHERE s.id = n.solicitud_id AND n.juicio_id = '1' AND s.estudiante_id = e.id 
                AND n.periodo_id = '8' ORDER BY n.id DESC LIMIT 1) AS nota_ppi, 
             (SELECT n.nota FROM notas_practicas n, solicitudes_asignadas s 
              WHERE s.id = n.solicitud_id AND n.juicio_id = '2' AND s.estudiante_id = e.id 
                AND n.periodo_id = '8' ORDER BY n.id DESC LIMIT 1) AS nota_investigacion, 
             (SELECT n.nota FROM notas_practicas n, solicitudes_asignadas s 
              WHERE s.id = n.solicitud_id AND n.juicio_id = '3' AND s.estudiante_id = e.id 
                AND n.periodo_id = '8' ORDER BY n.id DESC LIMIT 1) AS nota_maestrotitular, 
             (SELECT n.nota FROM notas_practicas n, solicitudes_asignadas s 
              WHERE s.id = n.solicitud_id AND n.juicio_id = '4' AND s.estudiante_id = e.id 
                AND n.periodo_id = '8' ORDER BY n.id DESC LIMIT 1) AS nota_supervisor 
      FROM estudiantes e, matriculas_periodo m, grupos g, semestres sm 
      WHERE m.grupo_id = g.id 
        AND g.semestre_id = sm.id 
        AND e.id = m.estudiante_id 
        AND m.grupo_id = ? 
        AND m.periodo_id = '8' 
        AND e.estado = '1' 
      ORDER BY sm.semestre, g.grupo, e.nombre
    `;
    
    return await db.query(query, [groupId]);
  }

  async findAllJudgments() {
    const query = "SELECT * FROM juicios ORDER BY id ASC";
    return await db.query(query);
  }

  async findAllTypePractices() {
    const query = "SELECT * FROM tipopractica ORDER BY id ASC";
    return await db.query(query);
  }

  async updatePractice(practiceId, practiceData) {
    const { nombre, telefono, correo } = practiceData;
    
    const query = "UPDATE docentes SET nombre = ?, telefono = ?, correo = ? WHERE id = ?";
    const values = [nombre, telefono, correo, practiceId];
    
    return await db.query(query, values);
  }

  async inactivatePractice(practiceId) {
    const query = "UPDATE solicitudes_asignadas SET estado = ? WHERE id = ?";
    return await db.query(query, [0, practiceId]);
  }

  async deleteAssign(assignId) {
    const query = "DELETE FROM solicitudes WHERE id = ?";
    return await db.query(query, [assignId]);
  }
}

module.exports = new PracticesRepository();
