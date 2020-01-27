var express = require('express');
var router = express.Router();
var tagsService = require('../services/tags-service');
var HttpStatus = require('http-status-codes');
const logger=require('../utils/Logger');

const {tagValidate,schemas}=require('../utils/validator-service');

/* GET Tag listing. */
router.get('/', (req, res, next)=> {
    logger.debug("router : Get all Tags");
    tagsService.getTags(req).then((result)=>{
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
 *   Tags:
 *     properties:
 *       id:
 *         type: integer
 *       tagName:
 *         type: string
 *       userId:
 *         type: integer
 *       isDeleted:
 *         type: boolen
 */

/**
 * @swagger
 * /tags:
 *   get:
 *     tags:
 *       - tags
 *     description: Returns all tags
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of tags
 *         schema:
 *           $ref: '#/definitions/Tags'
 */

router.post('/',tagValidate(schemas.tagsSchema),(req,res, next)=>{
    //validate Req Object
    logger.debug("router : Add Tag");
    tagsService.addTag(req).then((result)=>{
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
 * /tags:
 *   post:
 *     tags:
 *       - tags
 *     description: Creates a new tags
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: tags
 *         description: tags object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Tags'
 *     responses:
 *       200:
 *         description: Successfully created
 */

router.put('/',(req,res,next)=>{
 //validate Req Object
 logger.debug("router : Update Tag---  ", req.body   );
 tagsService.updateTag(req).then((result)=>{
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
 * /tags:
 *   put:
 *     tags:
 *       - tags
 *     description: updated tags
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: tags
 *         description: tags object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Tags'
 *     responses:
 *       200:
 *         description: Successfully updated
 */
router.delete('/:id',(req,res,next)=>{
    //validate Req Object
    logger.debug("router : Delete Tag");
    tagsService.deleteTag(req).then((result)=>{
        logger.debug("router success : delete Tag", result);
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
 * /tags/{id}:
 *   delete:
 *     tags:
 *       - tags
 *     description: Deletes a single tags
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: tags id
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Successfully deleted
 */
module.exports = router;
