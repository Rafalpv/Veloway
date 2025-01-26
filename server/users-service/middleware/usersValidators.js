import { check, validationResult } from 'express-validator'

const validateRegisterData = [
  check('nickname')
    .isLength({ min: 5, max: 20 })
    .withMessage('El nombre de usuario debe tener entre 5 y 20 caracteres.')
    .isAlphanumeric()
    .withMessage('El nombre de usuario solo puede contener letras y números.'),

  check('email')
    .isEmail()
    .withMessage('Debe proporcionar un correo electrónico válido.'),

  check('password')
    .isLength({ min: 6 })
    .withMessage('La contraseña debe tener al menos 6 caracteres.')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('La contraseña debe incluir al menos una letra mayúscula, una letra minúscula y un número.'),

  check('level')
    .isIn(['beginner', 'intermediate', 'advanced'])
    .withMessage('El nivel debe ser beginner, intermediate o advanced.'),

  // Middleware para manejar errores
  (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: 'error',
        message: 'Errores de validación',
        errors: errors.array()
      })
    }
    next()
  }
]

export default validateRegisterData
