const { body } = require("express-validator");

const loginValidation = [
  body("login")
    .notEmpty()
    .withMessage("El usuario es obligatorio")
    .isLength({ min: 3, max: 50 })
    .withMessage("El usuario debe tener entre 3 y 50 caracteres"),
  
  body("password")
    .notEmpty()
    .withMessage("La contraseña es obligatoria")
    .isLength({ min: 6 })
    .withMessage("La contraseña debe tener al menos 6 caracteres")
];

const userValidation = [
  body("user")
    .notEmpty()
    .withMessage("El nombre de usuario es obligatorio")
    .isLength({ min: 3, max: 50 })
    .withMessage("El usuario debe tener entre 3 y 50 caracteres"),
  
  body("password")
    .notEmpty()
    .withMessage("La contraseña es obligatoria")
    .isLength({ min: 6 })
    .withMessage("La contraseña debe tener al menos 6 caracteres"),
  
  body("name")
    .notEmpty()
    .withMessage("El nombre es obligatorio")
    .isLength({ min: 2, max: 100 })
    .withMessage("El nombre debe tener entre 2 y 100 caracteres"),
  
  body("email")
    .optional()
    .isEmail()
    .withMessage("El correo debe tener un formato válido")
];

module.exports = {
  loginValidation,
  userValidation
};
