const express = require("express");
const PeriodsController = require("./periods.controller");
const { verifyToken } = require("../middlewares/auth.middleware");

const router = express.Router();

// Proteger todas las rutas de periodos
router.use(verifyToken);

router.get("/active", PeriodsController.getActivePeriod);

module.exports = router;
