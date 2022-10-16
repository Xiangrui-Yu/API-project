const express = require('express');
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { Spot, User, SpotImage, Review, Booking, ReviewImage } = require('../../db/models');
const router = express.Router();


const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { urlencoded } = require('express');

// ### Get all Reviews of the Current User
router.get('/current', requireAuth, async (req, res, next) => {
    const currentUser = req.user.id

    const thisReview = await Review.findOne({
        include: [{
            model: User,
            attributes: {
                exclude: ['username', 'hashedPassword', 'email', 'createdAt', 'updatedAt']
            }
        },
        {
            model:Spot,
            include:{
                model:SpotImage
            },
            attributes:{
                exclude: ['createdAt','updatedAt']
            }
           
        },
        {
            model:ReviewImage,
            attributes:{
                exclude: ['reviewId','createdAt','updatedAt']
            }
        },
        
        ]
    })

    const thisReviewPojo = thisReview.toJSON();

    const spotImageTable = thisReviewPojo.Spot.SpotImages;

    if(spotImageTable){
        if(spotImageTable[0].preview){
            thisReviewPojo.Spot.previewImage = spotImageTable[0].url
        }else{
            thisReviewPojo.Spot.previewImage = 'no preview image'
        }
    }else{
        thisReviewPojo.Spot.previewImage = 'no preview image'
    }

    delete thisReviewPojo.Spot.SpotImages


    res.json({
        Reviews:[thisReviewPojo]
    })
})



module.exports = router;