/**
 *  This module is use to define DAO for Warranty model
 *  @module Warranty model
 *  @author Shubham Gorde
 *  @version 1.0.0
 */
const db=require('../config/databaseConnection');
const Sequelize = require('sequelize');
var sequelize = db.sequelize;

console.log("db",db);
module.exports = function (sequelize, DataTypes) {
    var WarrantyItems = sequelize.import('../models/' + 'warrantyItems');
    var Notifications = sequelize.import('../models/' + 'notifications');
    const Warranties = sequelize.define('Warranties', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true  
        },
        warrantyPeriodRemain: {
            type: Sequelize.INTEGER,
        },
        // notificationId: {
        //     type: Sequelize.INTEGER
        // },
        isDeleted: {
            type: Sequelize.TINYINT,
            defaultValue: 0
        }
    })
    
    Warranties.belongsTo(Notifications, {as:"notification"});
    Warranties.belongsTo(WarrantyItems, {as:"WarrantyItems"});
    return Warranties;
}