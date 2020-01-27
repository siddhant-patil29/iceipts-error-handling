var express = require('express');
var router = express.Router();
var bidsService = require('../services/bid-service');
var HttpStatus = require('http-status-codes');
const logger=require('../utils/Logger');

const {bidsValidates,schemas}=require('../utils/validator-service');
/* GET Bid listing. */
router.get('/', (req, res, next)=> {
    logger.debug("router : Get all Bids");
    bidsService.getBids(req).then((result)=>{
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
 *   Bids:
 *     properties:
 *       id:
 *         type: integer
 *       bidDate:
 *         type: string
 *       amount:
 *         type: integer
 *       bidBy:
 *         type: integer
 *       bidFor:
 *         type: integer
 *       notificationId:
 *         type: integer
 *       returnPeriod:
 *         type: string
 *       isDeleted:
 *         type: boolen
 */

/**
 * @swagger
 * /bids:
 *   get:
 *     tags:
 *       - bids
 *     description: Returns all bids
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of bids
 *         schema:
 *           $ref: '#/definitions/Bids'
 */

router.post('/',bidsValidates(schemas.bidsSchema),(req,res, next)=>{
    //validate Req Object
    logger.debug("router : Add Bid");
    bidsService.addBid(req).then((result)=>{
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
 * /bids:
 *   post:
 *     tags:
 *       - bids
 *     description: Creates a new bid
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: bid
 *         description: bids object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Bids'
 *     responses:
 *       200:
 *         description: Successfully created
 */
router.put('/',(req,res,next)=>{
 //validate Req Object
 logger.debug("router : Update Bid---  ", req.body   );
 bidsService.updateBid(req).then((result)=>{
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
 * /bids:
 *   put:
 *     tags:
 *       - bids
 *     description: Updates a new bid
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: bid
 *         description: bids object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Bids'
 *     responses:
 *       200:
 *         description: Successfully Updates
 */

router.delete('/:id',(req,res,next)=>{
    //validate Req Object
    logger.debug("router : Delete Bid");
    bidsService.deleteBid(req).then((result)=>{
        logger.debug("router success : delete Bid", result);
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
 * /bids/{id}:
 *   delete:
 *     tags:
 *       - bids
 *     description: Deletes a single bids
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: bids id
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Successfully deleted
 */
module.exports = router;
