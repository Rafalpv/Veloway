import { body, validationResult } from 'express-validator'

export const validateLoginInput = [
  body('nickname').isString().withMessage('Nickname is required').notEmpty(),
  body('password').isString().withMessage('Password is required').notEmpty(),
  (req, res, next) => {
    const error = validationResult(req)
    if (!error.isEmpty()) {
      return res.status(400).json({ error: error.array() })
    }
    next()
  }
]

export default validateLoginInput
