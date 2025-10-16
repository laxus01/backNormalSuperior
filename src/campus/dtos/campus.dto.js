const { body } = require("express-validator");

const campusValidation = [
  body("sede")
    .notEmpty()
    .withMessage("El nombre de la sede es obligatorio")
    .isLength({ min: 2, max: 100 })
    .withMessage("El nombre de la sede debe tener entre 2 y 100 caracteres"),
  
  body("coordinador")
    .notEmpty()
    .withMessage("El nombre del coordinador es obligatorio")
    .isLength({ min: 2, max: 100 })
    .withMessage("El nombre del coordinador debe tener entre 2 y 100 caracteres"),
  
  body("telefono")
    .optional()
    .isMobilePhone("es-CO")
    .withMessage("El teléfono debe tener un formato válido"),
  
  body("direccion")
    .optional()
    .isLength({ max: 200 })
    .withMessage("La dirección no puede exceder 200 caracteres"),
  
  body("institucion_id")
    .isInt({ min: 1 })
    .withMessage("El ID de la institución debe ser un número entero válido"),
  
  body("supervisor_id")
    .isInt({ min: 1 })
    .withMessage("El ID del supervisor debe ser un número entero válido")
];

const supervisorValidation = [
  body("supervisor")
    .notEmpty()
    .withMessage("El nombre del supervisor es obligatorio")
    .isLength({ min: 2, max: 100 })
    .withMessage("El nombre del supervisor debe tener entre 2 y 100 caracteres"),
  
  body("telefono")
    .optional()
    .isMobilePhone("es-CO")
    .withMessage("El teléfono debe tener un formato válido")
];

const degreeValidation = [
  body("grado")
    .notEmpty()
    .withMessage("El nombre del grado es obligatorio")
    .isLength({ min: 2, max: 50 })
    .withMessage("El nombre del grado debe tener entre 2 y 50 caracteres")
];

const groupValidation = [
  body("sede_id")
    .isInt({ min: 1 })
    .withMessage("El ID de la sede debe ser un número entero válido"),
  
  body("grado_id")
    .isInt({ min: 1 })
    .withMessage("El ID del grado debe ser un número entero válido"),
  
  body("grupo")
    .notEmpty()
    .withMessage("El nombre del grupo es obligatorio")
    .isLength({ min: 1, max: 10 })
    .withMessage("El nombre del grupo debe tener entre 1 y 10 caracteres")
];

module.exports = {
  campusValidation,
  supervisorValidation,
  degreeValidation,
  groupValidation
};
