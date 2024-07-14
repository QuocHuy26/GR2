'use strict';
const { Model } = require('sequelize');
const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
    class Hotel extends Model {
        static associate(models) {
            Hotel.belongsTo(models.User, {
                foreignKey: 'user_id',
                as: 'fk_hotel_user'
            });
            Hotel.hasMany(models.Room, {
                foreignKey: 'hotel_id',
                as: 'fk_room_hotel'
            });
        }
    };
    Hotel.init({
        hotel_id: {
            type: DataTypes.STRING,
            defaultValue: uuidv4, // Sử dụng UUID làm giá trị mặc định
            allowNull: false,
            primaryKey: true
        },
        name: DataTypes.STRING,
        image: DataTypes.STRING,
        phone: DataTypes.STRING,
        max_price: DataTypes.STRING,
        min_price: DataTypes.STRING,
        province_id: DataTypes.INTEGER,
        district_id: DataTypes.INTEGER,
        address: DataTypes.STRING,
        lat_address: DataTypes.STRING,
        long_address: DataTypes.STRING,
        description: DataTypes.TEXT,
        user_id: DataTypes.STRING

    }, {
        sequelize,
        modelName: 'Hotel',
    });

    // Tạo UUID trước khi tạo bản ghi mới
    Hotel.beforeCreate(hotel => hotel.hotel_id = uuidv4());

    return Hotel;
};