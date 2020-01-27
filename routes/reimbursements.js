var express = require('express');
var router = express.Router();
var reimbursementDao = require('../daos/reimbursement-dao');
var reimbursementService = require('../services/reimbursement-service');
var HttpStatus = require('http-status-codes');
const logger=require('../utils/Logger');

const {reimbrusementValidate,schemas}=require('../utils/validator-service');

/* GET Reimbursements listing. */
router.get('/', (req, res, next)=> {
    logger.debug("router : Get all Reimbursements");
    reimbursementService.getReimbursements(req).then((result)=>{
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
 *   Reimbursements:
 *     properties:
 *       id:
 *         type: integer
 *       receiptId:
 *         type: integer
 *       reimbursementPeriod:
 *         type: string
 *       notificationId:
 *         type: integer
 *       isDeleted:
 *         type: boolen
 */

/**
 * @swagger
 * /reimbursements:
 *   get:
 *     tags:
 *       - reimbursements
 *     description: Returns all reimbursements
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of reimbursements
 *         schema:
 *           $ref: '#/definitions/Reimbursements'
 */

router.post('/',reimbrusementValidate(schemas.reimbursementsSchema),(req,res, next)=>{
    //validate Req Object
    logger.debug("router : Add Reimbursement");
    reimbursementService.addReimbursement(req).then((result)=>{
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
 * /reimbursements:
 *   post:
 *     tags:
 *       - reimbursements
 *     description: Creates a new user
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: reimbursements
 *         description: reimbursements object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Reimbursements'
 *     responses:
 *       200:
 *         description: Successfully created
 */
router.put('/',(req,res, next)=>{
    logger.debug("router called : Update updateReimbursement");
    let reqObj={}
    //validate reqObj after setting req value to it
    reimbursementService.updateReimbursement(req).then((result)=>{
        logger.debug("result: ",result);
      res.status(HttpStatus.OK).send(result);
    },(err)=>{
        logger.debug("Error :",err);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err);
    });
})
/**
 * @swagger
 * /reimbursements:
 *   put:
 *     tags:
 *       - reimbursements
 *     description: Updates a new reimbursements
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: reimbursements
 *         description: reimbursements object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Reimbursements'
 *     responses:
 *       200:
 *         description: Successfully Updates
 */
router.delete('/:id',(req,res,next)=>{
    //validate Req Object
    logger.debug("router : Delete Reimbursement");
    reimbursementService.deleteReimbursement(req).then((result)=>{
        logger.debug("router success : delete Reimbursement", result);
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
 * /reimbursements/{id}:
 *   delete:
 *     tags:
 *       - reimbursements
 *     description: Deletes a single reimbursements
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: reimbursements id
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Successfully deleted
 */
module.exports = router;
