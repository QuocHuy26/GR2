'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Rooms', {
            room_id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.STRING
            },
            hotel_id: {
                allowNull: false,
                type: Sequelize.STRING
            },
            room_name: {
                allowNull: false,
                type: Sequelize.STRING
            },
            type: {
                allowNull: false,
                type: Sequelize.INTEGER
            },
            price: {
                allowNull: false,
                type: Sequelize.INTEGER
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
        await queryInterface.dropTable('Rooms');
    }
};