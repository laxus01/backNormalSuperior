const db = require("../database");

const savePractice = async (req, res) => {
  const { sede_id, jornada_id, detallegrupoc_id, detalle, docente_id } =
    req.body;

  db.query(
    "INSERT INTO solicitudes (sede_id, jornada_id, detallegrupoc_id, detalle, docente_id) VALUES (?, ?, ?, ?, ?)",
    [sede_id, jornada_id, detallegrupoc_id, detalle, docente_id],
    (err, practicesStored) => {
      if (err) console.log(err);
      if (err)
        return res
          .status(500)
          .send({ respuesta: "Error al guardar la practica." });

      if (!practicesStored)
        return res
          .status(404)
          .send({ respuesta: "No se ha podido guardar la practica" });

      return res.status(201).send({
        respuesta: "La practica se registro correctamente",
      });
    }
  );
};

const saveAssign = async (req, res) => {
  const {
    solicitud_id,
    estudiante_id,
    tipopractica_id,
    semestre_id,
    periodo_id,
  } = req.body;

  db.query(
    "INSERT INTO solicitudes_asignadas (solicitud_id, estudiante_id, tipopractica_id, semestre_id, periodo_id) VALUES (?, ?, ?, ?, ?)",
    [solicitud_id, estudiante_id, tipopractica_id, semestre_id, periodo_id],
    (err, assignStored) => {
      if (err) console.log(err);
      if (err)
        return res
          .status(500)
          .send({ respuesta: "Error al asignar la practica." });

      if (!assignStored)
        return res
          .status(404)
          .send({ respuesta: "No se ha podido asignar la practica" });

      return res.status(201).send({
        respuesta: "La practica se asigno correctamente",
      });
    }
  );
};

const saveRecord = async (req, res) => {
  const { solicitud_id, periodo_id, juicio_id, nota } = req.body;

  db.query(
    "SELECT * FROM notas_practicas WHERE solicitud_id = ? AND juicio_id = ? AND periodo_id = ?",
    [solicitud_id, juicio_id, periodo_id],
    (err, rows) => {
      if (err)
        return res.status(500).send({ res: "Error al consultar la nota." });

      if (rows.length > 0)
        db.query(
          "UPDATE notas_practicas SET nota = ? WHERE solicitud_id = ? AND juicio_id = ? AND periodo_id = ?",
          [nota, solicitud_id, juicio_id, periodo_id],
          (err, rows) => {
            if (err)
              return res
                .status(500)
                .send({ res: "Error al actualizar la nota." });

            return res.status(200).send({
              res: "La nota ha sido actualizada correctamente",
            });
          }
        );

      if (rows.length === 0)
        db.query(
          "INSERT INTO notas_practicas (solicitud_id, periodo_id, juicio_id, nota) VALUES (?, ?, ?, ?)",
          [solicitud_id, periodo_id, juicio_id, nota],
          (err, enrollStored) => {
            if (err) console.log(err);
            if (err)
              return res
                .status(500)
                .send({ respuesta: "Error al guardar la calificación." });

            if (!enrollStored)
              return res
                .status(404)
                .send({ respuesta: "No se ha podido guardar la calificación" });

            return res.status(201).send({
              respuesta: "La calificación se registro correctamente",
            });
          }
        );
    }
  );
};

const getPractices = async (req, res) => {
  db.query(
    "SELECT sa.id, i.id AS institucion_id, i.institucion, sd.sede, j.jornada, g.grado, d.grupo, sa.estudiante_id, dc.nombre AS profesor, e.nombre AS estudiante, sp.id AS supervisor_id, sp.supervisor, tp.tipo, CONCAT(sm.semestre,' ',gr.grupo) AS grupoxsemestre, gr.id AS grupo_id FROM solicitudes s, solicitudes_asignadas sa, estudiantes e, sedes sd, docentes dc, instituciones i, jornadas j, detalle_grupoc d, grados g, grupos gr, semestres sm, tipopractica tp, supervisores sp, matriculas_periodo m WHERE s.id = sa.solicitud_id AND sa.estudiante_id = e.id AND sa.estado = '1' AND sa.tipopractica_id = tp.id AND s.detallegrupoc_id = d.id AND d.grado_id = g.id AND s.jornada_id = j.id AND s.sede_id = sd.id AND sd.institucion_id = i.id AND s.docente_id = dc.id AND sd.supervisor_id = sp.id AND e.id = m.estudiante_id AND m.periodo_id = '4' AND m.grupo_id = gr.id AND gr.semestre_id = sm.id AND sa.periodo_id = '4' ",
    (err, rows) => {
      if (err) console.log(err);
      if (err)
        return res
          .status(500)
          .send({ res: "Error al consultar las practicas." });

      if (rows.length === 0)
        return res
          .status(200)
          .send({ res: "No existen practicas registrados" });

      return res.status(200).send({
        desserts: rows,
      });
    }
  );
};

