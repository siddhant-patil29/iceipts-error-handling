var express = require('express');
var router = express.Router();
var transactionHistoryService=require('../services/transaction-history-service');
var HttpStatus = require('http-status-codes');
const logger=require('../utils/Logger');

const {transactionHistoriesValidate,schemas}=require('../utils/validator-service');


/**
 * @swagger
 * definitions:
 *   TransactionHistory:
 *     properties:
 *       id:
 *         type: uuid
 *       customerId:
 *         type: string
 *       retailerId:
 *         type: string
 *       receiptId:
 *         type: string
 *       transactionAmount:
 *         type: string
 *       paidAmount:
 *         type: string
 *       isDeleted:
 *         type: boolean
 */

/**
 * @swagger
 * /transaction-history:
 *   get:
 *     tags:
 *       - transaction-history
 *     description: Return all transaction-histories
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of transaction-history
 *         schema:
 *           $ref: '#/definitions/TransactionHistory'
 */

/* GET TransactionHistory listing. */
router.get('/', (req, res, next)=> {
    logger.debug("router : Get TransactionHistorys");
    transactionHistoryService.getTransactionHistory(req).then((result)=>{
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
 * /transaction-history:
 *   post:
 *     tags:
 *       - transaction-history
 *     description: Creates a new transaction-history
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: TransactionHistory
 *         description: transaction-history object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/TransactionHistory'
 *     responses:
 *       200:
 *         description: Successfully created
 */

router.post('/',transactionHistoriesValidate(schemas.transactionHistoriesSchema),(req,res, next)=>{
    //validate Req Object
    logger.debug("router : Add TransactionHistorys");
    transactionHistoryService.addTransactionHistory(req).then((result)=>{
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
 * /transaction-history:
 *   put:
 *     tags:
 *       - transaction-history
 *     description: Updates a new transaction-history
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: TransactionHistory
 *         description: transaction-history object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/TransactionHistory'
 *     responses:
 *       200:
 *         description: Successfully updated
 */

router.put('/',(req,res,next)=>{
 //validate Req Object
 logger.debug("router : Update TransactionHistories");
 transactionHistoryService.updateTransactionHistory(req).then((result)=>{
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
 * /transaction-history/{id}:
 *   delete:
 *     tags:
 *       - transaction-history
 *     description: Deletes a single transaction-history
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: transaction-history id
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Successfully deleted
 */
router.delete('/:id',(req,res,next)=>{
    //validate Req Object
    logger.debug("router : Delete TransactionHistories");
    transactionHistoryService.deleteTransactionHistory(req).then((result)=>{
        logger.debug("router success : Get TransactionHistories", result);
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
