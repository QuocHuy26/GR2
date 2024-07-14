'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Images', {
            image_id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.STRING
            },
            url: {
                allowNull: false,
                type: Sequelize.STRING
            },
            hotel_id: {
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
        await queryInterface.dropTable('Images');
    }
};