const getPracticesByGroup = async (req, res) => {
  const id = req.params.id;

  db.query(
    "SELECT sa.id, i.id AS institucion_id, i.institucion, sd.sede, j.jornada, g.grado, d.grupo, sa.estudiante_id, dc.nombre AS profesor, e.nombre AS estudiante, sp.id AS supervisor_id, sp.supervisor, tp.tipo, CONCAT(sm.semestre,' ',gr.grupo) AS grupoxsemestre, gr.id AS grupo_id FROM solicitudes s, solicitudes_asignadas sa, estudiantes e, sedes sd, docentes dc, instituciones i, jornadas j, detalle_grupoc d, grados g, grupos gr, semestres sm, tipopractica tp, supervisores sp, matriculas_periodo m WHERE s.id = sa.solicitud_id AND sa.estudiante_id = e.id AND sa.estado = '1' AND sa.tipopractica_id = tp.id AND s.detallegrupoc_id = d.id AND d.grado_id = g.id AND s.jornada_id = j.id AND s.sede_id = sd.id AND sd.institucion_id = i.id AND s.docente_id = dc.id AND sd.supervisor_id = sp.id AND e.id = m.estudiante_id AND m.periodo_id = '4' AND m.grupo_id = gr.id AND gr.semestre_id = sm.id AND sa.periodo_id = '4' AND gr.id = ? ",
    [id],
    (err, rows) => {
      if (err) console.log(err);
      if (err)
        return res
          .status(500)
          .send({ res: "Error al consultar las practicas." });

      if (rows.length === 0)
        return res
          .status(200)
          .send({ res: "No existen practicas registrados" });

      return res.status(200).send({
        desserts: rows,
      });
    }
  );
};

const getPracticesByInstitution = async (req, res) => {
  const id = req.params.id;

  db.query(
    "SELECT sa.id, i.id AS institucion_id, i.institucion, sd.sede, j.jornada, g.grado, d.grupo, sa.estudiante_id, dc.nombre AS profesor, e.nombre AS estudiante, sp.id AS supervisor_id, sp.supervisor, tp.tipo, CONCAT(sm.semestre,' ',gr.grupo) AS grupoxsemestre, gr.id AS grupo_id FROM solicitudes s, solicitudes_asignadas sa, estudiantes e, sedes sd, docentes dc, instituciones i, jornadas j, detalle_grupoc d, grados g, grupos gr, semestres sm, tipopractica tp, supervisores sp, matriculas_periodo m WHERE s.id = sa.solicitud_id AND sa.estudiante_id = e.id AND sa.estado = '1' AND sa.tipopractica_id = tp.id AND s.detallegrupoc_id = d.id AND d.grado_id = g.id AND s.jornada_id = j.id AND s.sede_id = sd.id AND sd.institucion_id = i.id AND s.docente_id = dc.id AND sd.supervisor_id = sp.id AND e.id = m.estudiante_id AND m.periodo_id = '4' AND m.grupo_id = gr.id AND gr.semestre_id = sm.id AND sa.periodo_id = '4' AND i.id = ? ",
    [id],
    (err, rows) => {
      if (err) console.log(err);
      if (err)
        return res
          .status(500)
          .send({ res: "Error al consultar las practicas." });

      if (rows.length === 0)
        return res
          .status(200)
          .send({ res: "No existen practicas registrados" });

      return res.status(200).send({
        desserts: rows,
      });
    }
  );
};

