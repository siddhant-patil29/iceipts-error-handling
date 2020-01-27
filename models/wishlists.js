/**
 *  This module is use to define DAO for Wishlist model
 *  @module Wishlist model
 *  @author Shubham Gorde
 *  @version 1.0.0
 */
const db=require('../config/databaseConnection');
const Sequelize = require('sequelize');
var sequelize = db.sequelize;

console.log("db",db);
module.exports = function (sequelize, DataTypes) {
    var Notification = sequelize.import('../models/' + 'notifications');
    const Wishlists = sequelize.define('Wishlists', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true  
        },
        itemName: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        budgetMin: {
            type: Sequelize.INTEGER
        },
        budgetMax: {
            type: Sequelize.INTEGER,
        },
        description: {
            type: Sequelize.STRING,
        },
        
        wishlistedBy: {
            type: Sequelize.INTEGER
        },
        // notificationId: {
        //     type: Sequelize.INTEGER
        // },
        isDeleted: {
            type: Sequelize.TINYINT,
            defaultValue: 0
        }
    })

    Wishlists.belongsTo(Notification, {as:"notification"});
    return Wishlists;
}