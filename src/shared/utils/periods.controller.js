const periodUtil = require('./period.util');

class PeriodsController {
  async getActivePeriod(req, res) {
    try {
      const activePeriodId = await periodUtil.getActivePeriodId();
      res.status(200).json({
        status: "success",
        data: {
          periodo_id: activePeriodId
        }
      });
    } catch (error) {
      res.status(404).json({
        status: "error",
        message: error.message
      });
    }
  }
}

module.exports = new PeriodsController();
