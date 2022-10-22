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

    const thisReview = await Review.findAll({
        where:{
            userId:currentUser
        },
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
                exclude: ['description','createdAt','updatedAt']
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

    const thisReviewPojo = [];

    thisReview.forEach(review => {
        thisReviewPojo.push(review.toJSON())
    })

    thisReviewPojo.forEach(review => {
        
        const spotImageTable = review.Spot.SpotImages;
        console.log(review)
        if(spotImageTable.length >0){
            if(spotImageTable[0].preview){
                review.Spot.previewImage = spotImageTable[0].url
            }else{
                review.Spot.previewImage = 'no preview image'
            }
        }else{
            review.Spot.previewImage = 'no preview image'
        }
    
        delete review.Spot.SpotImages
    })
  


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

//### Edit a Review

router.put('/:reviewId',requireAuth,async(req,res,next) =>{
    const reviewId = req.params.reviewId;
    const userId = req.user.id;

    const {review,stars} = req.body;


    const theReview = await Review.findByPk(reviewId);

    if(!theReview){
        res.status(404);
        res.json( {
            "message": "Review couldn't be found",
            "statusCode": 404
          })
    }

    if(userId === theReview.userId){
        try {
            theReview.set({
                review:review,
                stars:stars
            })
        
            await theReview.save()
        
            res.json(theReview)

        } catch (error) {
            res.status(400),
            res.json(   {
                "message": "Validation error",
                "statusCode": 400,
                "errors": {
                  "review": "Review text is required",
                  "stars": "Stars must be an integer from 1 to 5",
                }
              })
        }
       
    } else{
        res.status(403);
        res.json( {
            "message": "Forbidden",
            "statusCode": 403
          })
    }  
  
})

//### Delete a Review

router.delete('/:reviewId',requireAuth,async(req,res,next) =>{
    const userId = req.user.id;
    const reviewId = req.params.reviewId;

    const theReview = await Review.findByPk(reviewId);

    if(!theReview){
        res.status(404),
        res.json( {
            "message": "Review couldn't be found",
            "statusCode": 404
          })
    }

    if(theReview.userId === userId){
        await theReview.destroy();
        res.json(  {
            "message": "Successfully deleted",
            "statusCode": 200
          })
    }else{
        res.status(403);
        res.json( {
            "message": "Forbidden",
            "statusCode": 403
          })
    }

})
module.exports = router;