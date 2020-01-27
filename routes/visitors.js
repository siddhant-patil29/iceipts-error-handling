var express = require('express');
var router = express.Router();
var visitorService = require('../services/visitor-service');
var HttpStatus = require('http-status-codes');
const logger=require('../utils/Logger');

const {visitorValidate,schemas}=require('../utils/validator-service');

/**
 * @swagger
 * definitions:
 *   Visitor:
 *     properties:
 *       emailId:
 *         type: string
 */

/**
 * @swagger
 * /visitor:
 *   post:
 *     tryIts:
 *       - tryIts
 *     description: Creates a new Visitor
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: visitors
 *         description: Visitor object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Visitor'
 *     responses:
 *       200:
 *         description: Successfully created
 */

router.post('/',visitorValidate(schemas.visitorsSchema),(req,res, next)=>{
    //validate Req Object
    logger.debug("router : Add New Interested Visitor");
    visitorService.addVisitor(req).then((result)=>{
        res.status(HttpStatus.OK).send(result);
    },(err)=>{
        logger.error("router error", err);
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err);
    });

},(err)=>{
    logger.error("router error", err);
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err);
});

module.exports = router;
