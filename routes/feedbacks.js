var express = require('express');
var router = express.Router();
var feedbacksService = require('../services/feedback-service');
var HttpStatus = require('http-status-codes');
const logger=require('../utils/Logger');

const {feedbackValidate,schemas}=require('../utils/validator-service');

/* GET Feedback listing. */
router.get('/', (req, res, next)=> {
    logger.debug("router : Get all Feedbacks");
    feedbacksService.getFeedbacks(req).then((result)=>{
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
 *   Feedbacks:
 *     properties:
 *       id:
 *         type: integer
 *       description:
 *         type: string
 *       rating:
 *         type: string
 *       userId:
 *         type: integer
 *       notificationId:
 *         type: integer
 *       isDeleted:
 *         type: boolen
 */

/**
 * @swagger
 * /feedbacks:
 *   get:
 *     tags:
 *       - feedbacks
 *     description: Returns all feedbacks
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of feedbacks
 *         schema:
 *           $ref: '#/definitions/feedbacks'
 */

router.post('/',feedbackValidate(schemas.feedbackSchema),(req,res, next)=>{
    //validate Req Object
    logger.debug("router : Add Feedback");
    feedbacksService.addFeedback(req).then((result)=>{
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
 * /feedbacks:
 *   post:
 *     tags:
 *       - feedbacks
 *     description: Creates a new feedback
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: feedback
 *         description: feedback object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Feedbacks'
 *     responses:
 *       200:
 *         description: Successfully created
 */
router.put('/',(req,res,next)=>{
 //validate Req Object
 logger.debug("router : Update Feedback---  ", req.body   );
 feedbacksService.updateFeedback(req).then((result)=>{
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
 * /feedbacks:
 *   put:
 *     tags:
 *       - feedbacks
 *     description: Updates a new feedback
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: feedback
 *         description: feedback object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Feedbacks'
 *     responses:
 *       200:
 *         description: Successfully Updates
 */
router.delete('/:id',(req,res,next)=>{
    //validate Req Object
    logger.debug("router : Delete Feedback");
    feedbacksService.deleteFeedback(req).then((result)=>{
        logger.debug("router success : delete Feedback", result);
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
 * /feedbacks/{id}:
 *   delete:
 *     tags:
 *       - feedbacks
 *     description: Deletes a single feedbacks
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: feedbacks id
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Successfully deleted
 */
module.exports = router;
