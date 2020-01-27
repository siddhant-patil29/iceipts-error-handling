/**
 *  This module is used to define database connection
 *  @module databaseconnection
 *  @author Shubham.Gorde
 *  @version 1.0.0
 */

'use strict';
var logger = require('../utils/Logger');

/*SQL DB Connection*/
var Sequelize = require('sequelize');
var config = require('./serverConfig');
config = config[config.activeEnv];
var util=require('../utils/commonUtils')
// define database connection


/**
 * If u r not able to connect to mysql (version>8.0), You need to flush the priviledges using command
 * ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password' as mysql 8.0 and greater versions introduced new security mech which is not 
 * supported by nodejs sequelize library "caching_sha2_password"
 */
var sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: config.dialect,
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },
    dialectOptions: config.dialectOptions,
    logging: false
});

// Test the connection
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

// Sync will Create tables as per models
// load models
var models = [
    'visitors',
    'roles',
    'users',
    'tags',
    'receipts',
    'wishlists',
    'serviceRequests',
    'reimbursements',
    'bids',
    'warranties',
    'subscriptions',
    'warrantyItems',
    'notifications',
    'feedbacks',
    'transactionHistories',
    'customerRetailerAssociations'

];
models.forEach(function (model) {
    // logger.info("Model :: ", model, module.exports[model]);
    
    module.exports[model] = sequelize.import('../models/' + model);
    console.log("module.exports:: ",module.exports);
    // if (model !== 'users') {
    //     module.exports[model].sync({force: false});
    // } else {
    //     module.exports['users'].sync({force: false}).then(function () {
    //         return sequelize.transaction(function (t) {
    //             var defaultRoleObj = {
    //                 "roleName": "super admin"
    //             };

    //             return module.exports['roles'].create(defaultRoleObj, { transaction: t }).then(function (result) {
    //                     var defaultUserObj = {
    //                         email: "superadmin@mobiliya.com",
    //                         mobileNumber: "0000000000",
    //                         password: util.encryptPassword('welcome'),
    //                         firstName: "Super",
    //                         lastName: "Admin",
    //                         roleId: result.id
    //                     };
    //                     return module.exports['users'].create(defaultUserObj, { transaction: t });
    //             });
    //         }).then(function (result) {
    //             console.log("Super Admin Created with userId:", result.id);

    //         }).catch(function (err) {
    //             logger.error("Unable to create Superadmin", err);
    //         });
    //     });
    // }

    module.exports[model].sync({force: false}).then( (data)=>{
        console.log(data)
    },(err)=>{
        console.log(err)
    });
});

// describe relationships
(function (m) {

})(module.exports);


/**
 *  export modules
 */
exports.sequelize = sequelize;
exports.Sequelize = Sequelize;
