const express = require("express");
const TeachersController = require("./teachers.controller");
const { verifyToken } = require("../shared/middlewares/auth.middleware");

const router = express.Router();

// Proteger todas las rutas de teachers
router.use(verifyToken);

router.post("/", TeachersController.saveTeacher);
router.get("/", TeachersController.getTeachers);
router.put("/update/:id", TeachersController.updateTeacher);
router.put("/inactivate/:id", TeachersController.inactivateTeacher);

module.exports = router;
