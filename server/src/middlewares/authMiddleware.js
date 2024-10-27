const { body, validationResult } = require("express-validator");

exports.valiidateRegistration = [
  body("email")
    .isEmail()
    .withMessage("Please provide a valid email address")
    .isLength({ max: 255 })
    .withMessage("Email must be 255 characters or less"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long")
    .matches(/\d/)
    .withMessage("Password must contain at least one number")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one uppercase letter")
    .matches(/[a-z]/)
    .withMessage("Password must contain at least one lowercase letter"),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
