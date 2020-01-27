"use strict";
/**
 *  This module is used to define Data access operations for Wishlist 
 *  @module Wishlist-dao
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
     * DAO for get Wishlist by id
     */
    getReimbursement: function (reqObj) {
        return new Promise(function (resolve, reject) {
            logger.debug("Get Reimbursement details by id dao called");
            console.log("db -- ",db);
            db.reimbursements.findOne({
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
            logger.debug("Get Reimbursement details by id dao returned");
        });
    },

    /**
     * DAO for get Wishlist by id
     */
    getReimbursements: function (reqObj) {
        return new Promise(function (resolve, reject) {
            logger.debug("Get all Reimbursement dao called");
            console.log("db --- ", db.wishlist);
            db.reimbursements.findAll({
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
            logger.debug("Get all Reimbursement dao returned");
        });
    },

    /**
     * DAO for insert Wishlist
     */
    addReimbursement: function (reqObj) {
        //Check if Wishlist already exists
        return new Promise(function (resolve, reject) {
            return db.reimbursements.create(reqObj).then(function (result) {
                console.log("Reimbursement dao-result", result);
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
        //     logger.debug("Create Wishlist dao called", reqObj);
        //     return db.wishlist.findAll({
        //         where: {
        //             wishlistedBy: reqObj.wishlistedBy
        //         }
        //     }).then(function (existingWishlist) {
        //         //Check if Existing Wishlist to found, you can add new Wishlist
        //         if (existingWishlist.length  == 0) {
        //             //Insert Wishlist in database
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
        //     logger.debug("Create Wishlist dao returned the Wishlist details.");
        // }, (error)=>{
        //     console.log(error);
        // });
    },

    /**
     * DAO for update Wishlist
     */
    updateReimbursement: function (reqObj) {

        return new Promise(function (resolve, reject) {
            logger.debug("update Reimbursement dao started", reqObj    );
            return db.reimbursements.update(reqObj, { where: { id: reqObj.id } }).then(
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
            logger.debug("Update Wishlist dao returned updated Wishlist details");
        });
    },
    /**
   * Dao for delete Wishlist
   *
   */
  deleteReimbursement: function (reqObj, reqCondition) {
        return new Promise(function (resolve, reject) {
            logger.debug("Delete Reimbursement dao called");
            db.reimbursements.update(reqObj, { where: reqCondition  }).then(
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
            logger.debug("Delete Reimbursement dao finished");
        });
    },
};