'use strict';
/**
 *  This module is used to define service for user model 
 *  @module user-service
 *  @author Shubham.Gorde
 *  @version 1.0.0
 */
var _ = require('underscore');
var rolesDao = require('../daos/roles-dao');
var responseConstant = require("../constants/responseConstants");
var constants = require('../constants/constants');
var async = require('async');
var config = require('../config/serverConfig');
config = config[config.activeEnv];
var util=require('../utils/commonUtils');
const logger=require('../utils/Logger');
/**
  * export module
  */
module.exports = {
    /**
     * Controller function for get data
     */
    
    getRole: function (req) {
        logger.debug("Service called : Get role");
        return new Promise(function (resolve, reject) {
            rolesDao.getRole({ id: req.params.id, isDeleted: 0 }).then(function (result) {
                logger.debug('success ',result);
                return resolve(util.responseUtil(null, result, responseConstant.SUCCESS));
            }, function(err){
                logger.error("Error",err);
                return reject(util.responseUtil(null, null, responseConstant.RUN_TIME_ERROR));
            });
        }, function (err) {
            logger.error('Error ',err);
            return reject(err);
        });
    },

    getRoles : function(){
        logger.debug("Service called : Get roleById");
        return new Promise((resolve,reject)=>{
            
            rolesDao.getRoles({isDeleted:0}).then((result)=>{
                logger.debug('success ',result);
                return resolve(util.responseUtil(null, result, responseConstant.SUCCESS));
            },(err)=>{
                logger.error('Error ',err);
                return reject(util.responseUtil(null,null,responseConstant.RUN_TIME_ERROR));
            })
        },(err)=>{
            logger.error("Error: ", err);
            return reject(err);
        });
    },
    /**
     * Controller function for insert data
     */
    addRole: function (req) {
        logger.debug("Service called : Add role");
        return new Promise(function (resolve, reject) { 
            var insertObj = req.body;
            insertObj.password = util.encryptPassword('welcome');
            //check roleId exist or not
            rolesDao.addRole(insertObj).then(function (result) {
                //util.sendMail(req.body.email, "Insert Role", "Message String", function (err, success) {
                //})
                if (!result){
                    logger.error('error ',err);
                    return reject(util.responseUtil(null,null,responseConstant.RUN_TIME_ERROR));
                }
                else{
                    logger.debug('success ',result);
                    return resolve(util.responseUtil(null, result, responseConstant.SUCCESS));
                }
            }, function(err){
                logger.error('error',err);
                    return reject(util.responseUtil(err, null, responseConstant.RUN_TIME_ERROR));
            });
        }, function (err) {
            logger.error('error ',err);
            return reject(err);
        });
    },
    /**
     * Controller function for Update data
     */
    updateRole: function (req) {
        logger.debug("Service called : Update role");
        return new Promise(function (resolve, reject) {
            var updateObj = req.body;
            //check roleId exist or not
            if (req.body.roleId) {
                rolesDao.getRoleById(req.body.id).then(function (result) {
                    logger.debug(success);
                },
                function (err) {
                    logger.error('error ',err);
                    return reject(err);
                });
            }
            rolesDao.updateRole(updateObj, { id: req.body.id }).then(function (result) {
                return resolve(util.responseUtil(null, result, responseConstant.SUCCESS));
            }, function (err) {
                return reject(err);
            });
        });
    },
    /**
      * Controller function for delete data
      */
    deleteRole: function (req) {
        logger.debug("Service called : Delete role");
        return new Promise(function (resolve, reject) {
            
            rolesDao.getRole({ id: req.params.id, isDeleted: 0 }).then(function (result) {
                    var updateObj = {};
                    updateObj.isDeleted = 1;
                            
                    rolesDao.deleteRole(updateObj, { id: req.params.id, isDeleted: 0 }).then(function (result) {
                        logger.debug('success ',result);
                        return resolve(util.responseUtil(null, null, responseConstant.SUCCESS));
                    }, function (err) {
                        logger.error('error ',err);
                        return reject(err);
                    });
                }, function (err) {
                    logger.error('error ',err);
                    return reject(err);
                });
            }, function (err) {
                logger.error('error ',err);
                return reject(err);
            });
    },
}
