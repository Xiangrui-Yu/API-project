const express = require('express');
const { setTokenCookie, restoreUser } = require('../../utils/auth');
const {Spot,User,SpotImage,Review,Booking} = require('../../db/models');
const router = express.Router();


const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');



router.get('/',async(req,res,next) =>{

    
    const allSpots = await Spot.findAll({
    });    


    res.json(allSpots)
})



module.exports = router;