var express = require('express');
var router = express.Router();
var warrantiesService = require('../services/warranty-service');
var HttpStatus = require('http-status-codes');
const logger=require('../utils/Logger');

const {warrantiesValidate,schemas}=require('../utils/validator-service');

/* GET Warranty listing. */
router.get('/', (req, res, next)=> {
    logger.debug("router : Get all Warranties");
    warrantiesService.getWarranties(req).then((result)=>{
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
 *   Warranties:
 *     properties:
 *       id:
 *         type: integer
 *       warrantyPeriodRemain:
 *         type: integer
 *       notificationId:
 *         type: integer
 *       isDeleted:
 *         type: boolen
 */

/**
 * @swagger
 * /warranties:
 *   get:
 *     tags:
 *       - warranties
 *     description: Returns all warranties
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of warranties
 *         schema:
 *           $ref: '#/definitions/Warranties'
 */

router.post('/',warrantiesValidate(schemas.warrantiesSchema),(req,res, next)=>{
    //validate Req Object
    logger.debug("router : Add Warranty");
    warrantiesService.addWarranty(req).then((result)=>{
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
 * /warranties:
 *   post:
 *     tags:
 *       - warranties
 *     description: Creates a new warranties
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: warranties
 *         description: warranties object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Warranties'
 *     responses:
 *       200:
 *         description: Successfully created
 */
router.put('/',(req,res,next)=>{
 //validate Req Object
 logger.debug("router : Update Warranty---  ", req.body   );
 warrantiesService.updateWarranty(req).then((result)=>{
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
 * /warranties:
 *   put:
 *     tags:
 *       - warranties
 *     description: Updates a warranties
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: warranties
 *         description: warranties object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Warranties'
 *     responses:
 *       200:
 *         description: Successfully Updates
 */
router.delete('/:id',(req,res,next)=>{
    //validate Req Object
    logger.debug("router : Delete Warranty");
    warrantiesService.deleteWarranty(req).then((result)=>{
        logger.debug("router success : delete Warranty", result);
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
 * /warranties/{id}:
 *   delete:
 *     tags:
 *       - warranties
 *     description: Deletes a single warranties
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: warranties id
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Successfully deleted
 */
module.exports = router;
