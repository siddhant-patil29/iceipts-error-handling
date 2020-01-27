var express = require('express');
var router = express.Router();
var serviceDao = require('../daos/services-dao');
var serviceRequestService = require('../services/service-request-service');
var HttpStatus = require('http-status-codes');
const logger = require('../utils/Logger');

const {serviceValidate,schemas}=require('../utils/validator-service');

/* GET services listing. */
router.get('/', (req, res, next)=> {
    logger.debug("router : Get Service Request");
    serviceRequestService.getServiceRequests(req).then((result)=>{
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
 *   ServiceRequests:
 *     properties:
 *       id:
 *         type: integer
 *       type:
 *         type: string
 *       description:
 *         type: string
 *       priority:
 *         type: integer
 *       requestDate:
 *         type: string
 *       notification:
 *         type: string
 *       requestorId:
 *         type: integer
 *       warrantryItemId:
 *         type: integer
 *       isDeleted:
 *         type: boolen
 */

/**
 * @swagger
 * /service-requests:
 *   get:
 *     tags:
 *       - serviceRequests
 *     description: Returns all serviceRequests
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of serviceRequests
 *         schema:
 *           $ref: '#/definitions/serviceRequests'
 */
router.post('/',serviceValidate(schemas.serviceRequestSchema),(req,res, next)=>{
    //validate Req Object
    logger.debug("router : Add Service Request");
    serviceRequestService.addServiceRequest(req).then((result)=>{
        console.log("res")
        res.status(HttpStatus.OK).send(result);
    },(err)=>{
        logger.error("router error", err);
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err);
    }).catch(err=>
        console.log("errr--- route--- ", err));

},(err)=>{
    logger.error("router error", err);
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err);
});
/**
 * @swagger
 * /service-requests:
 *   post:
 *     tags:
 *       - serviceRequests
 *     description: Creates a new serviceRequests
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: serviceRequests
 *         description: serviceRequests object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/ServiceRequests'
 *     responses:
 *       200:
 *         description: Successfully created
 */

router.put('/',(req,res,next)=>{
 //validate Req Object
 logger.debug("router : Update Service Request");
 serviceRequestService.updateServiceRequest(req).then((result)=>{
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
 * /service-requests:
 *   put:
 *     tags:
 *       - serviceRequests
 *     description: Updates a serviceRequests
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: serviceRequests
 *         description: serviceRequests object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/ServiceRequests'
 *     responses:
 *       200:
 *         description: Successfully Updates
 */

router.delete('/:id',(req,res,next)=>{
    //validate Req Object
    logger.debug("router : Delete Service Request");
    serviceRequestService.deleteServiceRequest(req).then((result)=>{
        logger.debug("router success : Get Service Request", result);
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
 * /service-requests/{id}:
 *   delete:
 *     tags:
 *       - serviceRequests
 *     description: Deletes a single serviceRequests
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: serviceRequest id
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Successfully deleted
 */
module.exports = router;
