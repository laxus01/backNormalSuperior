const express = require("express");
const StudentsController = require("./students.controller");

const router = express.Router();

// Student management routes
router.post("/", StudentsController.saveStudent);
router.get("/", StudentsController.getStudent);
router.get("/byPracticeActive", StudentsController.getStudentsByPracticeActive);
router.get("/getStudentsByPracticeActive", StudentsController.getStudentsByPracticeActive); // Frontend compatibility route
router.put("/update/:id", StudentsController.updateStudent);
router.put("/changeState/:id/:state", StudentsController.changeStateStudent);

// Enrollment routes
router.post("/saveEnroll", StudentsController.saveEnroll);
router.post("/saveEnrollGroup", StudentsController.saveEnrollGroup);
router.get("/enrollments", StudentsController.getStudentEnrroll);
router.get("/getStudentEnrroll", StudentsController.getStudentEnrroll); // Frontend compatibility route
router.put("/updateEnroll/:id", StudentsController.updateEnroll);
router.delete("/deleteEnroll/:id", StudentsController.deleteEnroll);

// Groups routes
router.get("/groups", StudentsController.getGroups);
router.get("/getGroups", StudentsController.getGroups); // Frontend compatibility route

module.exports = router;
