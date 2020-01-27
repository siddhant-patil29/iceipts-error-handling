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
    const CustomerRetailerAssocation = sequelize.define('CustomerRetailerAssocation', {
        id: {
            type: Sequelize.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
    
        balance: {
            type: Sequelize.FLOAT
        },
        
        notificationAfter: {
            type: Sequelize.STRING
        },

        loyalty: {
            type: Sequelize.STRING
        },

        currency: {
            type: Sequelize.STRING
        },
        
        isDeleted: {
            type: Sequelize.TINYINT,
            defaultValue: 0
        }
    })
    
    CustomerRetailerAssocation.belongsTo(Users, {as:"customer"});
    CustomerRetailerAssocation.belongsTo(Users, {as:"retailer"});

    return CustomerRetailerAssocation;
}