'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Hotels', {
            hotel_id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.STRING
            },
            name: {
                allowNull: false,
                type: Sequelize.STRING
            },
            image: {
                allowNull: false,
                type: Sequelize.STRING
            },
            phone: {
                allowNull: false,
                type: Sequelize.STRING
            },
            max_price: {
                allowNull: false,
                type: Sequelize.STRING
            },
            min_price: {
                allowNull: false,
                type: Sequelize.STRING
            },
            province_id: {
                allowNull: false,
                type: Sequelize.INTEGER
            },
            district_id: {
                allowNull: false,
                type: Sequelize.INTEGER
            },
            address: {
                allowNull: false,
                type: Sequelize.STRING
            },
            lat_address: {
                type: Sequelize.STRING
            },
            long_address: {
                type: Sequelize.STRING
            },
            description: {
                type: Sequelize.TEXT
            },
            user_id: {
                allowNull: false,
                type: Sequelize.STRING
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('Hotels');
    }
};