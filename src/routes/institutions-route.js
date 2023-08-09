const express = require("express");
const router = express.Router();
const InstitutionController = require("../controllers/institutions-controller");

router.post("/", InstitutionController.saveInstitution);
router.get("/", InstitutionController.getInstitutions);

router.put("/update/:id", InstitutionController.updateInstitution);
router.put("/inactivate/:id", InstitutionController.inactivateInstitution);

module.exports = router;