const getPracticesBySupervisor = async (req, res) => {
  const id = req.params.id;

  db.query(
    "SELECT i.institucion, sd.sede, j.jornada, g.grado, d.grupo, dc.nombre AS profesor, e.nombre AS estudiante, sp.supervisor, tp.tipo, CONCAT(sm.semestre,' ',gr.grupo) AS grupoxsemestre, gr.id AS grupo_id, e.telefono AS telefonomf, dc.telefono AS telefonomt FROM solicitudes s, solicitudes_asignadas sa, estudiantes e, sedes sd, docentes dc, instituciones i, jornadas j, detalle_grupoc d, grados g, grupos gr, semestres sm, tipopractica tp, supervisores sp, matriculas_periodo m WHERE s.id = sa.solicitud_id AND sa.estudiante_id = e.id AND sa.estado = '1' AND sa.tipopractica_id = tp.id AND s.detallegrupoc_id = d.id AND d.grado_id = g.id AND s.jornada_id = j.id AND s.sede_id = sd.id AND sd.institucion_id = i.id AND s.docente_id = dc.id AND sd.supervisor_id = sp.id AND e.id = m.estudiante_id AND m.periodo_id = '4' AND m.grupo_id = gr.id AND gr.semestre_id = sm.id AND sa.periodo_id = '4' AND sp.id = ? ",
    [id],
    (err, rows) => {
      if (err) console.log(err);
      if (err)
        return res
          .status(500)
          .send({ res: "Error al consultar las practicas." });

      if (rows.length === 0)
        return res
          .status(200)
          .send({ res: "No existen practicas registrados" });

      return res.status(200).send({
        desserts: rows,
      });
    }
  );
};

const getPracticesAssign = async (req, res) => {
  db.query(
    "SELECT i.institucion, s.id, se.sede, j.jornada, g.grado, dg.grupo, d.nombre, d.telefono FROM solicitudes s, docentes d, grados g, detalle_grupoc dg, jornadas j, sedes se, instituciones i WHERE se.institucion_id = i.id AND s.sede_id = se.id AND s.jornada_id = j.id AND s.detallegrupoc_id = dg.id AND dg.grado_id = g.id AND s.docente_id = d.id AND i.id = se.institucion_id  AND s.id NOT IN(SELECT solicitud_id FROM solicitudes_asignadas WHERE estado = '1') ORDER BY i.institucion ASC, se.sede",
    (err, rows) => {
      if (err) console.log(err);
      if (err)
        return res
          .status(500)
          .send({ res: "Error al consultar las practicas." });

      if (rows.length === 0)
        return res.status(200).send({ res: "No existen practicas asignadas" });

      return res.status(200).send({
        desserts: rows,
      });
    }
  );
};

const getListStudentsAvailable = async (req, res) => {
  db.query(
    "SELECT e.id, e.nombre, CONCAT(s.semestre,' ',g.grupo) AS grupo, s.id AS semestre_id, e.telefono, m.periodo_id FROM estudiantes e, matriculas_periodo m, semestres s, grupos g, periodos p WHERE m.periodo_id = p.id AND e.id = m.estudiante_id AND m.grupo_id = g.id AND g.semestre_id = s.id AND p.id = '4' AND e.id NOT IN (SELECT sa.estudiante_id FROM solicitudes s, solicitudes_asignadas sa WHERE s.id = sa.solicitud_id AND sa.estado = '1') ORDER BY e.nombre ASC ",
    (err, rows) => {
      if (err) console.log(err);
      if (err)
        return res
          .status(500)
          .send({ res: "Error al consultar los maestros en formación." });

      if (rows.length === 0)
        return res
          .status(200)
          .send({ res: "No existen maestros en formación registrados" });

      return res.status(200).send({
        desserts: rows,
      });
    }
  );
};

