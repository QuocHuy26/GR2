'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Users', {
            user_id: {
                allowNull: false,
                // autoIncrement: true //chỉ dùng cho kiểu Integer
                primaryKey: true,
                type: Sequelize.STRING
            },
            username: {
                allowNull: false,
                type: Sequelize.STRING
            },
            phone: {
                allowNull: false,
                type: Sequelize.STRING
            },
            role: {
                allowNull: false,
                type: Sequelize.INTEGER
            },
            email: {
                allowNull: false,
                type: Sequelize.STRING
            },
            password: {
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
        await queryInterface.dropTable('Users');
    }
};