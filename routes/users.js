var express = require('express');
var router = express.Router();
var usersDao = require('../daos/users-dao');
var userService=require('../services/user-service');
var HttpStatus = require('http-status-codes');
const logger=require('../utils/Logger');

const {userValidate,schemas}=require('../utils/validator-service');



/* GET users listing. */
//router.get('/:pageNumber/:pageSize', (req, res, next)=> {
router.get('/', (req, res, next)=> {
   // logger.debug("router : Get Users");
      //console.log(req.params.pageNumber);
      userService.getUsers(req).then((result)=>{
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
 *   User:
 *     properties:
 *       id:
 *         type: integer
 *       email:
 *         type: string
 *       password:
 *         type: string
 *       mobileNumber:
 *         type: string
 *       name:
 *         type: string
 *       address:
 *         type: string
 *       district:
 *         type: string
 *       state:
 *         type: string
 *       pin:
 *         type: string
 *       gstin:
 *         type: string
 *       currency:
 *         type: string
 *       loyalty:
 *         type: string
 *       roleName:
 *         type: string
 *       isDeleted:
 *         type: boolean
 */

/**
 * @swagger
 * /users:
 *   get:
 *     tags:
 *       - users
 *     description: Return all users
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of user
 *         schema:
 *           $ref: '#/definitions/users'
 */

router.post('/',userValidate(schemas.usersSchema),(req,res, next)=>{
    //validate Req Object
    logger.debug("router : Add Users");
    userService.addUser(req).then((result)=>{
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
 * /users:
 *   post:
 *     tags:
 *       - users
 *     description: Creates a new user
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: user
 *         description: users object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/User'
 *     responses:
 *       200:
 *         description: Successfully created
 */

router.put('/',(req,res,next)=>{
 //validate Req Object
 logger.debug("router : Update Users");
    userService.updateUser(req).then((result)=>{
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
 * /users:
 *   put:
 *     tags:
 *       - users
 *     description: Updates a new user
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: user
 *         description: users object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/User'
 *     responses:
 *       200:
 *         description: Successfully updated
 */

router.delete('/:id',(req,res,next)=>{
    //validate Req Object
    logger.debug("router : Delete Users");
    userService.deleteUser(req).then((result)=>{
        logger.debug("router success : Get Users", result);
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
 * /users/{id}:
 *   delete:
 *     tags:
 *       - users
 *     description: Deletes a single user
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: user id
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Successfully deleted
 */

module.exports = router;
