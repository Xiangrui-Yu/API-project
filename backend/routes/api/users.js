const express = require('express');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');


const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();


// router.post(
//   '/',
//   async (req, res) => {
//     const { email, password, username } = req.body;
//     const user = await User.signup({ email, username, password });

//     await setTokenCookie(res, user);

//     return res.json({
//       user
//     });
//   }
// );

const validateSignup = [
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email.'),
  check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('Please provide a username with at least 4 characters.'),
  check('username')
    .not()
    .isEmail()
    .withMessage('Username cannot be an email.'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  handleValidationErrors
];

router.post(
  '/',
  validateSignup,
  
  async (req, res) => {
    console.log("from sign-up")


    
    try {
      const { firstName,lastName,email, password, username } = req.body;
      const user = await User.signup({ firstName,lastName,email, username, password });
  
      if(User.email.includes(email)){
        res.status(403);
        res.json({
          "message": "User already exists",
          "statusCode": 403,
          "errors": {
            "email": "User with that email already exists"
          }
        })
      };

      const newuser = user.toJSON()
  
      const token =await setTokenCookie(res, user);
  
      newuser.token = token
      delete newuser.createdAt;
      delete newuser.updatedAt;
      return res.json(
        newuser,
        
      );
    } catch (error) {
      res.status(400);
      res.json(  {
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
  
  }
);





module.exports = router;