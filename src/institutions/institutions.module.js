const express = require("express");
const InstitutionsController = require("./institutions.controller");

const router = express.Router();

router.post("/", InstitutionsController.saveInstitution);
router.get("/", InstitutionsController.getInstitutions);
router.put("/update/:id", InstitutionsController.updateInstitution);
router.put("/inactivate/:id", InstitutionsController.inactivateInstitution);

module.exports = router;
