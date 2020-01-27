
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
const paginateDao=require('../utils/paginate-util');
/**
 * export module
 */
module.exports = {
   
    /**
     * DAO for get User by id
     */
    getUser: function (reqObj) {

        return new Promise(function (resolve, reject) {
            logger.debug("Get user details by id dao called");
            db.users.findOne({
                where: reqObj}
            ,
            ).then(
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
            logger.debug("Get user details by id dao returned");
        });
    },

    /**
     * DAO for get User by id
     */
    getUsers: function (reqObj) {
        console.log("dao layer....")
        var pageObj=paginateDao.pageValidate(reqObj);
        console.log("in Dao Utill...",pageObj);
        return new Promise(function (resolve, reject) {
            logger.debug("Get user details dao called");
            db.users.findAll(pageObj).then(
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
            logger.debug("Get user details by id dao returned");
        });
    },
    /**
     * DAO for insert User 
     */
    addUser: function (reqObj) {
        //Check if user already exists
        return new Promise(function (resolve, reject) {
            logger.debug("Create user dao called");
            return db.users.findAll({
                where: {
                    email: reqObj.email
                }
            }).then(function (existingUser) {
                //Check if Existing user ot found, you can add new user
                if (existingUser.length == 0) {
                    //Insert user in database
                    return db.users.create(reqObj).then(function (result) {
                        return resolve(result
                        //     {
                        //     id: result.id, email: result.email, password: result.password, mobileNumber: result.mobileNumber, 
                        //     firstName: result.firstName, lastName: result.lastName, roleId: result.roleId
                        // }
                        )
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
            logger.debug("Create user dao returned the user details.");
        });
    },

    /**
     * DAO for update user
     */
    updateUser: function (reqObj, reqCondition) {

        return new Promise(function (resolve, reject) {
            logger.debug("update user dao started");
            return db.users.update(reqObj, { where: reqCondition }).then(
                function (result) {
                    if (result && result[0])
                        return resolve({
                            "id": reqCondition.id,
                            "mobileNumber": reqObj.mobileNumber,
                            "name": reqObj.name,
                            "roleId": reqObj.roleId
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
            logger.debug("Update user dao returned updated user details");
        });
    },
    /**
   * Dao for delete user
   *
   */
    deleteUser: function (reqObj, reqCondition) {
        return new Promise(function (resolve, reject) {
            logger.debug("Delete user dao called");
            db.users.update(reqObj, { where: reqCondition }).then(
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
            logger.debug("Delete user dao finished");
        });
    },

};