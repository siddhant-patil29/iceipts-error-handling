/**
 *  This module is use to define DAO for Subscription model
 *  @module Subscription model
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
    const Subscriptions = sequelize.define('Subscriptions', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true  
        },
        type: {
            type: Sequelize.STRING,
        },
        description: {
            type: Sequelize.STRING
        },
        rechargeOn: {
            type: Sequelize.STRING,
        },
        validity: {
            type: Sequelize.STRING,
        },
        fee: {
            type: Sequelize.INTEGER,
        },
        // notificationId: {
        //     type: Sequelize.INTEGER,
        // },
        // subscriberId: {
        //     type: Sequelize.INTEGER,
        // },
        isDeleted: {
            type: Sequelize.TINYINT,
            defaultValue: 0
        }
    })
    Subscriptions.belongsTo(Users, {as:"subscriber"});
    Subscriptions.belongsTo(Notifications, {as:"notification"});
    return Subscriptions;
}