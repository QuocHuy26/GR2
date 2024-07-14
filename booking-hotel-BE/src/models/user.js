'use strict';
const { Model } = require('sequelize');
const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        static associate(models) {
            //define association here
        }
    };
    User.init({
        user_id: {
            type: DataTypes.STRING,
            defaultValue: uuidv4, // Sử dụng UUID làm giá trị mặc định
            allowNull: false,
            primaryKey: true
        },
        username: DataTypes.STRING,
        phone: DataTypes.STRING,
        role: DataTypes.INTEGER,
        email: DataTypes.STRING,
        password: DataTypes.STRING

    }, {
        sequelize,
        modelName: 'User',
    });

    // Tạo UUID trước khi tạo bản ghi mới
    User.beforeCreate(user => user.user_id = uuidv4());

    return User;
};