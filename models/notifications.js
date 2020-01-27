/**
 *  This module is use to define DAO for Notification model
 *  @module Notification model
 *  @author Shubham Gorde
 *  @version 1.0.0
 */
const db=require('../config/databaseConnection');
const Sequelize = require('sequelize');
var sequelize = db.sequelize;

console.log("db",db);
module.exports = function (sequelize, DataTypes) {
    var Users = sequelize.import('../models/' + 'users');
    const Notifications = sequelize.define('Notifications', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true  
        },
        type: {
            type: Sequelize.STRING,
        },
        priority: {
            type: Sequelize.STRING
        },
        readOn: {
            type: Sequelize.STRING,
        },
        createdOn: {
            type: Sequelize.STRING,
        // },
        // userId: {
        //     type: Sequelize.INTEGER
        },
        isDeleted: {
            type: Sequelize.TINYINT,
            defaultValue: 0
        }
    })
    
    Notifications.belongsTo(Users, {as:"userId"});
    return Notifications;
}