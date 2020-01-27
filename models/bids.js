/**
 *  This module is use to define DAO for Bids model
 *  @module Bids model
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
    const Bids = sequelize.define('Bids', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true  
        },
        bidDate: {
            type: Sequelize.STRING,
        },
        amount: {
            type: Sequelize.INTEGER
        },
        // bidBy: {
        //     type: Sequelize.INTEGER,
        // },
        // bidFor: {
        //     type: Sequelize.INTEGER,
        // },
        
        // notificationId: {
        //     type: Sequelize.DATE
        // },
        // returnPeriod: {
        //     type: Sequelize.DATE
        // },
        isDeleted: {
            type: Sequelize.TINYINT,
            defaultValue: 0
        }
    })
    
    Bids.belongsTo(Users, {as:"bidBy"});
    Bids.belongsTo(Users, {as:"bidFor"});
    Bids.belongsTo(Notifications, {as:"notificationId"});
    return Bids;
}