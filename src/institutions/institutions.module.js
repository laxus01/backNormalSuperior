const express = require("express");
const InstitutionsController = require("./institutions.controller");
const { verifyToken } = require("../shared/middlewares/auth.middleware");

const router = express.Router();

// Proteger todas las rutas de instituciones
router.use(verifyToken);

router.post("/", InstitutionsController.saveInstitution);
router.get("/", InstitutionsController.getInstitutions);
router.put("/update/:id", InstitutionsController.updateInstitution);
router.put("/inactivate/:id", InstitutionsController.inactivateInstitution);

module.exports = router;
