"use strict";
/**
 *  This module is used to define Data access operations for Subscription 
 *  @module Subscription-dao
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
     * DAO for get Subscription by id
     */
    getSubscription: function (reqObj) {
        return new Promise(function (resolve, reject) {
            logger.debug("Get Subscription details by id dao called");
            console.log("db -- ",db);
            db.subscriptions.findOne({
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
            logger.debug("Get Subscription details by id dao returned");
        });
    },

    /**
     * DAO for get Subscription by id
     */
    getSubscriptions: function (reqObj) {
        return new Promise(function (resolve, reject) {
            logger.debug("Get all Subscription dao called");
            console.log("db --- ", db.wishlist);
            db.subscriptions.findAll({
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
            logger.debug("Get all Subscription dao returned");
        });
    },

    /**
     * DAO for insert Subscription
     */
    addSubscription: function (reqObj) {
        //Check if Subscription already exists
        return new Promise(function (resolve, reject) {
            return db.subscriptions.create(reqObj).then(function (result) {
                console.log("Subscription dao-result", result);
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
        //     logger.debug("Create Subscription dao called", reqObj);
        //     return db.wishlist.findAll({
        //         where: {
        //             wishlistedBy: reqObj.wishlistedBy
        //         }
        //     }).then(function (existingSubscription) {
        //         //Check if Existing Subscription to found, you can add new Subscription
        //         if (existingSubscription.length  == 0) {
        //             //Insert Subscription in database
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
        //     logger.debug("Create Subscription dao returned the Subscription details.");
        // }, (error)=>{
        //     console.log(error);
        // });
    },

    /**
     * DAO for update Subscription
     */
    updateSubscription: function (reqObj) {

        return new Promise(function (resolve, reject) {
            logger.debug("update Subscription dao started", reqObj    );
            return db.subscriptions.update(reqObj, { where: { id: reqObj.id } }).then(
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
            logger.debug("Update Subscription dao returned updated Subscription details");
        });
    },
    /**
   * Dao for delete Subscription
   *
   */
  deleteSubscription: function (reqObj, reqCondition) {
        return new Promise(function (resolve, reject) {
            logger.debug("Delete Subscription dao called");
            db.subscriptions.update(reqObj, { where: reqCondition  }).then(
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
            logger.debug("Delete Subscription dao finished");
        });
    },
};