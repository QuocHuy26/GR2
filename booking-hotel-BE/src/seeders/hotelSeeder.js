'use strict';
const { v4: uuidv4 } = require('uuid');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Hotels', [
            {
                hotel_id: uuidv4(),
                name: 'Hasu Village',
                phone: '0999888777',
                max_price: '700000',
                min_price: '400000',
                image: 'https://api.pipgo.vn/images/general/1678354478469-575023308.jpg',
                province_id: 17,
                district_id: 148,
                address: 'xóm Nước Hang, xã Mông Hoá, Thành Phố Hoà Bình, Tỉnh Hoà Bình',
                lat_address: '20.902695143803733',
                long_address: '105.41880782505218',
                description: 'Hasu Village - Biệt thự nghỉ dưỡng núi Hoà Bình. Chúng tôi cố gắng để mọi thứ trở nên tự nhiên và đơn giản theo truyền thống Nhật Bản. Những gam màu nhã nhặn từ vật liệu thiên nhiên và những họa tiết mang hơi thở của văn hóa Nhật Bản là những điều mà mỗi người sẽ cảm nhận khi đặt chân đến nơi đây. Sự sang trọng không thể hiện trong những sắc màu rực rỡ mà tinh thế, thanh lịch và khiêm nhường như nét văn hóa lâu đời của Nhật Bản.'
            },
            {
                hotel_id: uuidv4(),
                name: '6Nature Bavi Retreat',
                phone: '0998884411',
                max_price: '800000',
                min_price: '500000',
                image: 'https://api.pipgo.vn/images/general/1684729959427-656824176.jpg',
                province_id: 1,
                district_id: 271,
                address: 'Yên Bài, Ba Vì, Hà Nội',
                description: '6Nature Bavi hoạt động theo mô hình Retreat đề cao tính nghỉ dưỡng trải nghiệm, gần gũi thiên nhiên nhưng vẫn đảm bảo tiện nghi.'
            },
            {
                hotel_id: uuidv4(),
                name: 'Roses Villa',
                phone: '0999888777',
                max_price: '780000',
                min_price: '450000',
                image: 'https://2.bp.blogspot.com/-cata1dVMp1Y/WsOIq_pIQPI/AAAAAAAAAE0/OmIOKwaRf2AkH0-snweAuCrU5eq__94yQCLcBGAs/s1600/nhieu-loai-phong-khach-nhau.jpg',
                province_id: 26,
                district_id: 248,
                address: 'thị trấn Tam Đảo, Vĩnh Phúc',
                description: 'Biệt thự hoa hồng Tam Đảo hay còn được biết đến với tên gọi Rose Villa. Đây là một nơi chốn lý tưởng dành cho mọi du khách khi đến với Tam Đảo.'
            }
        ])
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('Hotels', null, {});
    }
};