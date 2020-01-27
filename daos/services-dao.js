"use strict";
/**
 *  This module is used to define Data access operations for services 
 *  @module services-dao
 *  @author Shubham Gorde
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
     * DAO for get Service by id
     */
    getService: function (reqObj) {
        return new Promise(function (resolve, reject) {
            logger.debug("Get Service details by id dao called");
            db.services.findOne({
                where: reqObj,
                attributes: ['id', 'notificationId', 'requestorId', 'warrantryItemId']
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
            logger.debug("Get Service details by id dao returned");
        });
    },

    /**
     * DAO for get Service by id
     */
    getServices: function (reqObj) {
        return new Promise(function (resolve, reject) {
            logger.debug("Get Service details dao called");
            db.services.findAll({
                where: reqObj,
                attributes: ['id', 'notificationId', 'requestorId', 'warrantryItemId']
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
            logger.debug("Get Service details by id dao returned");
        });
    },

    /**
     * DAO for insert Service 
     */
    addService: function (reqObj) {
        //Check if Service already exists
        return new Promise(function (resolve, reject) {
            logger.debug("Create Service dao called");
            return db.services.findAll({
                where: {
                    tagId: reqObj.tagId
                }
            }).then(function (existingService) {
                //Check if Existing Service ot found, you can add new Service
                if (existingService.length == 0) {
                    //Insert Service in database
                    return db.services.create(reqObj).then(function (result) {
                        return resolve({
                            id: result.id, type: result.type, description: result.description, priority: result.priority,
                            requestDate: result.requestDate, notification: result.notification,requestorId: result.requestorId, isDeleted: result.isDeleted, 
                            warrentryItemId: result.warrentryItemId
                            
                        })
                    }).catch(function (err) {
                        logger.error(err);
                        return reject(util.responseUtil(err, null, responseConstant.SEQUELIZE_DATABASE_ERROR));
                    });
                }
                else {
                    return reject(util.responseUtil(null, null, responseConstant.DUPLICATION_ERROR));
                }
            }, function (err) {
                logger.error(err);
                return reject(util.responseUtil(err, null, responseConstant.SYSTEM_ERROR));
            })
            logger.debug("Create Service dao returned the Service details.");
        });
    },

    /**
     * DAO for update Service
     */
    updateService: function (reqObj, reqCondition) {

        return new Promise(function (resolve, reject) {
            logger.debug("update Service dao started");
            return db.services.update(reqObj, { where: reqCondition }).then(
                function (result) {
                    if (result && result[0])
                        return resolve({
                            "id": reqCondition.id,
                            "notonIdificati": reqObj.notificationId,
                            "type": reqObj.type
                        });
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
            logger.debug("Update Service dao returned updated Service details");
        });
    },
    /**
   * Dao for delete Service
   *
   */
    deleteService: function (reqObj, reqCondition) {
        return new Promise(function (resolve, reject) {
            logger.debug("Delete Service dao called");
            db.services.update(reqObj, { where: reqCondition }).then(
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
            logger.debug("Delete Service dao finished");
        });
    },
};