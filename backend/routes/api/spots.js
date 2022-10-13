const express = require('express');
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { Spot, User, SpotImage, Review, Booking } = require('../../db/models');
const router = express.Router();


const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { urlencoded } = require('express');


// Get all Spots
router.get('/', async (req, res, next) => {

    const allSpots = await Spot.findAll({
        include: [
            {
                model: Review
            },
            {
                model: SpotImage
            }
        ]

    });

    const newSpots = [];

    allSpots.forEach(ele => {
        
        newSpots.push(ele.toJSON())
    })

    newSpots.forEach(spot => {
        spot.avgRating = spot.Reviews[0].stars;
        spot.previewImage = spot.SpotImages[0].url;
        delete spot.Reviews;
        delete spot.SpotImages
    })
    
    res.json({
        Spot: newSpots


    })
});

//Get all Spots owned by the Current User
router.get('/current', requireAuth,async(req,res,next) =>{
    const currentUser = req.user.id;
    const theSpot = await Spot.findAll({
        include: [
            {
                model: Review
            },
            {
                model: SpotImage
            }
        ],

        where:{
            ownerId:currentUser
        }
    })

    const newSpots = [];

    theSpot.forEach(ele => {
        
        newSpots.push(ele.toJSON())
    })

    newSpots.forEach(spot => {
        spot.avgRating = spot.Reviews[0].stars;
        spot.previewImage = spot.SpotImages[0].url;
        delete spot.Reviews;
        delete spot.SpotImages
    })



    res.json({
        Spots:newSpots
    })
})



module.exports = router;