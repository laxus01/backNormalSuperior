const express = require("express");
const router = express.Router();
const StudentController = require("../controllers/students-controller");

router.post("/", StudentController.saveStudent);
router.post("/saveEnroll", StudentController.saveEnroll);
router.post("/saveEnrollGroup", StudentController.saveEnrollGroup);
router.get("/", StudentController.getStudent);
router.get("/getStudentEnrroll", StudentController.getStudentEnrroll);
router.get("/getStudentsByPracticeActive", StudentController.getStudentsByPracticeActive);
router.get("/getGroups", StudentController.getGroups);

router.put("/update/:id", StudentController.updateStudent);
router.put("/updateEnroll/:id", StudentController.updateEnroll);
router.put("/changeStateStudent/:id/state/:state", StudentController.changeStateStudent);
router.delete("/:id", StudentController.deleteEnroll);

module.exports = router;