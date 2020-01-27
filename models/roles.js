/**
 *  This module is use to define DAO for role model
 *  @module role model
 *  @author Shubham.Gorde
 *  @version 1.0.0
 */
const db=require('../config/databaseConnection');
const Sequelize = require('sequelize');
console.log("db:",db);
var sequelize = db.sequelize;
module.exports = function (sequelize, DataTypes) {
    const Roles = sequelize.define('Roles', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true  
        },

        roleName: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },

        isDeleted: {
            type: Sequelize.SMALLINT,
            defaultValue: 0
        }
    });
    return Roles;
}

// module.exports = Roles;