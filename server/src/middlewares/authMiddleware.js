const { body, validationResult } = require("express-validator");

const emailValidator = body("email")
  .isEmail()
  .withMessage("Please provide a valid email address")
  .isLength({ max: 255 })
  .withMessage("Email must be 255 characters or less");

const passwordValidator = body("password")
  .isLength({ min: 8 })
  .withMessage("Password must be at least 8 characters long")
  .matches(/\d/)
  .withMessage("Password must contain at least one number")
  .matches(/[A-Z]/)
  .withMessage("Password must contain at least one uppercase letter")
  .matches(/[a-z]/)
  .withMessage("Password must contain at least one lowercase letter");

const simplePasswordValidator = body("password")
  .notEmpty()
  .withMessage("Password is required");

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

exports.validateRegistration = [
  emailValidator,
  passwordValidator,
  handleValidationErrors,
];
exports.validateLogin = [
  emailValidator,
  simplePasswordValidator,
  handleValidationErrors,
];
