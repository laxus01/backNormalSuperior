const express = require("express");
const router = express.Router();
const PracticesController = require("../controllers/practices-controller");

router.post("/", PracticesController.saveAssign);
router.post("/savePractice", PracticesController.savePractice);
router.post("/saveRecord", PracticesController.saveRecord);
router.get("/", PracticesController.getPractices);
router.get("/getPracticesAssign", PracticesController.getPracticesAssign);
router.get("/getJudgments", PracticesController.getJudgments);
router.get("/getTypePractice", PracticesController.getTypePractice);
router.get("/getListStudentsAvailable", PracticesController.getListStudentsAvailable);
router.get("/getConsolidateRecords", PracticesController.getConsolidateRecords);
router.get("/getConsolidateRecordsByGroup/:id", PracticesController.getConsolidateRecordsByGroup);
router.get("/getPracticesByGroup/:id", PracticesController.getPracticesByGroup);
router.get("/getPracticesByInstitution/:id", PracticesController.getPracticesByInstitution);
router.get("/getPracticesBySupervisor/:id", PracticesController.getPracticesBySupervisor);
router.put("/inactivate/:id", PracticesController.inactivatePractice);

router.delete("/:id", PracticesController.deleteAssign);

module.exports = router;