'use strict';
/**
 *  This module is used to define service for Tags model 
 *  @module Tags-services
 *  @author Shravan Kothapalli
 *  @version 1.0.0
 */
var _ = require('underscore');
var visitorDao = require('../daos/visitors-dao');
var responseConstant = require("../constants/responseConstants");
var constants = require('../constants/constants');
var async = require('async');
var config = require('../config/serverConfig');
config = config[config.activeEnv];
var util=require('../utils/commonUtils');
const logger=require('../utils/Logger');
/**
  * export module
  */
module.exports = {

    /**
     * Controller function for insert Tags data
     */
    addVisitor: function (req) {
        return new Promise(function (resolve, reject) {
            // var insertObj = isEmptyCheck(req.body);
            var insertObj = req.body;
            // insertObj.password = util.encryptPassword('welcome');
            //RoleId exist or not : it must be foreign key
            visitorDao.addVisitor(insertObj).then(function (result,err) {
                
                if (!result){
                    console.log("error---- ", err)
                    logger.error('error ',err);
                    return reject(util.responseUtil(null, null, responseConstant.RUN_TIME_ERROR));
                }
                else{   
                    logger.debug('success '     ,result);
                    return resolve(util.responseUtil(null, result, responseConstant.SUCCESS));
                }
            },function(err){
                logger.error('error',err);
                return reject(util.responseUtil(err, null, responseConstant.RUN_TIME_ERROR));
            });
        }, function (err) {
            logger.error('error ',err);
            return reject(err);
        });
    }
}
