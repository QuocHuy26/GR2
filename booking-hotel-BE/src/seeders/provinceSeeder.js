'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Provinces', [
            { province_id: 1, name: 'Thành phố Hà Nội', type: 'Thành phố Trung ương' },
            { province_id: 2, name: 'Tỉnh Hà Giang', type: 'Tỉnh' },
            { province_id: 4, name: 'Tỉnh Cao Bằng', type: 'Tỉnh' },
            { province_id: 6, name: 'Tỉnh Bắc Kạn', type: 'Tỉnh' },
            { province_id: 8, name: 'Tỉnh Tuyên Quang', type: 'Tỉnh' },
            { province_id: 10, name: 'Tỉnh Lào Cai', type: 'Tỉnh' },
            { province_id: 11, name: 'Tỉnh Điện Biên', type: 'Tỉnh' },
            { province_id: 12, name: 'Tỉnh Lai Châu', type: 'Tỉnh' },
            { province_id: 14, name: 'Tỉnh Sơn La', type: 'Tỉnh' },
            { province_id: 15, name: 'Tỉnh Yên Bái', type: 'Tỉnh' },
            { province_id: 17, name: 'Tỉnh Hòa Bình', type: 'Tỉnh' },
            { province_id: 19, name: 'Tỉnh Thái Nguyên', type: 'Tỉnh' },
            { province_id: 20, name: 'Tỉnh Lạng Sơn', type: 'Tỉnh' },
            { province_id: 22, name: 'Tỉnh Quảng Ninh', type: 'Tỉnh' },
            { province_id: 24, name: 'Tỉnh Bắc Giang', type: 'Tỉnh' },
            { province_id: 25, name: 'Tỉnh Phú Thọ', type: 'Tỉnh' },
            { province_id: 26, name: 'Tỉnh Vĩnh Phúc', type: 'Tỉnh' },
            { province_id: 27, name: 'Tỉnh Bắc Ninh', type: 'Tỉnh' },
            { province_id: 30, name: 'Tỉnh Hải Dương', type: 'Tỉnh' },
            { province_id: 31, name: 'Thành phố Hải Phòng', type: 'Thành phố Trung ương' },
            { province_id: 33, name: 'Tỉnh Hưng Yên', type: 'Tỉnh' },
            { province_id: 34, name: 'Tỉnh Thái Bình', type: 'Tỉnh' },
            { province_id: 35, name: 'Tỉnh Hà Nam', type: 'Tỉnh' },
            { province_id: 36, name: 'Tỉnh Nam Định', type: 'Tỉnh' },
            { province_id: 37, name: 'Tỉnh Ninh Bình', type: 'Tỉnh' },
            { province_id: 38, name: 'Tỉnh Thanh Hóa', type: 'Tỉnh' },
            { province_id: 40, name: 'Tỉnh Nghệ An', type: 'Tỉnh' },
            { province_id: 42, name: 'Tỉnh Hà Tĩnh', type: 'Tỉnh' },
            { province_id: 44, name: 'Tỉnh Quảng Bình', type: 'Tỉnh' },
            { province_id: 45, name: 'Tỉnh Quảng Trị', type: 'Tỉnh' },
            { province_id: 46, name: 'Tỉnh Thừa Thiên Huế', type: 'Tỉnh' },
            { province_id: 48, name: 'Thành phố Đà Nẵng', type: 'Thành phố Trung ương' },
            { province_id: 49, name: 'Tỉnh Quảng Nam', type: 'Tỉnh' },
            { province_id: 51, name: 'Tỉnh Quảng Ngãi', type: 'Tỉnh' },
            { province_id: 52, name: 'Tỉnh Bình Định', type: 'Tỉnh' },
            { province_id: 54, name: 'Tỉnh Phú Yên', type: 'Tỉnh' },
            { province_id: 56, name: 'Tỉnh Khánh Hòa', type: 'Tỉnh' },
            { province_id: 58, name: 'Tỉnh Ninh Thuận', type: 'Tỉnh' },
            { province_id: 60, name: 'Tỉnh Bình Thuận', type: 'Tỉnh' },
            { province_id: 62, name: 'Tỉnh Kon Tum', type: 'Tỉnh' },
            { province_id: 64, name: 'Tỉnh Gia Lai', type: 'Tỉnh' },
            { province_id: 66, name: 'Tỉnh Đắk Lắk', type: 'Tỉnh' },
            { province_id: 67, name: 'Tỉnh Đắk Nông', type: 'Tỉnh' },
            { province_id: 68, name: 'Tỉnh Lâm Đồng', type: 'Tỉnh' },
            { province_id: 70, name: 'Tỉnh Bình Phước', type: 'Tỉnh' },
            { province_id: 72, name: 'Tỉnh Tây Ninh', type: 'Tỉnh' },
            { province_id: 74, name: 'Tỉnh Bình Dương', type: 'Tỉnh' },
            { province_id: 75, name: 'Tỉnh Đồng Nai', type: 'Tỉnh' },
            { province_id: 77, name: 'Tỉnh Bà Rịa - Vũng Tàu', type: 'Tỉnh' },
            { province_id: 79, name: 'Thành phố Hồ Chí Minh', type: 'Thành phố Trung ương' },
            { province_id: 80, name: 'Tỉnh Long An', type: 'Tỉnh' },
            { province_id: 82, name: 'Tỉnh Tiền Giang', type: 'Tỉnh' },
            { province_id: 83, name: 'Tỉnh Bến Tre', type: 'Tỉnh' },
            { province_id: 84, name: 'Tỉnh Trà Vinh', type: 'Tỉnh' },
            { province_id: 86, name: 'Tỉnh Vĩnh Long', type: 'Tỉnh' },
            { province_id: 87, name: 'Tỉnh Đồng Tháp', type: 'Tỉnh' },
            { province_id: 89, name: 'Tỉnh An Giang', type: 'Tỉnh' },
            { province_id: 91, name: 'Tỉnh Kiên Giang', type: 'Tỉnh' },
            { province_id: 92, name: 'Thành phố Cần Thơ', type: 'Thành phố Trung ương' },
            { province_id: 93, name: 'Tỉnh Hậu Giang', type: 'Tỉnh' },
            { province_id: 94, name: 'Tỉnh Sóc Trăng', type: 'Tỉnh' },
            { province_id: 95, name: 'Tỉnh Bạc Liêu', type: 'Tỉnh' },
            { province_id: 96, name: 'Tỉnh Cà Mau', type: 'Tỉnh' },
        ])
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('Provinces', null, {});
    }
};