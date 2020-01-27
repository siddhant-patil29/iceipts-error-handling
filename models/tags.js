/**
 *  This module is use to define DAO for Tags model
 *  @module Tags model
 *  @author Shubham Gorde
 *  @version 1.0.0
 */
const db=require('../config/databaseConnection');
const Sequelize = require('sequelize');
var sequelize = db.sequelize;

console.log("db",db);
module.exports = function (sequelize, DataTypes) {
    var Users = sequelize.import('../models/' + 'users');
    const Tags = sequelize.define('Tags', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true  
        },
        tagName: {
            type: Sequelize.STRING,
        },
        // userId: {
        //     type: Sequelize.INTEGER
        // },
        isDeleted: {
            type: Sequelize.TINYINT,
            defaultValue: 0
        }
    })
    
    Tags.belongsTo(Users, {as:"user"});
    return Tags;
}