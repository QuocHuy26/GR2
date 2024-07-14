'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class District extends Model {
        static associate(models) {
            District.belongsTo(models.Province, {
                foreignKey: 'province_id',
                as: 'province'
            });
        }
    };
    District.init({
        district_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        name: DataTypes.STRING,
        type: DataTypes.STRING,
        province_id: {
            allowNull: false,
            type: DataTypes.INTEGER,
        },
    }, {
        sequelize,
        modelName: 'District',
    });

    return District;
};