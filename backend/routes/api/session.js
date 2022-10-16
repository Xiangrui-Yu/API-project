// backend/routes/api/session.js
const express = require('express');

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models');
const router = express.Router();

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');





// router.post(
//     '/',
//     async (req, res, next) => {
//       const { credential, password } = req.body;

//       const user = await User.login({ credential, password });

//       if (!user) {
//         const err = new Error('Login failed');
//         err.status = 401;
//         err.title = 'Login failed';
//         err.errors = ['The provided credentials were invalid.'];
//         return next(err);
//       }

//       await setTokenCookie(res, user);

//       return res.json({
//         user,

//       });
//     }
//   );


router.delete(
  '/',
  (_req, res) => {
    res.clearCookie('token');
    return res.json({ message: 'success' });
  }
);

router.get(
  '/',
  restoreUser,
  (req, res) => {
    const { user } = req;

    if(!user){
      res.status(401);
      res.json({
        "message": "Invalid credentials",
        "statusCode": 401
      })
    }
    const newuser = user.toJSON()
    delete newuser.createdAt;
    delete newuser.updatedAt;

    if (newuser) {
      return res.json(
        newuser
      );
    } else return res.json({});
  }
);


const validateLogin = [
  check('credential')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Please provide a valid email or username.'),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a password.'),
  handleValidationErrors
];

router.post(
  '/',
  validateLogin,
  async (req, res, next) => {
    const { credential, password } = req.body;

    const olduser = await User.login({ credential, password });

    if(credential === null ||password === null){
      res.status(400);
      res.json( {
        "message": "Validation error",
        "statusCode": 400,
        "errors": {
          "credential": "Email or username is required",
          "password": "Password is required"
        }
      })

    }

    if (!olduser) {
      // const err = new Error('Login failed');
      // err.status = 401;
      // err.title = 'Login failed';
      // err.errors = ['The provided credentials were invalid.'];
      // return next(err);
      res.status(401);
      res.json({
        "message": "Invalid credentials",
        "statusCode": 401
      })
    }


    const token = await setTokenCookie(res, olduser);
    console.log(token);
    const user = olduser.toJSON();
    user.token = token;

    delete user.createdAt;
    delete user.updatedAt

    return res.json(
      user
    );


  }
);


module.exports = router;