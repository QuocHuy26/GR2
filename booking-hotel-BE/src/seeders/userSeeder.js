'use strict';
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Users', [
            {
                user_id: uuidv4(),
                username: 'admin',
                phone: '0326235066',
                role: 0,
                email: 'admin@gmail.com',
                password: await bcrypt.hash('123456789', 10)
            },
            {
                user_id: uuidv4(),
                username: 'HotelManager',
                phone: '0123456789',
                role: 1,
                email: 'hotelmanager@gmail.com',
                password: await bcrypt.hash('123456789', 10)
            },
            {
                user_id: uuidv4(),
                username: 'Customer',
                phone: '0987654321',
                role: 2,
                email: 'customer@gmail.com',
                password: await bcrypt.hash('123456789', 10)
            }
        ])
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('Users', null, {});
    }
};