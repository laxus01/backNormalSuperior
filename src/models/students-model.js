const db = require("../database");

const saveStudent = async (req, res) => {
  const { nombre, telefono, correo  } = req.body;

  db.query(
    "INSERT INTO estudiantes (nombre, telefono, correo) VALUES (?, ?, ?)", [nombre, telefono, correo], (err, studentStored) => {
      if (err) console.log(err);
      if (err)
        return res
          .status(500)
          .send({ respuesta: "Error al guardar la institución." });

      if (!studentStored)
        return res
          .status(404)
          .send({ respuesta: "No se ha podido guardar la institución" });
          
      return res.status(201).send({
        respuesta: "La institución se registro correctamente",
      });
    }
  );
};

const saveEnroll = async (req, res) => {
  const { estudiante_id, grupo_id, periodo_id  } = req.body;

  db.query(
    "INSERT INTO matriculas_periodo (estudiante_id, grupo_id, periodo_id) VALUES (?, ?, ?)", [estudiante_id, grupo_id, periodo_id], (err, enrollStored) => {
      if (err) console.log(err);
      if (err)
        return res
          .status(500)
          .send({ respuesta: "Error al guardar la matricula." });

      if (!enrollStored)
        return res
          .status(404)
          .send({ respuesta: "No se ha podido guardar la matricula" });
          
      return res.status(201).send({
        respuesta: "La matricula se registro correctamente",
      });
    }
  );
};

const saveEnrollGroup = async (req, res) => {
  const { grupo_anterior, grupo_actual, periodo_id  } = req.body;

  db.query(
    `INSERT INTO matriculas_periodo (estudiante_id, grupo_id, periodo_id) SELECT estudiante_id, ${grupo_actual}, ${periodo_id} FROM matriculas_periodo WHERE grupo_id = ? AND periodo_id = (? - 1)`, [grupo_anterior, periodo_id], (err, enrollStored) => {
      if (err) console.log(err);
      if (err)
        return res
          .status(500)
          .send({ respuesta: "Error al guardar la matricula." });

      if (!enrollStored)
        return res
          .status(404)
          .send({ respuesta: "No se ha podido guardar la matricula" });
          
      return res.status(201).send({
        respuesta: "La matricula se registro correctamente",
      });
    }
  );
};

const getStudent = async (req, res) => {
  db.query(
    "SELECT a.id, a.nombre, a.identificacion, a.telefono, a.correo, b.estado FROM estudiantes a, estado_estudiantes b WHERE a.estado = b.id ORDER BY b.estado ASC, a.nombre ASC",
    (err, rows) => {
      if (err) console.log(err);
      if (err)
        return res.status(500).send({ res: "Error al consultar los estudiantes." });

      if (rows.length === 0)
        return res
          .status(200)
          .send({ res: "No existen estudiantes registradas" });

      return res.status(200).send({
        desserts: rows,
      });
    }
  );
};

const getStudentEnrroll = async (req, res) => {
  db.query(
    "SELECT m.id, e.identificacion, e.nombre, CONCAT(s.semestre,' ',g.grupo) AS grupo FROM semestres s, grupos g, estudiantes e, matriculas_periodo m, periodos p WHERE m.grupo_id = g.id AND g.semestre_id = s.id AND e.id = m.estudiante_id AND m.periodo_id = p.id AND p.estado = '1' ORDER BY s.id ASC, g.grupo ASC, e.nombre ASC",
    (err, rows) => {
      if (err) console.log(err);
      if (err)
        return res.status(500).send({ res: "Error al consultar las matriculas." });

      if (rows.length === 0)
        return res
          .status(200)
          .send({ res: "No existen matriculas registradas" });

      return res.status(200).send({
        desserts: rows,
      });
    }
  );
};

const getStudentsByPracticeActive = async (req, res) => {
  db.query(
    "SELECT sa.id, e.nombre, i.institucion, CONCAT(sm.semestre,' ',g.grupo) AS grupo FROM estudiantes e, solicitudes_asignadas sa, solicitudes s, sedes se, instituciones i, grupos g, semestres sm, matriculas_periodo mp WHERE e.id = sa.estudiante_id AND sa.estado = '1' AND sa.solicitud_id = s.id AND s.sede_id = se.id AND se.institucion_id = i.id AND sa.semestre_id = sm.id AND e.id = mp.estudiante_id AND mp.grupo_id = g.id",
    (err, rows) => {
      if (err) console.log(err);
      console.log(err);
      if (err)
        return res.status(500).send({ res: "Error al consultar las matriculas." });

      if (rows.length === 0)
        return res
          .status(200)
          .send({ res: "No existen matriculas registradas" });

      return res.status(200).send({
        desserts: rows,
      });
    }
  );
};

const getGroups = async (req, res) => {
  db.query(
    "SELECT CONCAT(s.semestre,' ',g.grupo) AS grupo, g.id FROM semestres s, grupos g WHERE g.semestre_id = s.id ORDER BY s.id ASC, g.grupo ASC",
    (err, rows) => {
      if (err) console.log(err);
      if (err)
        return res.status(500).send({ res: "Error al consultar las matriculas." });

      if (rows.length === 0)
        return res
          .status(200)
          .send({ res: "No existen matriculas registradas" });

      return res.status(200).send({
        desserts: rows,
      });
    }
  );
};

const updateStudent = async (req, res) => {

  const id = req.params.id;  
  const { nombre, telefono, correo } = req.body;


  db.query(
    "UPDATE estudiantes SET nombre = ?, telefono = ?, correo = ? WHERE id = ?",[nombre, telefono, correo, id],
    (err, rows) => {
      if (err) console.log(err);
      if (err)
        return res.status(500).send({ res: "Error al actualizar el estudiante." });

      return res.status(200).send({
        res: "Estudiante actualizado correctamente",
      });
    }
  );
};

const updateEnroll = async (req, res) => {

  const id = req.params.id;  
  const { grupo_id } = req.body;


  db.query(
    "UPDATE matriculas_periodo SET grupo_id = ? WHERE id = ?",[grupo_id, id],
    (err, rows) => {
      if (err) console.log(err);
      if (err)
        return res.status(500).send({ res: "Error al actualizar el grupo." });

      return res.status(200).send({
        res: "Grupo actualizado correctamente",
      });
    }
  );
};

const changeStateStudent = async (req, res) => {

  const id = req.params.id;  
  const state = req.params.state === 'RETIRADO' ? 1 : 0;

  db.query(
    "UPDATE estudiantes SET estado = ?  WHERE id = ?",[state, id],
    (err, rows) => {
      if (err) console.log(err);
      if (err)
        return res.status(500).send({ res: "Error al eliminar el estudiante." });

      return res.status(200).send({
        res: "El estudiante se elimino correctamente",
      });
    }
  );
};

const deleteEnroll = async (req, res) => {

  const id = req.params.id;

  db.query(
    "DELETE FROM matriculas_periodo WHERE id = ?",[id],
    (err, rows) => {
      if (err) console.log(err);
      if (err)
        return res.status(500).send({ res: "Error al eliminar la matricula" });

      return res.status(200).send({
        res: "matricula eliminada correctamente",
      });
    }
  );
};

module.exports = {
  saveStudent,
  saveEnroll,
  saveEnrollGroup,
  getStudent,
  getStudentEnrroll,
  getStudentsByPracticeActive,
  getGroups,
  updateStudent,
  updateEnroll,
  changeStateStudent,
  deleteEnroll,
};