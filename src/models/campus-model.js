const db = require("../database");

const saveCampus = async (req, res) => {
  const {
    sede,
    coordinador,
    telefono,
    direccion,
    institucion_id,
    supervisor_id,
  } = req.body;

  db.query(
    "INSERT INTO sedes (sede, coordinador, telefono, direccion, institucion_id, supervisor_id) VALUES (?, ?, ?, ?, ?, ?)",
    [sede, coordinador, telefono, direccion, institucion_id, supervisor_id],
    (err, campusStored) => {
      if (err) console.log(err);
      if (err)
        return res
          .status(500)
          .send({ respuesta: "Error al guardar el producto." });

      if (!campusStored)
        return res
          .status(404)
          .send({ respuesta: "No se ha podido guardar el producto" });

      return res.status(201).send({
        respuesta: "La sede se registro correctamente",
      });
    }
  );
};

const saveSupervisor = async (req, res) => {
  const { supervisor, telefono } = req.body;

  db.query(
    "INSERT INTO supervisores (supervisor, telefono) VALUES (?, ?)",
    [supervisor, telefono],
    (err, supervisorStored) => {
      if (err) console.log(err);
      if (err)
        return res
          .status(500)
          .send({ respuesta: "Error al guardar el supervisor." });

      if (!supervisorStored)
        return res
          .status(404)
          .send({ respuesta: "No se ha podido guardar el supervisor" });

      return res.status(201).send({
        respuesta: "El supervisor se registro correctamente",
      });
    }
  );
};

const saveDegree = async (req, res) => {
  const { grado } = req.body;

  db.query(
    "INSERT INTO grados (grado) VALUES (?)",
    [grado],
    (err, degreeStored) => {
      if (err) console.log(err);
      if (err)
        return res
          .status(500)
          .send({ respuesta: "Error al guardar el grado." });

      if (!degreeStored)
        return res
          .status(404)
          .send({ respuesta: "No se ha podido guardar el grado" });

      return res.status(201).send({
        respuesta: "El grado se registro correctamente",
      });
    }
  );
};

const saveGroup = async (req, res) => {
  const { sede_id, grado_id, grupo } = req.body;

  db.query(
    "INSERT INTO detalle_grupoc (sede_id, grado_id, grupo) VALUES (?, ?, ?)",
    [sede_id, grado_id, grupo],
    (err, groupStored) => {
      if (err) console.log(err);
      if (err)
        return res
          .status(500)
          .send({ respuesta: "Error al guardar el grupo." });

      if (!groupStored)
        return res
          .status(404)
          .send({ respuesta: "No se ha podido guardar el grupo" });

      return res.status(201).send({
        respuesta: "El grupo se registro correctamente",
      });
    }
  );
};

const getCampus = async (req, res) => {
  db.query(
    "SELECT s.id, s.sede, s.coordinador, s.telefono, s.direccion, i.institucion, sp.supervisor, sp.id AS supervisor_id FROM sedes s, instituciones i, supervisores sp WHERE i.id = s.institucion_id AND s.supervisor_id = sp.id AND s.estado = '1' ORDER BY i.institucion, s.sede ASC",
    (err, rows) => {
      if (err) console.log(err);
      if (err)
        return res.status(500).send({ res: "Error al consultar las sedes." });

      if (rows.length === 0)
        return res.status(200).send({ res: "No existen sedes registradas" });

      return res.status(200).send({
        desserts: rows,
      });
    }
  );
};

const getTeachersByCampus = async (req, res) => {
  const id = req.params.id;

  db.query(
    "SELECT id, nombre FROM docentes WHERE sede_id = ? ORDER BY nombre ASC",
    [id],
    (err, rows) => {
      if (err) console.log(err);
      if (err)
        return res.status(500).send({ res: "Error al consultar las sedes." });

      if (rows.length === 0)
        return res.status(200).send({ res: "No existen sedes registradas" });

      return res.status(200).send({
        desserts: rows,
      });
    }
  );
};

const getDegreesByCampus = async (req, res) => {
  const id = req.params.id;

  db.query(
    "SELECT g.id, g.grado FROM grados g, detalle_grupoc d WHERE g.id = d.grado_id AND d.sede_id = ? GROUP BY g.id",
    [id],
    (err, rows) => {
      if (err) console.log(err);
      if (err)
        return res.status(500).send({ res: "Error al consultar las sedes." });

      if (rows.length === 0)
        return res.status(200).send({ res: "No existen sedes registradas" });

      return res.status(200).send({
        desserts: rows,
      });
    }
  );
};

const getGroupsByDegree = async (req, res) => {
  const id = req.params.id;
  const sede_id = req.params.sede;

  db.query(
    "SELECT d.id, d.grupo FROM detalle_grupoc d WHERE d.grado_id = ? AND d.sede_id = ?",
    [id, sede_id],
    (err, rows) => {
      if (err) console.log(err);
      if (err)
        return res.status(500).send({ res: "Error al consultar las sedes." });

      if (rows.length === 0)
        return res.status(200).send({ res: "No existen sedes registradas" });

      return res.status(200).send({
        desserts: rows,
      });
    }
  );
};