const getConsolidateRecords = async (req, res) => {
  db.query(
    "SELECT e.id, e.nombre, CONCAT(sm.semestre,' ',g.grupo) AS grupo, (SELECT n.nota FROM notas_practicas n, solicitudes_asignadas s WHERE s.id = n.solicitud_id AND n.juicio_id = '1' AND s.estudiante_id = e.id AND n.periodo_id = '4' ORDER BY n.id DESC LIMIT 1) AS nota_ppi, (SELECT n.nota FROM notas_practicas n, solicitudes_asignadas s WHERE s.id = n.solicitud_id AND n.juicio_id = '2' AND s.estudiante_id = e.id AND n.periodo_id = '4' ORDER BY n.id DESC LIMIT 1) AS nota_investigacion, (SELECT n.nota FROM notas_practicas n, solicitudes_asignadas s WHERE s.id = n.solicitud_id AND n.juicio_id = '3' AND s.estudiante_id = e.id AND n.periodo_id = '4' ORDER BY n.id DESC LIMIT 1) AS nota_maestrotitular, (SELECT n.nota FROM notas_practicas n, solicitudes_asignadas s WHERE s.id = n.solicitud_id AND n.juicio_id = '4' AND s.estudiante_id = e.id AND n.periodo_id = '4' ORDER BY n.id DESC LIMIT 1) AS nota_supervisor FROM estudiantes e, matriculas_periodo m, grupos g, semestres sm WHERE m.grupo_id = g.id AND g.semestre_id = sm.id AND e.id = m.estudiante_id AND m.periodo_id = '4'  AND e.estado = '1' ORDER BY sm.semestre, g.grupo, e.nombre",
    (err, rows) => {
      if (err) console.log(err);
      console.log(err);
      if (err)
        return res
          .status(500)
          .send({ res: "Error al consultar el consolidado de notas." });

      if (rows.length === 0)
        return res.status(200).send({ res: "No existen notas registradas" });

      return res.status(200).send({
        desserts: rows,
      });
    }
  );
};

const getJudgments = async (req, res) => {
  db.query("SELECT * FROM juicios ORDER BY id ASC", (err, rows) => {
    if (err) console.log(err);
    if (err)
      return res.status(500).send({ res: "Error al consultar los juicios." });

    if (rows.length === 0)
      return res.status(200).send({ res: "No existen juicios registrados" });

    return res.status(200).send({
      desserts: rows,
    });
  });
};

const getTypePractice = async (req, res) => {
  db.query("SELECT * FROM tipopractica ORDER BY id ASC", (err, rows) => {
    if (err) console.log(err);
    if (err)
      return res
        .status(500)
        .send({ res: "Error al consultar tipos de practicas." });

    if (rows.length === 0)
      return res
        .status(200)
        .send({ res: "No existen tipos de practicas registrados" });

    return res.status(200).send({
      desserts: rows,
    });
  });
};

const updatePractice = async (req, res) => {
  const id = req.params.id;
  const { nombre, telefono, correo } = req.body;

  db.query(
    "UPDATE docentes SET nombre = ?, telefono = ?, correo = ? WHERE id = ?",
    [nombre, telefono, correo, id],
    (err, rows) => {
      if (err) console.log(err);
      if (err)
        return res
          .status(500)
          .send({ res: "Error al actualizar el maestro titular." });

      return res.status(200).send({
        res: "El maestro titular actualizado correctamente",
      });
    }
  );
};

const inactivatePractice = async (req, res) => {
  const id = req.params.id;
  const state = 0;

  db.query(
    "UPDATE solicitudes_asignadas SET estado = ? WHERE id = ?",
    [state, id],
    (err, rows) => {
      if (err) console.log(err);
      if (err)
        return res
          .status(500)
          .send({ res: "Error al eliminar la asignación." });

      return res.status(200).send({
        res: "Asignación eliminada correctamente",
      });
    }
  );
};

const deleteAssign = async (req, res) => {
  const id = req.params.id;

  db.query("DELETE FROM solicitudes WHERE id = ?", [id], (err, rows) => {
    if (err) console.log(err);
    if (err)
      return res.status(500).send({ res: "Error al eliminar la solicitud" });

    return res.status(200).send({
      res: "solicitud eliminada correctamente",
    });
  });
};

module.exports = {
  savePractice,
  getPractices,
  saveRecord,
  updatePractice,
  deleteAssign,
  inactivatePractice,
  getPracticesAssign,
  getListStudentsAvailable,
  getConsolidateRecords,
  getPracticesByGroup,
  getPracticesByInstitution,
  getPracticesBySupervisor,
  saveAssign,
  getJudgments,
  getTypePractice,
};
