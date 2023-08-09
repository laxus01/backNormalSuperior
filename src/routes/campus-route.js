const express = require("express");
const router = express.Router();
const CampusController = require("../controllers/campus-controller");

router.post("/", CampusController.saveCampus);
router.post("/saveSupervisor", CampusController.saveSupervisor);
router.post("/saveDegree", CampusController.saveDegree);
router.post("/saveGroup", CampusController.saveGroup);
router.get("/", CampusController.getCampus);
router.get("/getSupervisors", CampusController.getSupervisors);
router.get("/getDegrees", CampusController.getDegrees);
router.get("/getGroups", CampusController.getGroups);
router.get("/listCampusByInstitution", CampusController.listCampusByInstitution);

router.put("/update/:id", CampusController.updateCampus);
router.put("/updateGroup/:id", CampusController.updateGroup);
router.put("/inactivateGroup/:id", CampusController.inactivateGroup);
router.put("/inactivate/:id", CampusController.inactivateCampus);

module.exports = router;