const getJornadas = async (req, res) => {
  db.query("SELECT * FROM jornadas ORDER BY id ASC", (err, rows) => {
    if (err) console.log(err);
    if (err)
      return res.status(500).send({ res: "Error al consultar las jornadas." });

    if (rows.length === 0)
      return res.status(200).send({ res: "No existen jornadas registradas" });

    return res.status(200).send({
      desserts: rows,
    });
  });
};

const getSupervisors = async (req, res) => {
  db.query(
    "SELECT * FROM supervisores ORDER BY supervisor ASC",
    (err, rows) => {
      if (err) console.log(err);
      if (err)
        return res
          .status(500)
          .send({ res: "Error al consultar el supervisor." });

      if (rows.length === 0)
        return res
          .status(200)
          .send({ res: "No existen supervisores registradas" });

      return res.status(200).send({
        desserts: rows,
      });
    }
  );
};

const getDegrees = async (req, res) => {
  db.query("SELECT * FROM grados ORDER BY grado ASC", (err, rows) => {
    if (err) console.log(err);
    if (err)
      return res.status(500).send({ res: "Error al consultar el grado." });

    if (rows.length === 0)
      return res.status(200).send({ res: "No existen grados registradas" });

    return res.status(200).send({
      desserts: rows,
    });
  });
};

const getGroups = async (req, res) => {
  db.query(
    "SELECT d.id, i.institucion, s.sede, g.id AS grado_id, g.grado, d.grupo FROM instituciones i, sedes s, detalle_grupoc d, grados g WHERE i.id = s.institucion_id AND s.id = d.sede_id AND d.grado_id = g.id AND d.estado = '1' ORDER BY g.id ASC",
    (err, rows) => {
      if (err) console.log(err);
      if (err)
        return res.status(500).send({ res: "Error al consultar los grupos." });

      if (rows.length === 0)
        return res.status(200).send({ res: "No existen grupos registradas" });

      return res.status(200).send({
        desserts: rows,
      });
    }
  );
};

const listCampusByInstitution = async (req, res) => {
  db.query(
    "SELECT s.id, CONCAT(i.institucion,' - ',s.sede) AS sede FROM sedes s, instituciones i WHERE i.id = s.institucion_id AND s.estado = '1' AND i.estado = '1' ORDER BY i.institucion, s.sede ASC",
    (err, rows) => {
      if (err) console.log(err);
      if (err)
        return res.status(500).send({ res: "Error al consultar las sedes." });

      if (rows.length === 0)
        return res.status(200).send({ res: "No existen sedes registradas" });

      return res.status(200).send({
        desserts: rows,
      });
    }
  );
};

const updateCampus = async (req, res) => {
  const id = req.params.id;
  const { sede, coordinador, telefono, direccion, supervisor_id } = req.body;

  console.log(req.body);
  console.log(id);

  db.query(
    "UPDATE sedes SET sede = ?, coordinador = ?, telefono = ?, direccion = ?, supervisor_id = ? WHERE id = ?",
    [sede, coordinador, telefono, direccion, supervisor_id, id],
    (err, rows) => {
      if (err) console.log(err);
      if (err)
        return res.status(500).send({ res: "Error al actualizar la sede." });

      return res.status(200).send({
        res: "Sede actualizada correctamente",
      });
    }
  );
};

const updateGroup = async (req, res) => {
  const id = req.params.id;
  const { grado_id, grupo } = req.body;

  db.query(
    "UPDATE detalle_grupoc SET grado_id = ?, grupo = ? WHERE id = ?",
    [grado_id, grupo, id],
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

const inactivateCampus = async (req, res) => {
  const id = req.params.id;
  const state = 0;

  db.query(
    "UPDATE sedes SET estado = ?  WHERE id = ?",
    [state, id],
    (err, rows) => {
      if (err) console.log(err);
      if (err)
        return res.status(500).send({ res: "Error al eliminar la sede." });

      return res.status(200).send({
        res: "La sede se elimino correctamente",
      });
    }
  );
};

const inactivateGroup = async (req, res) => {
  const id = req.params.id;
  const state = 0;

  db.query(
    "UPDATE detalle_grupoc SET estado = ?  WHERE id = ?",
    [state, id],
    (err, rows) => {
      if (err) console.log(err);
      if (err)
        return res.status(500).send({ res: "Error al eliminar el grupo." });

      return res.status(200).send({
        res: "El grupo se elimino correctamente",
      });
    }
  );
};

module.exports = {
  saveCampus,
  saveSupervisor,
  saveDegree,
  saveGroup,
  getCampus,
  getSupervisors,
  getDegrees,
  getTeachersByCampus,
  getDegreesByCampus,
  getGroupsByDegree,
  getJornadas,
  getGroups,
  listCampusByInstitution,
  updateCampus,
  updateGroup,
  inactivateGroup,
  inactivateCampus,
};
