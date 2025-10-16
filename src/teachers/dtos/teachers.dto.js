const { body } = require("express-validator");

const teacherValidation = [
  body("nombre")
    .notEmpty()
    .withMessage("El nombre del maestro titular es obligatorio")
    .isLength({ min: 2, max: 100 })
    .withMessage("El nombre debe tener entre 2 y 100 caracteres"),
  
  body("telefono")
    .optional()
    .isMobilePhone("es-CO")
    .withMessage("El teléfono debe tener un formato válido"),
  
  body("correo")
    .optional()
    .isEmail()
    .withMessage("El correo debe tener un formato válido"),
  
  body("sede_id")
    .isInt({ min: 1 })
    .withMessage("El ID de la sede debe ser un número entero válido")
];

module.exports = {
  teacherValidation
};
