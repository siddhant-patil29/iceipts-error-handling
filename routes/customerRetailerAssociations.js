var express = require('express');
var router = express.Router();
var customerRetailerAssociationService=require('../services/customer-retailer-association-service');
var HttpStatus = require('http-status-codes');
const logger=require('../utils/Logger');

const {crmValidate,schemas}=require('../utils/validator-service');
/* GET customerRetailerAssociations listing. */
router.get('/', (req, res, next)=> {
    logger.debug("router : Get CustomerRetailerAssociations");
    customerRetailerAssociationService.getCustomerRetailerAssociations(req).then((result)=>{
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
 *   CustomerRetailerAssociation:
 *     properties:
 *       id:
 *         type: integer
 *       customerId:
 *         type: string
 *       retailerId:
 *         type: string
 *       balance:
 *         type: float
 *       notificationAfter:
 *         type: string
 *       loyalty:
 *         type: string
 *       currency:
 *         type: strin
 *       isDeleted:
 *         type: boolean
 */

/**
 * @swagger
 * /customerRetailerAssociations:
 *   get:
 *     tags:
 *       - customerRetailerAssociations
 *     description: Return all customerRetailerAssociations
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of customerRetailerAssociation
 *         schema:
 *           $ref: '#/definitions/CustomerRetailerAssociation'
 */

router.post('/',crmValidate(schemas.craSchema),(req,res, next)=>{
    //validate Req Object
    logger.debug("router : Add CustomerRetailerAssociations");
    customerRetailerAssociationService.addCustomerRetailerAssociation(req).then((result)=>{
        res.status(HttpStatus.OK).send(result);
    },(err)=>{
        console.log(err);
        logger.error("router error", err);
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err);
    });

},(err)=>{
    logger.error("router error", err);
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err);
});

/**
 * @swagger
 * /customerRetailerAssociations:
 *   post:
 *     tags:
 *       - customerRetailerAssociations
 *     description: Creates a new customerRetailerAssociation
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: customerRetailerAssociation
 *         description: customerRetailerAssociations object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/CustomerRetailerAssociation'
 *     responses:
 *       200:
 *         description: Successfully created
 */

router.put('/',(req,res,next)=>{
 //validate Req Object
 logger.debug("router : Update CustomerRetailerAssociations");
    customerRetailerAssociationService.updateCustomerRetailerAssociation(req).then((result)=>{
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
 * /customerRetailerAssociations:
 *   put:
 *     tags:
 *       - customerRetailerAssociations
 *     description: Updates a new customerRetailerAssociation
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: customerRetailerAssociation
 *         description: customerRetailerAssociations object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/CustomerRetailerAssociation'
 *     responses:
 *       200:
 *         description: Successfully updated
 */

router.delete('/:id',(req,res,next)=>{
    //validate Req Object
    logger.debug("router : Delete CustomerRetailerAssociations");
    customerRetailerAssociationService.deleteCustomerRetailerAssociation(req).then((result)=>{
        logger.debug("router success : Get CustomerRetailerAssociations", result);
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
 * /customerRetailerAssociations/{id}:
 *   delete:
 *     tags:
 *       - customerRetailerAssociations
 *     description: Deletes a single customerRetailerAssociation
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: customerRetailerAssociation id
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Successfully deleted
 */

module.exports = router;
