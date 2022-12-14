// backend/utils/validation.js
const { validationResult } = require('express-validator');

// middleware for formatting errors from express-validator middleware
// (to customize, see express-validator's documentation)
const handleValidationErrors = (req, _res, next) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    const errors = validationErrors
      .array()
      .map((error) => `${error.msg}`);

    const err = Error('Bad request.');
    err.errors = errors;
    err.status = 400;
    err.title = 'Bad request.';
    next(err);
    // _res.status(400);
    // _res.json({
    //   "message": "Validation error",
    //   "statusCode": 400,
    //   "errors": {
    //     "credential": "Email or username is required",
    //     "password": "Password is required"
    //   }
    // })
  }
  next();
};

const logInError = (err,req,res,next) =>{
  res.status(400);
  res.json({
    "message": "Validation error",
    "statusCode": 400,
    "errors": {
      "credential": "Email or username is required",
      "password": "Password is required"
    }
  })
}

const signUpError = (err,req,res,next) => {
  res.status(400);
  res.json( {
    "message": "Validation error",
    "statusCode": 400,
    "errors": {
      "email": "Invalid email",
      "username": "Username is required",
      "firstName": "First Name is required",
      "lastName": "Last Name is required"
    }
  })
}


module.exports = {
  handleValidationErrors,
  logInError,
  signUpError
};