'use strict';
const { Model } = require('sequelize');
const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
    class Image extends Model {
        static associate(models) {
            //define association here
        }
    };
    Image.init({
        image_id: {
            type: DataTypes.STRING,
            defaultValue: uuidv4, // Sử dụng UUID làm giá trị mặc định
            allowNull: false,
            primaryKey: true
        },
        url: DataTypes.STRING,
        hotel_id: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'Image',
    });

    // Tạo UUID trước khi tạo bản ghi mới
    Image.beforeCreate(image => image.image_id = uuidv4());

    return Image;
};