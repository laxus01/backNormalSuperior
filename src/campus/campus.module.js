const express = require("express");
const CampusController = require("./campus.controller");

const router = express.Router();

// Campus routes
router.post("/", CampusController.saveCampus);
router.get("/", CampusController.getCampus);
router.put("/update/:id", CampusController.updateCampus);
router.put("/inactivate/:id", CampusController.inactivateCampus);

// Supervisor routes
router.post("/saveSupervisor", CampusController.saveSupervisor);
router.get("/getSupervisors", CampusController.getSupervisors);

// Degree routes
router.post("/saveDegree", CampusController.saveDegree);
router.get("/getDegrees", CampusController.getDegrees);
router.get("/getDegreesByCampus/:id", CampusController.getDegreesByCampus);

// Group routes
router.post("/saveGroup", CampusController.saveGroup);
router.get("/getGroups", CampusController.getGroups);
router.get("/getGroupsByDegree/:id/sede/:sede", CampusController.getGroupsByDegree);
router.put("/updateGroup/:id", CampusController.updateGroup);
router.put("/inactivateGroup/:id", CampusController.inactivateGroup);

// Additional routes
router.get("/listCampusByInstitution", CampusController.listCampusByInstitution);
router.get("/getTeachersByCampus/:id", CampusController.getTeachersByCampus);
router.get("/getJornadas", CampusController.getJornadas);

module.exports = router;
