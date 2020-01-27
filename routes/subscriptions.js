var express = require('express');
var router = express.Router();
var subscriptionsService = require('../services/subscription-service');
var HttpStatus = require('http-status-codes');
const logger=require('../utils/Logger');

const {subscriptionValidate,schemas}=require('../utils/validator-service');

/* GET Subscription listing. */
router.get('/', (req, res, next)=> {
    logger.debug("router : Get all Subscriptions");
    subscriptionsService.getSubscriptions(req).then((result)=>{
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
 *   Subscriptions:
 *     properties:
 *       id:
 *         type: integer
 *       type:
 *         type: string
 *       description:
 *         type: string
 *       rechargeOn:
 *         type: string
 *       validity:
 *         type: string
 *       fee:
 *         type: integer
 *       notificationId:
 *         type: integer
 *       subscriberId:
 *         type: integer
 *       isDeleted:
 *         type: boolen
 */

/**
 * @swagger
 * /subscriptions:
 *   get:
 *     tags:
 *       - subscriptions
 *     description: Returns all subscriptions
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of subscriptions
 *         schema:
 *           $ref: '#/definitions/subscriptions'
 */

router.post('/',subscriptionValidate(schemas.subscriptionsSchema),(req,res, next)=>{
    //validate Req Object
    logger.debug("router : Add Subscription");
    subscriptionsService.addSubscription(req).then((result)=>{
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
 * /subscriptions:
 *   post:
 *     tags:
 *       - subscriptions
 *     description: Creates a new subscriptions
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: subscriptions
 *         description: subscriptions object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Subscriptions'
 *     responses:
 *       200:
 *         description: Successfully created
 */
router.put('/',(req,res,next)=>{
 //validate Req Object
 logger.debug("router : Update Subscription---  ", req.body   );
 subscriptionsService.updateSubscription(req).then((result)=>{
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
 * /subscriptions:
 *   put:
 *     tags:
 *       - subscriptions
 *     description: Updates a subscriptions
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: subscriptions
 *         description: subscriptions object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Subscriptions'
 *     responses:
 *       200:
 *         description: Successfully Updates
 */
router.delete('/:id',(req,res,next)=>{
    //validate Req Object
    logger.debug("router : Delete Subscription");
    subscriptionsService.deleteSubscription(req).then((result)=>{
        logger.debug("router success : delete Subscription", result);
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
 * /subscriptions/{id}:
 *   delete:
 *     tags:
 *       - subscriptions
 *     description: Deletes a single subscriptions
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: subscriptions id
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Successfully deleted
 */
module.exports = router;
