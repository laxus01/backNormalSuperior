const { body } = require("express-validator");

const studentValidation = [
  body("identificacion")
    .notEmpty()
    .withMessage("La identificación es obligatoria")
    .isLength({ min: 6, max: 20 })
    .withMessage("La identificación debe tener entre 6 y 20 caracteres")
    .isNumeric()
    .withMessage("La identificación debe contener solo números"),
  
  body("nombre")
    .notEmpty()
    .withMessage("El nombre es obligatorio")
    .isLength({ min: 2, max: 100 })
    .withMessage("El nombre debe tener entre 2 y 100 caracteres"),
  
  body("telefono")
    .optional()
    .isMobilePhone("es-CO")
    .withMessage("El teléfono debe tener un formato válido"),
  
  body("correo")
    .optional()
    .isEmail()
    .withMessage("El correo debe tener un formato válido")
];

const enrollValidation = [
  body("estudiante_id")
    .isInt({ min: 1 })
    .withMessage("El ID del estudiante debe ser un número entero válido"),
  
  body("grupo_id")
    .isInt({ min: 1 })
    .withMessage("El ID del grupo debe ser un número entero válido"),
  
  body("periodo_id")
    .isInt({ min: 1 })
    .withMessage("El ID del período debe ser un número entero válido")
];

const enrollGroupValidation = [
  body("grupo_anterior")
    .isInt({ min: 1 })
    .withMessage("El ID del grupo anterior debe ser un número entero válido"),
  
  body("grupo_actual")
    .isInt({ min: 1 })
    .withMessage("El ID del grupo actual debe ser un número entero válido"),
  
  body("periodo_id")
    .isInt({ min: 1 })
    .withMessage("El ID del período debe ser un número entero válido")
];

module.exports = {
  studentValidation,
  enrollValidation,
  enrollGroupValidation
};
