/**
 *  This module is use to define DAO for user model
 *  @module user model
 *  @author Shubham.Gorde
 *  @version 1.0.0
 */
const db=require('../config/databaseConnection');
const Sequelize = require('sequelize');
var sequelize = db.sequelize;

console.log("db",db);
module.exports = function (sequelize, DataTypes) {
    var Roles = sequelize.import('../models/' + 'roles');
    const Users = sequelize.define('Users', {
        id: {
            type: Sequelize.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                isEmail: {
                    args: true,
                    msg: 'The email you entered is invalid.'
                }
            }
        },
        password: {
            type: Sequelize.STRING
        },
        mobileNumber: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: {
                args: true
            }
        },
    
        name: {
            type: Sequelize.STRING
        },
        
        address: {
            type: Sequelize.STRING
        },
    
        district: {
            type: Sequelize.STRING
        },
    
        state: {
            type: Sequelize.STRING
        },
    
        pin: {
            type: Sequelize.STRING
        },
    
        gstin: {
            type: Sequelize.STRING
        },
    
        // customerId: {
        //     type: Sequelize.STRING
        // },
    
        currency: {
            type: Sequelize.STRING
        },
    
        loyalty: {
            type: Sequelize.STRING
        },
    
        // roleId: {
        //     type: DataTypes.INTEGER,
        //     allowNull: false,
        //     validate: {
        //         len: {
        //             args: [1, 255],
        //             msg: 'RoleId cannot be empty.'
        //         }
        //     }
        // },
        
        isDeleted: {
            type: Sequelize.TINYINT,
            defaultValue: 0
        }
    })
    
    Users.belongsTo(Roles, {as:"role"});
    return Users;
}

// Users.associate = (models) => {
//     Users.belongsTo(models.Roles)
// };

// module.exports = Users;