const express = require("express");
const router = express.Router();
const TeacherController = require("../controllers/teachers-controller");

router.post("/", TeacherController.saveTeacher);
router.get("/", TeacherController.getTeachers);

router.put("/update/:id", TeacherController.updateTeacher);
router.put("/inactivate/:id", TeacherController.inactivateTeacher);

module.exports = router;