/**
 *  This module is use to define DAO for receipts model
 *  @module receipts model
 *  @author Shubham Gorde
 *  @version 1.0.0
 */
const db=require('../config/databaseConnection');
const Sequelize = require('sequelize');
var sequelize = db.sequelize;

console.log("db",db);
module.exports = function (sequelize, DataTypes) {
    var Users = sequelize.import('../models/' + 'users');
    var Tags = sequelize.import('../models/' + 'tags');
    const Receipts = sequelize.define('Receipts', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true  
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
            // allowNull: false,
        },
        vendor: {
            type: Sequelize.STRING,
            defaultValue: "test"
            // allowNull: false,
        },
        receiptCardBlobUrl: {
            type: Sequelize.STRING,
        },
        createDate: {
            type: Sequelize.STRING,
            defaultValue: (new Date()).getMilliseconds().toString()
            // allowNull: false,
        // },
    
        // tagId: {
        //     type: Sequelize.INTEGER,
        // },
        
        // customerId: {
        //     type: Sequelize.STRING
        },
    
        IsReimbursible: {
            type: Sequelize.STRING
        },
    
        reimbursiblePeriod: {
            type: Sequelize.STRING
        },
    
        totalBill: {
            type: Sequelize.INTEGER
        },
    
        NoOfItems: {
            type: Sequelize.INTEGER
        },
        isDeleted: {
            type: Sequelize.TINYINT,
            defaultValue: 0
        }
    })
    
    Receipts.belongsTo(Users, {as:"customer"});
    Receipts.belongsTo(Tags, {as:"tag"});
    return Receipts;
}