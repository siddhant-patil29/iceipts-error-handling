'use strict';
/**
 *  This module is used to define service for Receipts model 
 *  @module Receipts-services
 *  @author Shravan Kothapalli
 *  @version 1.0.0
 */
var _ = require('underscore');
var receiptDao = require('../daos/receipt-dao');
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
    
    getReceipt: function (req) {
        return new Promise(function (resolve, reject) {
            receiptDao.getReceipt({ id: req.params.id, isDeleted: 0 }).then(function (result) {
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
     * Controller function for get Receipts data
     */
    
    getReceipts: function (req) {
        return new Promise(function (resolve, reject) {
            receiptDao.getReceipts({ isDeleted: 0 }).then(function (result) {
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
     * Controller function for download Receipt
     */
    
    downloadReceipt: function (req, res) {
        let _this= this;
        return new Promise(function (resolve, reject) {
            let response= _this.getReceipt(req);
            resolve(response);
        }, function (err) {
            logger.error('error ',err);
            return reject(err);
        }).then((result)=>{
            console.log("resolved download receipt details: ", result);
            console.log("bucket------ ", result.data.id);
            console.log("file ----- ", result.data.name);
            fileUploadService.downloadFile(result.data.customerId, result.data.name, res).then(function (result) {
                logger.debug('success ',result);
                return resolve(util.responseUtil(null, result, responseConstant.SUCCESS));
            }, function(err){
                logger.error("service errror:", err);
                return reject(util.responseUtil(null, null, responseConstant.RUN_TIME_ERROR));
            });
        });
    },


    /**
     * Controller function for insert Receipts data
     */
    addReceipt: function (req) {
        
        return new Promise(function (resolve, reject) {
            // var insertObj = isEmptyCheck(req.body);
            console.log("req - service--- -", req.body)
            // //validate empty file 
            // if(!req.file){
            //     return reject(util.responseUtil(null, "Please attach respective receipt file", responseConstant.RUN_TIME_ERROR));
            // }

            var insertObj = req.body;
            if(req.file)
                insertObj.name = req.file.originalname;
            console.log("Object to be inserted: ", insertObj);
            // insertObj.password = util.encryptPassword('welcome');
            //RoleId exist or not : it must be foreign key
            receiptDao.addReceipt(insertObj).then(function (result) {
            
                //util.sendMail(req.body.email, "Set password", "Message String", function (err, success) {
                //})
                if (!result){
                    logger.error('error ');
                    return reject(util.responseUtil(null, null, responseConstant.RUN_TIME_ERROR));
                }
                else{   
                    // fileUploadService.uploadFile(req.body.customerId,req.file.originalname,req.file.buffer).then((result1)=>{
                    if(req.file){
                        fileUploadService.uploadFile(req.body.customerId,req.file).then((result1)=>{
                            logger.debug('success: ',result1);
                            return resolve(util.responseUtil(null, result, responseConstant.SUCCESS));
                        }, function (err) {
                            logger.error('error ',err);
                            return reject(util.responseUtil(null, null, responseConstant.RUN_TIME_ERROR));
                        })
                    }
                    else{
                        return resolve(util.responseUtil(null, result, responseConstant.SUCCESS));
                    }
                    
                }
            }, (err)=>{
                logger.error('error ',err);
                return reject(util.responseUtil(null, null, responseConstant.RUN_TIME_ERROR));
            });
        },(err)=>{
            logger.error("err: ",err);
            return reject(util.responseUtil(null, null, responseConstant.RUN_TIME_ERROR));
        });
    },

    /**
     * Controller function for Update data
     */
    updateReceipt: function (req) {
        return new Promise(function (resolve, reject) {
            var insertObj = req.body;
            //check roleId exist or not: its validated automatically as its foreign key
            receiptDao.updateReceipt(insertObj).then( (result) =>{
                logger.debug('success ',result);
                return resolve(util.responseUtil(null, result, responseConstant.SUCCESS));
            },  (err)=> {
                logger.error('error ',err);
                return reject(err);
            });
        });
    },

    /**
      * Controller function for delete data
      */
    deleteReceipt: function (req) {
        return new Promise(function (resolve, reject) {
            
            receiptDao.getReceipt({ id: req.params.id, isDeleted: 0 }).then(function (result) {
                    var updateObj = {};
                    updateObj.isDeleted = 1;
                    console.log("req.params : ", req.params.id);
                    receiptDao.deleteReceipt(updateObj, { id: req.params.id, isDeleted: 0 }).then(function (result) {
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
