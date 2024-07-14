'use strict';
const { Model } = require('sequelize');
const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
    class Room extends Model {
        static associate(models) {
            Room.belongsTo(models.Hotel, {
                foreignKey: 'hotel_id',
                as: 'fk_room_hotel'
            });
            Room.hasMany(models.Booking, {
                foreignKey: 'room_id',
                as: 'fk_book_room'
            });
        }
    };
    Room.init({
        room_id: {
            type: DataTypes.STRING,
            defaultValue: uuidv4, // Sử dụng UUID làm giá trị mặc định
            allowNull: false,
            primaryKey: true
        },
        hotel_id: DataTypes.STRING,
        room_name: DataTypes.STRING,
        type: DataTypes.INTEGER,
        price: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'Room',
    });

    // Tạo UUID trước khi tạo bản ghi mới
    Room.beforeCreate(room => room.room_id = uuidv4());

    return Room;
};