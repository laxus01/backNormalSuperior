const db = require("../database");

const saveInstitution = async (req, res) => {
  const { institucion, rector, telefono, sector  } = req.body;

  db.query(
    "INSERT INTO instituciones (institucion, rector, telefono, sector) VALUES (?, ?, ?, ?)", [institucion, rector, telefono, sector], (err, campusStored) => {
      console.log(err);
      if (err)
        return res
          .status(500)
          .send({ respuesta: "Error al guardar la institución." });

      if (!campusStored)
        return res
          .status(404)
          .send({ respuesta: "No se ha podido guardar la institución" });
          
      return res.status(201).send({
        respuesta: "La institución se registro correctamente",
      });
    }
  );
};

const getInstitutions = async (req, res) => {
  db.query(
    "SELECT * FROM instituciones WHERE estado = 1 ORDER BY institucion ASC",
    (err, rows) => {
      if (err)
        return res.status(500).send({ res: "Error al consultar las instituciones." });

      if (rows.length === 0)
        return res
          .status(200)
          .send({ res: "No existen instituciones registradas" });

      return res.status(200).send({
        desserts: rows,
      });
    }
  );
};

const updateInstitution = async (req, res) => {

  const id = req.params.id;  
  const { institucion, rector, telefono, sector } = req.body;


  db.query(
    "UPDATE instituciones SET institucion = ?, rector = ?, telefono = ?, sector = ? WHERE id = ?",[institucion, rector, telefono, sector, id],
    (err, rows) => {
      if (err)
        return res.status(500).send({ res: "Error al actualizar la institución." });

      return res.status(200).send({
        res: "Institución actualizada correctamente",
      });
    }
  );
};

const inactivateInstitution = async (req, res) => {

  const id = req.params.id;  
  const state = 0;

  db.query(
    "UPDATE instituciones SET estado = ?  WHERE id = ?",[state, id],
    (err, rows) => {
      if (err)
        return res.status(500).send({ res: "Error al eliminar la institución." });

      return res.status(200).send({
        res: "La institución se elimino correctamente",
      });
    }
  );
};

module.exports = {
  saveInstitution,
  getInstitutions,
  updateInstitution,
  inactivateInstitution,
};