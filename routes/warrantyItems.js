var express = require('express');
var router = express.Router();
var warrantyItemsService = require('../services/warrantyItem-service');
var HttpStatus = require('http-status-codes');
const logger=require('../utils/Logger');

const {warrantyItemValidate,schemas}=require('../utils/validator-service');
/* GET WarrantyItem listing. */
router.get('/', (req, res, next)=> {
    logger.debug("router : Get all WarrantyItems");
    warrantyItemsService.getWarrantyItems(req).then((result)=>{
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
 *   WarrantyItems:
 *     properties:
 *       id:
 *         type: integer
 *       productId:
 *         type: integer
 *       productName:
 *         type: sting
 *       price:
 *         type: integer
 *       warrantyPeriod:
 *         type: date
 *       returnPeriod:
 *         type: date
 *       warrantryCard:
 *         type: blob
 *       receiptId:
 *         type: integer
 *       notificationId:
 *         type: integer
 *       NoOfItems:
 *         type: integer
 *       isDeleted:
 *         type: boolen
 */

/**
 * @swagger
 * /warrantyItems:
 *   get:
 *     tags:
 *       - warrantyItems
 *     description: Returns all warrantyItems
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of warrantyItems
 *         schema:
 *           $ref: '#/definitions/warrantyItems'
 */
// router.post('/',(req,res, next)=>{
//     //validate Req Object
//     logger.debug("router : Add WarrantyItem");
//     warrantyItemsService.addWarrantyItem(req).then((result)=>{
//         res.status(HttpStatus.OK).send(result);
//     },(err)=>{
//         logger.error("router error", err);
//         res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err);
//     });

// },(err)=>{
//     logger.error("router error", err);
//     res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err);
// });
// /**
//  * @swagger
//  * /warrantyItems:
//  *   post:
//  *     tags:
//  *       - warrantyItems
//  *     description: Creates a new warrantyItems
//  *     produces:
//  *       - application/json
//  *     parameters:
//  *       - name: warrantyItems
//  *         description: warrantyItems object
//  *         in: body
//  *         required: true
//  *         schema:
//  *           $ref: '#/definitions/WarrantyItems'
//  *     responses:
//  *       200:
//  *         description: Successfully created
//  */

/**
 * @swagger
 * /warrantyItems:
 *   post:
 *     tags:
 *       - warrantyItems
 *     description: Add list of warrantyItems
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: warrantyItemsArray
 *         description: warrantyItemLists object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/WarrantyItems'
 *     responses:
 *       200:
 *         description: Successfully created
 */
router.post('/',warrantyItemValidate(schemas.warrantyItemValidate),(req,res, next)=>{
    //validate Req Object
    logger.debug("router : Add WarrantyItems");
    warrantyItemsService.addWarrantyItemList(req).then((result)=>{
        res.status(HttpStatus.OK).send(result);
    },(err)=>{
        logger.error("router error", err);
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err);
    });

},(err)=>{
    logger.error("router error", err);
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err);
});

router.put('/',(req,res,next)=>{
 //validate Req Object
 logger.debug("router : Update WarrantyItem---  ", req.body   );
 warrantyItemsService.updateWarrantyItem(req).then((result)=>{
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
 * /warrantyItems:
 *   put:
 *     tags:
 *       - warrantyItems
 *     description: Updates warrantyItems
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: warrantyItems
 *         description: warrantyItems object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/WarrantyItems'
 *     responses:
 *       200:
 *         description: Successfully Updates
 */
router.delete('/:id',(req,res,next)=>{
    //validate Req Object
    logger.debug("router : Delete WarrantyItem");
    warrantyItemsService.deleteWarrantyItem(req).then((result)=>{
        logger.debug("router success : delete WarrantyItem", result);
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
 * /warrantyItems/{id}:
 *   delete:
 *     tags:
 *       - warrantyItems
 *     description: Deletes a single warrantyItems
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: warrantyItems id
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Successfully deleted
 */
module.exports = router;
