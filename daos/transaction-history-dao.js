"use strict";
/**
 *  This module is used to define Data access operations for TransactionHistory 
 *  @module TransactionHistory-dao
 *  @author Shravan Kothapalli
 *  @version 1.0.0
 */

/**
*  import project modules
*/

var db = require("../config/databaseConnection");
var util = require("../utils/commonUtils");
var logger = require('../utils/Logger');
var responseConstant = require("../constants/responseConstants");
/**
 * export module
 */
module.exports = {
   
    /**
     * DAO for get TransactionHistory by id
     */
    getTransactionHistory: function (reqObj) {
        return new Promise(function (resolve, reject) {
            logger.debug("Get All TransactionHistory details dao called");
            console.log("db -- ",db);
            db.transactionHistories.findAll({
                where: reqObj
                // ,
                // attributes: ['id', 'itemName', 'wishlistedBy', 'notificationId']
            }).then(
                function (result) {
                    if (result) {
                        return resolve(result);
                    } else {
                        return reject(
                            util.responseUtil(null, null, responseConstant.RECORD_NOT_FOUND)
                        );
                    }
                },
                function (err) {
                    logger.error(err);
                    return reject(
                        util.responseUtil(
                            err,
                            null,
                            responseConstant.SEQUELIZE_DATABASE_ERROR
                        )
                    );
                });
            logger.debug("Get TransactionHistory details by id dao returned");
        });
    },

    /**
     * DAO for get TransactionHistory by id
     */
    getTransactionHistories: function (reqObj) {
        return new Promise(function (resolve, reject) {
            logger.debug("Get all TransactionHistory dao called");
            db.transactionHistories.findAll({
                where: reqObj
                // ,
                // attributes: ['id', 'itemName', 'wishlistedBy', 'notificationId']
            }).then(
                function (result) {
                    if (result) {
                        return resolve(result);
                    } else {
                        return reject(
                            util.responseUtil(null, null, responseConstant.RECORD_NOT_FOUND)
                        );
                    }
                },
                function (err) {
                    logger.error(err);
                    return reject(
                        util.responseUtil(
                            err,
                            null,
                            responseConstant.SEQUELIZE_DATABASE_ERROR
                        )
                    );
                });
            logger.debug("Get all TransactionHistory dao returned");
        });
    },

    /**
     * DAO for insert TransactionHistory
     */
    addTransactionHistory: function (reqObj) {
        //Check if TransactionHistory already exists
        return new Promise(function (resolve, reject) {
            return db.transactionHistories.create(reqObj).then(function (result) {
                console.log("TransactionHistory dao-result", result);
                return resolve(result
                //     {
                //     itemName: result.itemName, budgetMin: result.budgetMin, budgetMax: result.budgetMax, 
                //     description: result.description, wishlistedBy: result.wishlistedBy
                // }
                )
            }).catch(function (err) {
                logger.error(err);
                return reject(util.responseUtil(err, null, responseConstant.SEQUELIZE_DATABASE_ERROR));
            });
        })
        // return new Promise(function (resolve, reject) {
        //     logger.debug("Create TransactionHistory dao called", reqObj);
        //     return db.wishlist.findAll({
        //         where: {
        //             wishlistedBy: reqObj.wishlistedBy
        //         }
        //     }).then(function (existingTransactionHistory) {
        //         //Check if Existing TransactionHistory to found, you can add new TransactionHistory
        //         if (existingTransactionHistory.length  == 0) {
        //             //Insert TransactionHistory in database
        //             console.log("test add obj", reqObj)
        //             return db.wishlist.create(reqObj).then(function (result) {
        //                 return resolve({
        //                      itemName: result.itemName, budgetMin: result.budgetMin, budgetMax: result.budgetMax, 
        //                     description: result.description, wishlistedBy: result.wishlistedBy
        //                 })
        //             }).catch(function (err) {
        //                 logger.error(err);
        //                 return reject(util.responseUtil(err, null, responseConstant.SEQUELIZE_DATABASE_ERROR));
        //             });
        //         }
        //         else {
        //             return reject(util.responseUtil(null, null, responseConstant.DUPLICATION_ERROR));
        //         }
        //     }, function (err) {
        //         logger.error(err);
        //         return reject(util.responseUtil(err, null, responseConstant.SYSTEM_ERROR));
        //     })
        //     logger.debug("Create TransactionHistory dao returned the TransactionHistory details.");
        // }, (error)=>{
        //     console.log(error);
        // });
    },

    /**
     * DAO for update TransactionHistory
     */
    updateTransactionHistory: function (reqObj) {

        return new Promise(function (resolve, reject) {
            logger.debug("update TransactionHistory dao started", reqObj    );
            return db.transactionHistories.update(reqObj, { where: { id: reqObj.id } }).then(
                function (result) {
                    if (result && result[0]){
                        console.log("result - update: ", result);
                        return resolve(
                            {
                                reqObj
                                // "id": reqObj.id,
                                // "wishlistedBy": reqObj.wishlistedBy,
                                // "itemName": reqObj.itemName,
                        }
                        );
                    }
                        
                    else {
                        return reject(
                            util.responseUtil(null, result, responseConstant.RECORD_NOT_FOUND)
                        );
                    }
                },
                function (err) {
                    logger.error(err);
                    return reject(
                        util.responseUtil(
                            err,
                            null,
                            responseConstant.SEQUELIZE_DATABASE_ERROR
                        )
                    );
                }
            );
            logger.debug("Update TransactionHistory dao returned updated TransactionHistory details");
        });
    },
    /**
   * Dao for delete TransactionHistory
   *
   */
  deleteTransactionHistory: function (reqObj, reqCondition) {
        return new Promise(function (resolve, reject) {
            logger.debug("Delete TransactionHistory dao called");
            db.transactionHistories.update(reqObj, { where: reqCondition  }).then(
                function (result) {
                    if (result && result[0]) {
                        return resolve(result);
                    }
                    else {
                        return reject(
                            util.responseUtil(null, result, responseConstant.RECORD_NOT_FOUND)
                        );
                    }
                },
                function (err) {
                    logger.error(err);
                    return reject(
                        util.responseUtil(
                            err,
                            null,
                            responseConstant.SEQUELIZE_DATABASE_ERROR
                        )
                    );
                }
            );
            logger.debug("Delete TransactionHistory dao finished");
        });
    },
};