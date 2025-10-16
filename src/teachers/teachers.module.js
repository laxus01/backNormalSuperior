const express = require("express");
const TeachersController = require("./teachers.controller");

const router = express.Router();

router.post("/", TeachersController.saveTeacher);
router.get("/", TeachersController.getTeachers);
router.put("/update/:id", TeachersController.updateTeacher);
router.put("/inactivate/:id", TeachersController.inactivateTeacher);

module.exports = router;
