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
    getServiceRequest: function (reqObj) {
        return new Promise(function (resolve, reject) {
            logger.debug("Get Service Request details by id dao called");
            db.serviceRequests.findOne({
                where: reqObj
                // ,
                // attributes: ['id', 'notificationId', 'requestorId', 'warrantryItemId']
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
            logger.debug("Get Service Request details by id dao returned");
        });
    },

    /**
     * DAO for get Service by id
     */
    getServiceRequests: function (reqObj) {
        return new Promise(function (resolve, reject) {
            logger.debug("Get Service Request details dao called");
            db.serviceRequests.findAll({
                where: reqObj
                // ,
                // attributes: ['id', 'notificationId', 'requestorId', 'warrantyItemId']
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
            logger.debug("Get all Service Request  dao returned");
        });
    },

    /**
     * DAO for insert Service 
     */
    addServiceRequest: function (reqObj) {
        //Check if Service already exists
        return new Promise(function (resolve, reject) {
            logger.debug("Create Service Request dao called");
            // return db.serviceRequests.findAll({
            //     where: {
            //         tagId: reqObj.tagId
            //     }
            // }).then(function (existingService) {
            //     //Check if Existing Service ot found, you can add new Service
            //     if (existingService.length == 0) {
            //         //Insert Service in database
                    return db.serviceRequests.create(reqObj).then(function (result) {
                        return resolve(
                            result
                        //     {
                        //     id: result.id, type: result.type, description: result.description, priority: result.priority,
                        //     requestDate: result.requestDate, notificationId: result.notification,requestorId: result.requestorId, isDeleted: result.isDeleted, 
                        //     warrentyItemId: result.warrentyItemId
                            
                        // }
                        )

                    }).catch(function (err) {
                        logger.error("err dao catch---- ");
                        return reject(util.responseUtil(err, null, responseConstant.SEQUELIZE_DATABASE_ERROR));
                    });
                }
            //     else {
            //         return reject(util.responseUtil(null, null, responseConstant.DUPLICATION_ERROR));
            //     }
            // }, function (err) {
            //     logger.error(err);
            //     return reject(util.responseUtil(err, null, responseConstant.SYSTEM_ERROR));
            // })
        //     logger.debug("Create Service Request dao returned the Service details.");
        // }
        );
    },

    /**
     * DAO for update Service
     */
    updateServiceRequest: function (reqObj, reqCondition) {

        return new Promise(function (resolve, reject) {
            logger.debug("update Service Request dao started");
            return db.serviceRequests.update(reqObj, { where: reqCondition }).then(
                function (result) {
                    if (result && result[0])
                        return resolve(reqObj);
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
            logger.debug("Update Service Request dao returned updated Service details");
        });
    },
    /**
   * Dao for delete Service
   *
   */
    deleteServiceRequest: function (reqObj, reqCondition) {
        return new Promise(function (resolve, reject) {
            logger.debug("Delete Service Request dao called");
            db.serviceRequests.update(reqObj, { where: reqCondition }).then(
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
            logger.debug("Delete Service Request dao finished");
        });
    },
};