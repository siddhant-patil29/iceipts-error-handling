"use strict";
/**
 *  This module is used to define Data access operations for WarrantyItem 
 *  @module WarrantyItem-dao
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
     * DAO for get WarrantyItem by id
     */
    getWarrantyItem: function (reqObj) {
        return new Promise(function (resolve, reject) {
            logger.debug("Get WarrantyItem details by id dao called");
            console.log("db -- ",db);
            db.warrantyItems.findOne({
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
            logger.debug("Get WarrantyItem details by id dao returned");
        });
    },

    /**
     * DAO for get WarrantyItem by id
     */
    getWarrantyItems: function (reqObj) {
        return new Promise(function (resolve, reject) {
            logger.debug("Get all WarrantyItem dao called");
            console.log("db --- ", db.wishlist);
            db.warrantyItems.findAll({
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
            logger.debug("Get all WarrantyItem dao returned");
        });
    },

    /**
     * DAO for insert WarrantyItem
     */
    addWarrantyItem: function (reqObj) {
        //Check if WarrantyItem already exists
        return new Promise(function (resolve, reject) {
            return db.warrantyItems.create(reqObj).then(function (result) {
                console.log("WarrantyItem dao-result", result);
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
        //     logger.debug("Create WarrantyItem dao called", reqObj);
        //     return db.wishlist.findAll({
        //         where: {
        //             wishlistedBy: reqObj.wishlistedBy
        //         }
        //     }).then(function (existingWarrantyItem) {
        //         //Check if Existing WarrantyItem to found, you can add new WarrantyItem
        //         if (existingWarrantyItem.length  == 0) {
        //             //Insert WarrantyItem in database
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
        //     logger.debug("Create WarrantyItem dao returned the WarrantyItem details.");
        // }, (error)=>{
        //     console.log(error);
        // });
    },

    addWarrantyItemList: function (reqObj) {
        //Check if WarrantyItem already exists
        return new Promise(function (resolve, reject) {
            return db.warrantyItems.bulkCreate(reqObj).then(function (result) {
                console.log("WarrantyItemList dao-result", result);
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
    },

    /**
     * DAO for update WarrantyItem
     */
    updateWarrantyItem: function (reqObj) {

        return new Promise(function (resolve, reject) {
            logger.debug("update WarrantyItem dao started", reqObj    );
            return db.warrantyItems.update(reqObj, { where: { id: reqObj.id } }).then(
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
            logger.debug("Update WarrantyItem dao returned updated WarrantyItem details");
        });
    },
    /**
   * Dao for delete WarrantyItem
   *
   */
  deleteWarrantyItem: function (reqObj, reqCondition) {
        return new Promise(function (resolve, reject) {
            logger.debug("Delete WarrantyItem dao called");
            db.warrantyItems.update(reqObj, { where: reqCondition  }).then(
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
            logger.debug("Delete WarrantyItem dao finished");
        });
    },
};