'use strict';
/**
 *  This module is used to define service for customerRetailerAssociation model 
 *  @module customerRetailerAssociation-service
 *  @author Shubham.Gorde
 *  @version 1.0.0
 */
var _ = require('underscore');
var customerRetailerAssociationDao = require('../daos/customer-retailer-association-dao');
var responseConstant = require("../constants/responseConstants");
var constants = require('../constants/constants');
var async = require('async');
var config = require('../config/serverConfig');
config = config[config.activeEnv];
var util=require('../utils/commonUtils');
const logger=require('../utils/Logger');
const fileUploadService = require('../utils/fileUploader');
/**
  * export module
  */
module.exports = {
    /**
     * Controller function for get data
     */
    
    getCustomerRetailerAssociation: function (req) {
        return new Promise(function (resolve, reject) {
            customerRetailerAssociationDao.getCustomerRetailerAssociation({ id: req.params.id, isDeleted: 0 }).then(function (result) {
                logger.debug('success ',result);
                return resolve(util.responseUtil(null, result, responseConstant.SUCCESS));
            }, function(err){
                logger.error(err);
                return reject(util.responseUtil(null, null, responseConstant.RUN_TIME_ERROR));
            });
        }, function (err) {
            logger.error('error ',err);
            return reject(err);
        });
    },

    /**
     * Controller function for get CustomerRetailerAssociation data
     */
    
    getCustomerRetailerAssociations: function (req) {
        return new Promise(function (resolve, reject) {
            customerRetailerAssociationDao.getCustomerRetailerAssociations({ isDeleted: 0 }).then(function (result) {
                logger.debug('success ',result);
                return resolve(util.responseUtil(null, result, responseConstant.SUCCESS));
            }, function(err){
                logger.error(err);
                return reject(util.responseUtil(null, null, responseConstant.RUN_TIME_ERROR));
            });
        }, function (err) {
            logger.error('error ',err);
            return reject(err);
        });
    },

    /**
     * Controller function for insert CustomerRetailerAssociation data
     */
    addCustomerRetailerAssociation: function (req) {
        return new Promise(function (resolve, reject) {
            // var insertObj = isEmptyCheck(req.body);
            // insertObj.password = util.encryptPassword('welcome');
            var insertObj = req.body;
            //RoleId exist or not : it must be foreign key
            
            customerRetailerAssociationDao.addCustomerRetailerAssociation(insertObj).then(function (result) {
                //util.sendMail(req.body.email, "Set password", "Message String", function (err, success) {
                //})
                if (!result){
                    logger.error('error');
                    return reject(util.responseUtil(null, null, responseConstant.RUN_TIME_ERROR));
                }
                else{

                    fileUploadService.createBucket(result.id).then((success)=>{
                        console.log("success", success);
                    },(error)=>{
                        comnsole.log("error ", error);
                    });
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
    updateCustomerRetailerAssociation: function (req) {
        return new Promise(function (resolve, reject) {
            var insertObj = req.body;
            //check roleId exist or not: its validated automatically as its foreign key
            customerRetailerAssociationDao.updateCustomerRetailerAssociation(insertObj, { id: req.body.id }).then(function (result) {
                logger.debug('success ',result);
                return resolve(util.responseUtil(null, result, responseConstant.SUCCESS));
            }, function (err) {
                logger.error('error ',err);
                return reject(util.responseUtil(err, null, responseConstant.RUN_TIME_ERROR));
            });
        });
    },

    /**
      * Controller function for delete data
      */
    deleteCustomerRetailerAssociation: function (req) {
        return new Promise(function (resolve, reject) {
            
            customerRetailerAssociationDao.getCustomerRetailerAssociation({ id: req.params.id, isDeleted: 0 }).then(function (result) {
                    var updateObj = {};
                    updateObj.isDeleted = 1;
                            
                    customerRetailerAssociationDao.deleteCustomerRetailerAssociation(updateObj, { id: req.params.id, isDeleted: 0 }).then(function (result) {
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
