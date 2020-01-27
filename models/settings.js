/**
 *  This module is use to define DAO for Settings model
 *  @module Settings model
 *  @author Shubham Gorde
 *  @version 1.0.0
 */
const db=require('../config/databaseConnection');
const Sequelize = require('sequelize');
var sequelize = db.sequelize;

console.log("db",db);
module.exports = function (sequelize, DataTypes) {
    var Users = sequelize.import('../models/' + 'users');
    const Settings = sequelize.define('Settings', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true  
        },
        settingsName: {
            type: Sequelize.STRING,
        // },
        // userId: {
        //     type: Sequelize.INTEGER
        },
        isDeleted: {
            type: Sequelize.TINYINT,
            defaultValue: 0
        }
    })
    
    Settings.belongsTo(Users, {as:"userId"});
    return Settings;
}