/**
 *  This module is used to define DAO for TransactionHistory model
 *  @module TransactionHistory model
 *  @author Shubham.Gorde
 *  @version 1.0.0
 */
const db=require('../config/databaseConnection');
const Sequelize = require('sequelize');
var sequelize = db.sequelize;

console.log("db",db);
module.exports = function (sequelize, DataTypes) {
    const Users = sequelize.import('../models/' + 'users');
    const Receipts = sequelize.import('../models/' + 'receipts');
    const TransactionHistory = sequelize.define('TransactionHistory', {
        id: {
            type: Sequelize.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
    
        transactionAmount: {
            type: Sequelize.FLOAT
        },
        
        paidAmount: {
            type: Sequelize.FLOAT
        },
        
        isDeleted: {
            type: Sequelize.TINYINT,
            defaultValue: 0
        }
    })
    
    TransactionHistory.belongsTo(Users, {as:"customer"});
    TransactionHistory.belongsTo(Users, {as:"retailer"});
    TransactionHistory.belongsTo(Receipts, {as:"receipt"});
    return TransactionHistory;
}