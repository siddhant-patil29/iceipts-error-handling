/**
 *  This module is use to define DAO for Tags model
 *  @module Visitors model
 *  @author Shubham Gorde
 *  @version 1.0.0
 */
const db=require('../config/databaseConnection');
const Sequelize = require('sequelize');
var sequelize = db.sequelize;
module.exports = function (sequelize, DataTypes) {
    const Visitors = sequelize.define('Visitors', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true  
        },
        email: {
            type: Sequelize.STRING,
        },
        isDeleted: {
            type: Sequelize.TINYINT,
            defaultValue: 0
        }
    })
    
    return Visitors;
}