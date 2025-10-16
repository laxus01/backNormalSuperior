const { body } = require("express-validator");

const practiceValidation = [
  body("sede_id")
    .isInt({ min: 1 })
    .withMessage("El ID de la sede debe ser un número entero válido"),
  
  body("jornada_id")
    .isInt({ min: 1 })
    .withMessage("El ID de la jornada debe ser un número entero válido"),
  
  body("detallegrupoc_id")
    .isInt({ min: 1 })
    .withMessage("El ID del grupo debe ser un número entero válido"),
  
  body("docente_id")
    .isInt({ min: 1 })
    .withMessage("El ID del docente debe ser un número entero válido"),
  
  body("detalle")
    .optional()
    .isLength({ max: 500 })
    .withMessage("El detalle no puede exceder 500 caracteres")
];

const assignValidation = [
  body("solicitud_id")
    .isInt({ min: 1 })
    .withMessage("El ID de la solicitud debe ser un número entero válido"),
  
  body("estudiante_id")
    .isInt({ min: 1 })
    .withMessage("El ID del estudiante debe ser un número entero válido"),
  
  body("tipopractica_id")
    .isInt({ min: 1 })
    .withMessage("El ID del tipo de práctica debe ser un número entero válido"),
  
  body("semestre_id")
    .isInt({ min: 1 })
    .withMessage("El ID del semestre debe ser un número entero válido"),
  
  body("periodo_id")
    .isInt({ min: 1 })
    .withMessage("El ID del período debe ser un número entero válido")
];

const recordValidation = [
  body("solicitud_id")
    .isInt({ min: 1 })
    .withMessage("El ID de la solicitud debe ser un número entero válido"),
  
  body("periodo_id")
    .isInt({ min: 1 })
    .withMessage("El ID del período debe ser un número entero válido"),
  
  body("juicio_id")
    .isInt({ min: 1 })
    .withMessage("El ID del juicio debe ser un número entero válido"),
  
  body("nota")
    .isFloat({ min: 0, max: 5 })
    .withMessage("La nota debe ser un número entre 0 y 5")
];

module.exports = {
  practiceValidation,
  assignValidation,
  recordValidation
};
