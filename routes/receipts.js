var express = require('express');
var router = express.Router();
var receiptDao = require('../daos/receipt-dao');
var receiptService = require('../services/receipt-service');
var HttpStatus = require('http-status-codes');
const logger = require('../utils/Logger');
var Multer = require("multer");

const {receiptValidate,schemas}=require('../utils/validator-service');
/* GET Receipts listing. */
router.get('/', (req, res, next)=> {
    logger.debug("router : Get Receipts");
    receiptService.getReceipts(req).then((result)=>{
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
 *   Receipts:
 *     properties:
 *       id:
 *         type: integer
 *       vendor:
 *         type: string
 *       receiptCardBlobUrl:
 *         type: sting
 *       createDate:
 *         type: string
 *       tagId:
 *         type: integer
 *       customerId:
 *         type: integer
 *       IsReimbursible:
 *         type: string
 *       reimbursiblePeriod:
 *         type: string
 *       totalBill:
 *         type: integer
 *       NoOfItems:
 *         type: integer
 *       isDeleted:
 *         type: boolen
 */

// fileName = receipt_receiptid 
// bucketName = userid

/**
 * @swagger
 * /receipts:
 *   get:
 *     tags:
 *       - receipts
 *     description: Returns all receipts
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of receipts
 *         schema:
 *           $ref: '#/definitions/Receipts'
 */

router.post('/', Multer({storage: Multer.memoryStorage()}).single("upload"), (req,res, next)=>{
    //validate Req Object
    console.log("fileName: ", req.file);
    console.log("body test: ", req.body.test);
    logger.debug("router : Add Receipts");
    
    receiptService.addReceipt(req).then((result)=>{
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
 * /receipts:
 *   post:
 *     tags:
 *       - receipts
 *     description: Creates a new receipt
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: receipt
 *         description: receipts object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Receipts'
 *     responses:
 *       200:
 *         description: Successfully created
 */
router.put('/',(req,res,next)=>{
 //validate Req Object
 logger.debug("router : Update Receipts");
    receiptService.updateReceipt(req).then((result)=>{
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
 * /receipts:
 *   put:
 *     tags:
 *       - receipts
 *     description: Updates a new receipts
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: receipt
 *         description: receipts object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Receipts'
 *     responses:
 *       200:
 *         description: Successfully updated
 */

router.delete('/',(req,res,next)=>{
    //validate Req Object
    logger.debug("router : Delete Receipts");
    receiptService.deleteReceipt(req).then((result)=>{
        logger.debug("router success : Get Receipts", result);
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
 * /receipts/{id}:
 *   delete:
 *     tags:
 *       - receipts
 *     description: Deletes a single receipt
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: receipt id
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Successfully deleted
 */

/* Download Receipt. */
router.get('/download/:id', (req, res, next)=> {
    logger.debug("router : Download Receipt");
    receiptService.downloadReceipt(req,res).then((result)=>{
      res.status(HttpStatus.OK).send(result);
    },(err)=>{
        logger.error("router error", err);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err);
    });
}, (err)=>{
    logger.error("router error", err);
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err);
});

module.exports = router;
