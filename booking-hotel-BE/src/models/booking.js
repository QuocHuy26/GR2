'use strict';
const { Model } = require('sequelize');
const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
    class Booking extends Model {
        static associate(models) {
            Booking.belongsTo(models.Room, {
                foreignKey: 'room_id',
                as: 'fk_book_room'
            });
            Booking.belongsTo(models.User, {
                foreignKey: 'user_id',
                as: 'fk_book_user'
            });
        }
    };
    Booking.init({
        book_id: {
            type: DataTypes.STRING,
            defaultValue: uuidv4,
            allowNull: false,
            primaryKey: true
        },
        user_id: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        hotel_id: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        room_id: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        checkinDate: DataTypes.DATE,
        checkoutDate: DataTypes.DATE,
        status: DataTypes.INTEGER,
        bookDate: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    }, {
        sequelize,
        modelName: 'Booking',
    });

    // Tạo UUID trước khi tạo bản ghi mới
    Booking.beforeCreate(booking => booking.book_id = uuidv4());

    return Booking;
};