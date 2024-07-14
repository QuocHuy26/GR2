'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Bookings', {
            book_id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.STRING
            },
            user_id: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            hotel_id: {
                allowNull: false,
                type: Sequelize.STRING
            },
            room_id: {
                allowNull: false,
                type: Sequelize.STRING
            },
            checkinDate: {
                allowNull: false,
                type: Sequelize.DATE
            },
            checkoutDate: {
                allowNull: false,
                type: Sequelize.DATE
            },
            status: {
                allowNull: false,
                type: Sequelize.INTEGER
            },
            bookDate: {
                allowNull: false,
                type: Sequelize.DATE
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
        await queryInterface.dropTable('Bookings');
    }
};