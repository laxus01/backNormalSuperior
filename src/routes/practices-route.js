const express = require("express");
const router = express.Router();
const PracticesController = require("../controllers/practices-controller");

router.post("/", PracticesController.saveAssign);
router.get("/", PracticesController.getPractices);
router.get("/getPracticesAssign", PracticesController.getPracticesAssign);
router.get("/getListStudentsAvailable", PracticesController.getListStudentsAvailable);

router.put("/update/:id", PracticesController.updatePractices);
router.delete("/:id", PracticesController.deleteAssign);

module.exports = router;