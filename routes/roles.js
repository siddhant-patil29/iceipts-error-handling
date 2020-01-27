var express = require('express');
var router = express.Router();
var rolesService=require('../services/roles-service');
var HttpStatus = require('http-status-codes');
const logger=require('../utils/Logger');

const {roleValidate,schemas}=require('../utils/validator-service');

//delete this route
router.get('/xyz', function(req, res, next) {
  resend("dummy route xyz");  
});

/**
 * @swagger
 * definitions:
 *   Role:
 *     properties:
 *       roleName:
 *         type: string
 *       isDeleted:
 *         type: boolen
 */

/**
 * @swagger
 * /roles:
 *   get:
 *     tags:
 *       - roles
 *     description: Returns all roles
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of roles
 *         schema:
 *           $ref: '#/definitions/Role'
 */
router.get('/', function(req, res, next) {
    logger.debug("router called : Get roles");
    rolesService.getRoles(req).then((result)=>{
        logger.debug("result: ",result);
      res.status(HttpStatus.OK).send(result);
  },(err)=>{
      logger.debug("Error :",err);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err);
  });
});

/**
 * @swagger
 * /roles:
 *   post:
 *     tags:
 *       - roles
 *     description: Creates a new role
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: role
 *         description: roles object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Role'
 *     responses:
 *       200:
 *         description: Successfully created
 */
router.post('/',roleValidate(schemas.rolesSchema),(req,res, next)=>{
    logger.debug("router called : Add role");
    let reqObj={}
    //validate reqObj after setting req value to it
    rolesService.addRole(req).then((result)=>{
        logger.debug("result: ",result);
      res.status(HttpStatus.OK).send(result);
    },(err)=>{
        logger.debug("Error :",err);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err);
    });
})
/**
 * @swagger
 * /roles:
 *   put:
 *     tags:
 *       - roles
 *     description: Updates a new role
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: role
 *         description: roles object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Role'
 *     responses:
 *       200:
 *         description: Successfully Updates
 */

router.put('/',(req,res, next)=>{
    logger.debug("router called : Update role");
    let reqObj={}
    //validate reqObj after setting req value to it
    rolesService.updateRole(req).then((result)=>{
        logger.debug("result: ",result);
      res.status(HttpStatus.OK).send(result);
    },(err)=>{
        logger.debug("Error :",err);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err);
    });
})

/**
 * @swagger
 * /roles/{id}:
 *   delete:
 *     tags:
 *       - roles
 *     description: Deletes a single roles
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: roles id
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Successfully deleted
 */

router.delete('/:id',(req,res, next)=>{
    logger.debug("router called : Delete role");
    
    //validate req 
    rolesService.deleteRole(req).then((result)=>{
        logger.debug("result: ",result);
      res.status(HttpStatus.OK).send(result);
    },(err)=>{
        logger.debug("Error :",err);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err);
    });
})

module.exports = router;
