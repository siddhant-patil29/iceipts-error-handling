/**
 *  This module is use to define DAO for Services model
 *  @module Services model
 *  @author Shubham Gorde
 *  @version 1.0.0
 */
const db=require('../config/databaseConnection');
const Sequelize = require('sequelize');
var sequelize = db.sequelize;

console.log("db",db);
module.exports = function (sequelize, DataTypes) {
    var Notifications = sequelize.import('../models/' + 'notifications');
    var WarrantyItems = sequelize.import('../models/' + 'warrantyItems');
    var Users = sequelize.import('../models/' + 'users');
    
    const ServiceRequests = sequelize.define('ServiceRequests', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true  
        },
        type: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        description: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        priority: {
            type: Sequelize.INTEGER,
        },
        requestDate: {
            type: Sequelize.STRING,
        },
        // notification: {
        //     type: Sequelize.STRING
        // },
        // requestorId: {
        //     type: Sequelize.INTEGER
        // },
        isDeleted: {
            type: Sequelize.TINYINT,
            defaultValue: 0
        }
        // warrantryItemId: {
        //     type: Sequelize.INTEGER
        // }
    })
    ServiceRequests.belongsTo(Notifications, {as:"notification"});
    ServiceRequests.belongsTo(Users,{as : "requestor"});
    ServiceRequests.belongsTo(WarrantyItems, { as : "warrantyItem"  })
    return ServiceRequests;
}