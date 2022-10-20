const express = require('express');
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { Spot, User, SpotImage, Review, Booking, ReviewImage,SpotImages } = require('../../db/models');
const router = express.Router();


const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { urlencoded } = require('express');





//### Delete a Spot Image

router.delete('/:imageId',requireAuth,async(req,res,next) => {
    const imageId = req.params.imageId;
    const userId = req.user.id;

    const thespotImage = await SpotImage.findByPk((imageId),{
        include:{
            model:Spot
        }
    });

    console.log(thespotImage)


    if(!thespotImage){
        res.status(404)
        return res.json({
            "message": "Spot Image couldn't be found",
            "statusCode": 404
          })
    }

    if(thespotImage.Spot.ownerId === userId){
        await thespotImage.destroy();
        res.json({
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