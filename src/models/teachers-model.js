const db = require("../database");

const saveTeacher = async (req, res) => {
  const { nombre, telefono, correo, sede_id } = req.body;

  db.query(
    "INSERT INTO docentes (nombre, telefono, correo, sede_id) VALUES (?, ?, ?, ?)",
    [nombre, telefono, correo, sede_id],
    (err, teachersStored) => {
      if (err) console.log(err);
      if (err)
        return res
          .status(500)
          .send({ respuesta: "Error al guardar el maestro titular." });

      if (!teachersStored)
        return res
          .status(404)
          .send({ respuesta: "No se ha podido guardar el maestro titular" });

      return res.status(201).send({
        respuesta: "El maestro titular se registro correctamente",
      });
    }
  );
};

const getTeachers = async (req, res) => {
  db.query(
    "SELECT d.id, d.nombre, d.telefono, d.correo, i.institucion, s.sede FROM docentes d, instituciones i, sedes s WHERE d.sede_id = s.id AND s.institucion_id = i.id AND d.estado = 1 ORDER BY i.institucion ASC, d.nombre ASC",
    (err, rows) => {
      if (err) console.log(err);
      if (err)
        return res
          .status(500)
          .send({ res: "Error al consultar los maestros titulares." });

      if (rows.length === 0)
        return res
          .status(200)
          .send({ res: "No existen maestros titulares registrados" });

      return res.status(200).send({
        desserts: rows,
      });
    }
  );
};

const updateTeacher = async (req, res) => {
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

const inactivateTeacher = async (req, res) => {
  const id = req.params.id;
  const state = 0;

  db.query(
    "UPDATE docentes SET estado = ?  WHERE id = ?",
    [state, id],
    (err, rows) => {
      if (err) console.log(err);
      if (err)
        return res
          .status(500)
          .send({ res: "Error al eliminar el maestro titular." });

      return res.status(200).send({
        res: "El maestro titular se elimino correctamente",
      });
    }
  );
};

module.exports = {
  saveTeacher,
  getTeachers,
  updateTeacher,
  inactivateTeacher,
};
