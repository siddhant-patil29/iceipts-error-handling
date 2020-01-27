"use strict";
/**
 *  This module is used to define Data access operations for Receipt 
 *  @module Receipt-dao
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
     * DAO for get Receipt by id
     */
    getReceipt: function (reqObj) {
        return new Promise(function (resolve, reject) {
            logger.debug("Get Receipt details by id dao called");
            console.log("db -- ",db);
            db.receipts.findOne({
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
            logger.debug("Get Receipt details by id dao returned");
        });
    },

    /**
     * DAO for get Receipt by id
     */
    getReceipts: function (reqObj) {
        return new Promise(function (resolve, reject) {
            logger.debug("Get all Receipt dao called");
            console.log("db --- ", db.wishlist);
            db.receipts.findAll({
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
            logger.debug("Get all Receipt dao returned");
        });
    },

    /**
     * DAO for insert Receipt
     */
    addReceipt: function (reqObj) {
        //Check if Receipt already exists
        console.log("dao called for add receipt");
        return new Promise(function (resolve, reject) {
            return db.receipts.create(reqObj).then(function (result) {
                console.log("Receipt dao-result", result);
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
        //     logger.debug("Create Receipt dao called", reqObj);
        //     return db.wishlist.findAll({
        //         where: {
        //             wishlistedBy: reqObj.wishlistedBy
        //         }
        //     }).then(function (existingReceipt) {
        //         //Check if Existing Receipt to found, you can add new Receipt
        //         if (existingReceipt.length  == 0) {
        //             //Insert Receipt in database
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
        //     logger.debug("Create Receipt dao returned the Receipt details.");
        // }, (error)=>{
        //     console.log(error);
        // });
    },

    /**
     * DAO for update Receipt
     */
    updateReceipt: function (reqObj) {

        return new Promise(function (resolve, reject) {
            logger.debug("update Receipt dao started", reqObj    );
            return db.receipts.update(reqObj, { where: { id: reqObj.id } }).then(
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
            logger.debug("Update Receipt dao returned updated Receipt details");
        });
    },
    /**
   * Dao for delete Receipt
   *
   */
  deleteReceipt: function (reqObj, reqCondition) {
        return new Promise(function (resolve, reject) {
            logger.debug("Delete Receipt dao called");
            db.receipts.update(reqObj, { where: reqCondition  }).then(
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
            logger.debug("Delete Receipt dao finished");
        });
    },
};