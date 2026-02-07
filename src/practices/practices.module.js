const express = require("express");
const PracticesController = require("./practices.controller");
const { verifyToken } = require("../shared/middlewares/auth.middleware");

const router = express.Router();

// Proteger todas las rutas de practices
router.use(verifyToken);

// Practice management routes
router.post("/", PracticesController.savePractice);
router.post("/savePractice", PracticesController.savePractice);
router.get("/", PracticesController.getPractices);
router.get("/byGroup/:id", PracticesController.getPracticesByGroup);
router.get("/getPracticesByGroup/:id", PracticesController.getPracticesByGroup); // Frontend compatibility route
router.get("/byInstitution/:id", PracticesController.getPracticesByInstitution);
router.get("/getPracticesByInstitution/:id", PracticesController.getPracticesByInstitution); // Frontend compatibility route
router.get("/bySupervisor/:id", PracticesController.getPracticesBySupervisor);
router.get("/getPracticesBySupervisor/:id", PracticesController.getPracticesBySupervisor); // Frontend compatibility route
router.put("/update/:id", PracticesController.updatePractice);
router.put("/inactivate/:id", PracticesController.inactivatePractice);

// Assignment routes
router.post("/saveAssign", PracticesController.saveAssign);
router.get("/practicesAssign", PracticesController.getPracticesAssign);
router.get("/getPracticesAssign", PracticesController.getPracticesAssign); // Frontend compatibility route
router.get("/studentsAvailable", PracticesController.getListStudentsAvailable);
router.get("/getListStudentsAvailable", PracticesController.getListStudentsAvailable); // Frontend compatibility route
router.delete("/deleteAssign/:id", PracticesController.deleteAssign);

// Records and grades routes
router.post("/saveRecord", PracticesController.saveRecord);
router.get("/consolidateRecords", PracticesController.getConsolidateRecords);
router.get("/getConsolidateRecords", PracticesController.getConsolidateRecords); // Frontend compatibility route
router.get("/getConsolidateRecordsByGroup/:id", PracticesController.getConsolidateRecordsByGroup);

// Catalog routes
router.get("/judgments", PracticesController.getJudgments);
router.get("/getJudgments", PracticesController.getJudgments); // Frontend compatibility route
router.get("/typePractice", PracticesController.getTypePractice);
router.get("/getTypePractice", PracticesController.getTypePractice); // Frontend compatibility route

module.exports = router;
