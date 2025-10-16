const db = require("../../database");

class InstitutionsRepository {
  async createInstitution(institutionData) {
    const { institucion, rector, telefono, direccion, sector } = institutionData;
    
    const query = "INSERT INTO instituciones (institucion, rector, telefono, direccion, sector) VALUES (?, ?, ?, ?, ?)";
    const values = [institucion, rector, telefono, direccion, sector];
    
    return await db.query(query, values);
  }

  async findAllInstitutions() {
    const query = "SELECT * FROM instituciones WHERE estado = 1 ORDER BY institucion ASC";
    return await db.query(query);
  }

  async updateInstitution(institutionId, institutionData) {
    const { institucion, rector, telefono, direccion, sector } = institutionData;
    
    const query = `
      UPDATE instituciones 
      SET institucion = ?, rector = ?, telefono = ?, direccion = ?, sector = ? 
      WHERE id = ?
    `;
    const values = [institucion, rector, telefono, direccion, sector, institutionId];
    
    return await db.query(query, values);
  }

  async inactivateInstitution(institutionId) {
    const query = "UPDATE instituciones SET estado = ? WHERE id = ?";
    return await db.query(query, [0, institutionId]);
  }

  async findById(institutionId) {
    const query = "SELECT * FROM instituciones WHERE id = ? AND estado = 1";
    const result = await db.query(query, [institutionId]);
    return result[0];
  }
}

module.exports = new InstitutionsRepository();
