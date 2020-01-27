/**
 *  This module is use to define DAO for WarrantyItems model
 *  @module WarrantyItems model
 *  @author Shubham Gorde
 *  @version 1.0.0
 */
const db=require('../config/databaseConnection');
const Sequelize = require('sequelize');
var sequelize = db.sequelize;

console.log("db",db);
module.exports = function (sequelize, DataTypes) {
    var Receipts = sequelize.import('../models/' + 'receipts');
    var Notification = sequelize.import('../models/' + 'notifications');
    const WarrantyItems = sequelize.define('WarrantyItems', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true  
        },
        productId: {
            type: Sequelize.INTEGER
        },
        productName: {
            type: Sequelize.STRING,
        },
        price: {
            type: Sequelize.INTEGER,
        },
        warrantyPeriod: {
            type: Sequelize.STRING
        },
        returnPeriod: {
            type: Sequelize.STRING
        },
        isDeleted: {
            type: Sequelize.TINYINT,
            defaultValue: 0
        },
        warrantryCard: {
            type: Sequelize.BLOB
        }
       
    })
    
    WarrantyItems.belongsTo(Receipts, {as:"receipt"});
    WarrantyItems.belongsTo(Notification, {as:"notification"});
    return WarrantyItems;
}