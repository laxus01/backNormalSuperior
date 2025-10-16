const express = require("express");
const UsersController = require("./users.controller");
const UsersDebug = require("./users.debug");
const { authLimiter } = require("../shared/middlewares/security.middleware");
const { loginValidation } = require("./dtos/users.dto");
const { handleValidationErrors } = require("../shared/middlewares/validation.middleware");

const router = express.Router();

router.post("/login", 
  authLimiter,
  loginValidation,
  handleValidationErrors,
  UsersController.login
);

// Debug endpoints (only in development)
router.get("/debug/check", UsersDebug.checkUsers);
router.post("/debug/create-test-user", UsersDebug.createTestUser);

module.exports = router;
