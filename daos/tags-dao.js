"use strict";
/**
 *  This module is used to define Data access operations for Tag 
 *  @module Tag-dao
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
     * DAO for get Tag by id
     */
    getTag: function (reqObj) {
        return new Promise(function (resolve, reject) {
            logger.debug("Get Tag details by id dao called");
            console.log("db -- ",db);
            db.tags.findOne({
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
            logger.debug("Get Tag details by id dao returned");
        });
    },

    /**
     * DAO for get Tag by id
     */
    getTags: function (reqObj) {
        return new Promise(function (resolve, reject) {
            logger.debug("Get all Tag dao called");
            console.log("db --- ", db.wishlist);
            db.tags.findAll({
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
            logger.debug("Get all Tag dao returned");
        });
    },

    /**
     * DAO for insert Tag
     */
    addTag: function (reqObj) {
        //Check if Tag already exists
        return new Promise(function (resolve, reject) {
            return db.tags.create(reqObj).then(function (result) {
                console.log("Tag dao-result", result);
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
     * DAO for update Tag
     */
    updateTag: function (reqObj) {

        return new Promise(function (resolve, reject) {
            logger.debug("update Tag dao started", reqObj    );
            console.log(reqObj);
            return db.tags.update(reqObj, { where: { id: reqObj.id } }).then(
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
            logger.debug("Update Tag dao returned updated Tag details");
        });
    },
    /**
   * Dao for delete Tag
   *
   */
  deleteTag: function (reqObj, reqCondition) {
        return new Promise(function (resolve, reject) {
            logger.debug("Delete Tag dao called");
            db.tags.update(reqObj, { where: reqCondition  }).then(
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
            logger.debug("Delete Tag dao finished");
        });
    },
};