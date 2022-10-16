const express = require('express');
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { Spot, User, SpotImage, Review, Booking } = require('../../db/models');
const router = express.Router();


const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { urlencoded } = require('express');


router.get('/current',requireAuth,async(req,res,next) => {
    res.json({})
})



module.exports = router;