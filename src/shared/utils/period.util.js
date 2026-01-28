const db = require('../../database');

class PeriodUtil {
  async getActivePeriodId() {
    const query = "SELECT id FROM periodos WHERE estado = 1 LIMIT 1";
    const result = await db.query(query);
    
    if (!result || result.length === 0) {
      throw new Error('No active period found');
    }
    
    return result[0].id;
  }
}

module.exports = new PeriodUtil();
