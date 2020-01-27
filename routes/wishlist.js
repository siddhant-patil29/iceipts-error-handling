var express = require('express');
var router = express.Router();
var wishlistDao=require('../daos/wishlist-dao');
var wishlistServices=require('../services/wishlist-services');
var HttpStatus = require('http-status-codes');
const logger=require('../utils/Logger');

const {wishlistValidate,schemas}=require('../utils/validator-service');

/* GET Wishlist listing. */
router.get('/', (req, res, next)=> {
    logger.debug("router : Get Wishlist");
    wishlistServices.getWishlists(req).then((result)=>{
      res.status(HttpStatus.OK).send(result);
    },(err)=>{
        logger.error("router error", err);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err);
    });
}, (err)=>{
    logger.error("router error", err);
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err);
});
/**
 * @swagger
 * definitions:
 *   Wishlist:
 *     properties:
 *       id:
 *         type: integer
 *       itemName:
 *         type: string
 *       budgetMin:
 *         type: integer
 *       budgetMax:
 *         type: integer
 *       wishlistedBy:
 *         type: integer
 *       notificationId:
 *         type: integer
 *       isDeleted:
 *         type: boolen
 */

/**
 * @swagger
 * /wishlist:
 *   get:
 *     tags:
 *       - wishlist
 *     description: Returns all wishlist
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of wishlist
 *         schema:
 *           $ref: '#/definitions/wishlist'
 */

router.post('/',wishlistValidate(schemas.wishListSchema),(req,res, next)=>{
    //validate Req Object
    logger.debug("router : Add Wishlist");
    wishlistServices.addWishlist(req).then((result)=>{
        res.status(HttpStatus.OK).send(result);
    },(err)=>{
        logger.error("router error", err);
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err);
    });

},(err)=>{
    logger.error("router error", err);
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err);
});
/**
 * @swagger
 * /wishlist:
 *   post:
 *     tags:
 *       - wishlist
 *     description: Creates a new wishlist
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: wishlist
 *         description: wishlist object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Wishlist'
 *     responses:
 *       200:
 *         description: Successfully created
 */

router.put('/',(req,res,next)=>{
 //validate Req Object
 logger.debug("router : Update Wishlist---  ", req.body   );
 wishlistServices.updateWishlist(req).then((result)=>{
        res.status(HttpStatus.OK).send(result);
    },(err)=>{
        logger.error("router error", err);
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err);
    });
},(err)=>{
    logger.error("router error", err);
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err);
});
/**
 * @swagger
 * /wishlist:
 *   put:
 *     tags:
 *       - wishlist
 *     description: Updates wishlist
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: wishlist
 *         description: wishlist object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Wishlist'
 *     responses:
 *       200:
 *         description: Successfully updated
 */
router.delete('/:id',(req,res,next)=>{
    //validate Req Object
    logger.debug("router : Delete Wishlist");
    wishlistServices.deleteWishlist(req).then((result)=>{
        logger.debug("router success : Get Wishlist", result);
        res.status(HttpStatus.OK).send(result);
    },(err)=>{
        logger.error("router error", err);
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err);
    });
},(err)=>{
    logger.error("router error", err);
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err);
});
/**
 * @swagger
 * /wishlist/{id}:
 *   delete:
 *     tags:
 *       - wishlist
 *     description: Deletes a single wishlist
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: wishlist id
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Successfully deleted
 */
module.exports = router;
