const express = require('express');
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { Spot, User, SpotImage, Review, Booking,ReviewImage } = require('../../db/models');
const {Op} = require('sequelize');
const router = express.Router();


const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { urlencoded } = require('express');
const reviewimage = require('../../db/models/reviewimage');






//Delete a Review Image

router.delete('/:imageId', requireAuth, async(req,res,next) => {

    const imageId = req.params.imageId;
    const userId = req.user.id;


    const theImage = await ReviewImage.findByPk((imageId),{
        include:{
            model:Review
        }
    })

    if(!theImage){
        res.status(404)
        return res.json( {
            "message": "Review Image couldn't be found",
            "statusCode": 404
          })
    }
    
    console.log(theImage)

    if(theImage.Review.userId === userId){
        await theImage.destroy();
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