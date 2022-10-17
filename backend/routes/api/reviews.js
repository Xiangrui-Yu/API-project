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


//### Add an Image to a Review based on the Review's id

router.post('/:reviewId/images',requireAuth,async(req,res,next) =>{
    const userId = req.user.id;
    const reviewId = req.params.reviewId;
    const {url} = req.body;

    const reviewImage = await Review.findByPk((reviewId),{
        include:{
            model:ReviewImage
        }
    })



    if(!reviewImage){
        res.status(404),
        res.json({
            "message": "Review couldn't be found",
            "statusCode": 404
          })
    }

    if(reviewImage.ReviewImages.length >=10){
        res.status(403),
        res.json(  {
            "message": "Maximum number of images for this resource was reached",
            "statusCode": 403
          })
    } 

    if(reviewImage.userId === userId){
        const newImage = await ReviewImage.create({
            reviewId:reviewId,
            url:url
    
        })
        const newImagePojo = newImage.toJSON()
        delete newImagePojo.reviewId;
        delete newImagePojo.updatedAt;
        delete newImagePojo.createdAt;
    
        res.json(newImagePojo)
    }else{
        res.status(403);
        res.json( {
            "message": "Forbidden",
            "statusCode": 403
          })
    }


})



module.exports = router;