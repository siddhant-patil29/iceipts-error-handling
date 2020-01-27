'use strict';
/**
 *  This module is used to define service for Wishlists model 
 *  @module Wishlists-services
 *  @author Shravan Kothapalli
 *  @version 1.0.0
 */
var _ = require('underscore');
var reimbursementDao = require('../daos/reimbursement-dao');
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
    
    getReimbursement: function (req) {
        return new Promise(function (resolve, reject) {
            reimbursementDao.getReimbursement({ id: req.params.id, isDeleted: 0 }).then(function (result) {
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
     * Controller function for get Wishlists data
     */
    
    getReimbursements: function (req) {
        return new Promise(function (resolve, reject) {
            reimbursementDao.getReimbursements({ isDeleted: 0 }).then(function (result) {
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
     * Controller function for insert Wishlists data
     */
    addReimbursement: function (req) {
        return new Promise(function (resolve, reject) {
            // var insertObj = isEmptyCheck(req.body);
            var insertObj = req.body;
            // insertObj.password = util.encryptPassword('welcome');
            //RoleId exist or not : it must be foreign key
            reimbursementDao.addReimbursement(insertObj).then(function (result,err) {
                //util.sendMail(req.body.email, "Set password", "Message String", function (err, success) {
                //})
                if (!result){
                    console.log("error---- ", err)
                    logger.error('error ',err);
                    return reject(util.responseUtil(null, null, responseConstant.RUN_TIME_ERROR));
                }
                else{   
                    logger.debug('success '     ,result);
                    return resolve(util.responseUtil(null, result, responseConstant.SUCCESS));
                }
            },function(err){
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
    updateReimbursement: function (req) {
        return new Promise(function (resolve, reject) {
            var insertObj = req.body;
            //check roleId exist or not: its validated automatically as its foreign key
            reimbursementDao.updateReimbursement(insertObj).then(function (result) {
                logger.debug('success ',result);
                return resolve(util.responseUtil(null, result, responseConstant.SUCCESS));
            }, function (err) {
                logger.error('error ',err);
                return reject(err);
            });
        });
    },

    /**
      * Controller function for delete data
      */
    deleteReimbursement: function (req) {
        return new Promise(function (resolve, reject) {
            
            reimbursementDao.getReimbursement({ id: req.params.id, isDeleted: 0 }).then(function (result) {
                    var updateObj = {};
                    updateObj.isDeleted = 1;
                    console.log("req.params : ", req.params.id);
                    reimbursementDao.deleteReimbursement(updateObj, { id: req.params.id, isDeleted: 0 }).then(function (result) {
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
