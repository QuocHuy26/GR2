'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Province extends Model {
        static associate(models) {
            Province.hasMany(models.District, {
                foreignKey: 'province_id',
                as: 'districts'
            });
        }
    };
    Province.init({
        province_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        name: DataTypes.STRING,
        type: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Province',
    });

    return Province;
};