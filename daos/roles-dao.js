
"use strict";
/**
 *  This module is used to define Data access operations for user 
 *  @module user-dao
 *  @author Shubham.Gorde
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
     * DAO for get role by id
     */
    getRole: function (reqObj) {
        return new Promise(function (resolve, reject) {
            logger.debug("Get role details by id dao called");
            db.roles.findOne({
                where: reqObj,
                attributes: ['id', 'roleName']
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
            logger.debug("Get role details by id dao returned");
        });
    },

    /**
     * DAO for get all roles 
     */
    getRoles: function (reqObj) {
        console.log("dao called");
        return new Promise(function (resolve, reject) {
            logger.debug("Get all role details dao called");
            db.roles.findAll({
                where: reqObj
            }).then(
                function (result) {
                    console.log("successs : ",result);
                    if (result) {
                        return resolve(result);
                    } else {
                        return reject(
                            util.responseUtil(null, null, responseConstant.RECORD_NOT_FOUND)
                        );
                    }
                },
                function (err) {
                    console.log("error : ",err);
                    logger.error(err);
                    return reject(
                        util.responseUtil(
                            err,
                            null,
                            responseConstant.SEQUELIZE_DATABASE_ERROR
                        )
                    );
                });
            logger.debug("Get all role details dao returned");
        });
    },


    /**
     * DAO for insert role 
     */
    addRole: function (reqObj) {
        //Check if role already exists
        return new Promise(function (resolve, reject) {
            logger.debug("Create role dao called");
            return db.roles.findAll({
                where: {
                    roleName: reqObj.roleName
                }
            }).then(function (existingRole) {
                //Check if Existing role role ot found, you can add new role
                if (existingRole.length == 0) {
                    //Insert role in database
                    return db.roles.create(reqObj).then(function (result) {
                        return resolve({
                            id: result.id, roleName: result.roleName
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
            logger.debug("Create role dao returned the role details.");
        });
    },

    /**
     * DAO for update role
     */
    updateRole: function (reqObj, reqCondition) {

        return new Promise(function (resolve, reject) {
            logger.debug("update roles dao started");
            return db.roles.update(reqObj, { where: reqCondition }).then(
                function (result) {
                    if (result && result[0])
                        return resolve({
                            "id": reqCondition.id,
                            "roleName": reqObj.roleName
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
            logger.debug("Update role dao returned updated role details");
        });
    },
    /**
   * Dao for delete role
   *
   */
    deleteRole: function (reqObj, reqCondition) {
        return new Promise(function (resolve, reject) {
            logger.debug("Delete role dao called");
            db.roles.update(reqObj, { where: reqCondition }).then(
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
            logger.debug("Delete role dao finished");
        });
    },

};