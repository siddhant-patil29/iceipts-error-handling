/**
 *  This module is use to define DAO for Feedback model
 *  @module Feedback model
 *  @author Shubham Gorde
 *  @version 1.0.0
 */
const db=require('../config/databaseConnection');
const Sequelize = require('sequelize');
var sequelize = db.sequelize;

console.log("db",db);
module.exports = function (sequelize, DataTypes) {
    var Users = sequelize.import('../models/' + 'users');
    var Notifications = sequelize.import('../models/' + 'notifications');
    const Feedbacks = sequelize.define('Feedbacks', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true  
        },
        description: {
            type: Sequelize.STRING,
        },
        rating: {
            type: Sequelize.STRING
        },
        // userId: {
        //     type: Sequelize.INTEGER,
        // },
        // notificationId: {
        //     type: Sequelize.INTEGER,
        // },
        isDeleted: {
            type: Sequelize.TINYINT,
            defaultValue: 0
        }
    })
    
    Feedbacks.belongsTo(Users, {as:"userId"});
    Feedbacks.belongsTo(Notifications, {as:"notificationID"});
    return Feedbacks;
}