const express = require("express");
const PeriodsController = require("./periods.controller");

const router = express.Router();

router.get("/active", PeriodsController.getActivePeriod);

module.exports = router;
