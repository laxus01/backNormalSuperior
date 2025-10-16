const { body } = require("express-validator");

const institutionValidation = [
  body("institucion")
    .notEmpty()
    .withMessage("El nombre de la institución es obligatorio")
    .isLength({ min: 2, max: 150 })
    .withMessage("El nombre de la institución debe tener entre 2 y 150 caracteres"),
  
  body("rector")
    .notEmpty()
    .withMessage("El nombre del rector es obligatorio")
    .isLength({ min: 2, max: 100 })
    .withMessage("El nombre del rector debe tener entre 2 y 100 caracteres"),
  
  body("telefono")
    .optional()
    .isMobilePhone("es-CO")
    .withMessage("El teléfono debe tener un formato válido"),
  
  body("direccion")
    .optional()
    .isLength({ max: 200 })
    .withMessage("La dirección no puede exceder 200 caracteres"),
  
  body("sector")
    .notEmpty()
    .withMessage("El sector es obligatorio")
    .isIn(["público", "privado", "mixto"])
    .withMessage("El sector debe ser: público, privado o mixto")
];

module.exports = {
  institutionValidation
};
