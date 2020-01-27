/**
 *  This module is use to define DAO for reimbursement model
 *  @module Reimbursement model
 *  @author Shubham Gorde
 *  @version 1.0.0
 */
const db=require('../config/databaseConnection');
const Sequelize = require('sequelize');
var sequelize = db.sequelize;

console.log("db",db);
module.exports = function (sequelize, DataTypes) {
    var Receipts = sequelize.import('../models/' + 'receipts');
    var Notifications = sequelize.import('../models/' + 'notifications');
    const Reimbursements = sequelize.define('Reimbursements', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true  
        },
        // receiptId: {
        //     type: Sequelize.INTEGER,
        // },
        reimbursementPeriod: {
            type: Sequelize.STRING
        },
        // notificationId: {
        //     type: Sequelize.STRING,
        // },
        isDeleted: {
            type: Sequelize.TINYINT,
            defaultValue: 0
        }
    })
    Reimbursements.belongsTo(Receipts, {as:"receipt"});
    Reimbursements.belongsTo(Notifications, {as:"notification"});
    return Reimbursements;
}