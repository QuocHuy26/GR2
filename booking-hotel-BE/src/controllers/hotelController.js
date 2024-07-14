import db from "../models/index";

exports.createHotel = async (req, res) => {
    try {
        const imagePath = 'http://localhost:8080/' + req.file.path.replace(/\\/g, '/');
        const {
            name,
            phone,
            min_price,
            max_price,
            province_id,
            district_id,
            address,
            lat_address,
            long_address,
            description,
            user_id,
        } = req.body;
        await db.Hotel.create({
            name: name,
            phone: phone,
            image: imagePath,
            min_price: min_price,
            max_price: max_price,
            province_id: province_id,
            district_id: district_id,
            address: address,
            lat_address: lat_address,
            long_address: long_address,
            description: description,
            user_id: user_id,
        });
        res.status(201).json({ status: 201, message: 'Tạo khách sạn thành công' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

exports.getHotelListByAddress = async (req, res) => {
    try {
        let result;
        if (req.params.district_id === 'undefined' && req.params.province_id === 'undefined') {
            result = await db.Hotel.findAndCountAll({
                attributes: [
                    ['hotel_id', 'id'],
                    'name',
                    'image',
                    'phone',
                    'max_price',
                    'min_price',
                    'province_id',
                    'district_id',
                    'address',
                    'lat_address',
                    'long_address',
                    'description',
                ],
            })
        }
        if (req.params.district_id === 'undefined' && req.params.province_id !== 'undefined') {
            result = await db.Hotel.findAndCountAll({
                attributes: [
                    ['hotel_id', 'id'],
                    'name',
                    'image',
                    'phone',
                    'max_price',
                    'min_price',
                    'province_id',
                    'district_id',
                    'address',
                    'lat_address',
                    'long_address',
                    'description',
                ],
                where: {
                    province_id: req.params.province_id,
                },
            })
        }
        if (req.params.district_id !== 'undefined' && req.params.province_id !== 'undefined') {
            result = await db.Hotel.findAndCountAll({
                attributes: [
                    ['hotel_id', 'id'],
                    'name',
                    'image',
                    'phone',
                    'max_price',
                    'min_price',
                    'province_id',
                    'district_id',
                    'address',
                    'lat_address',
                    'long_address',
                    'description',
                ],
                where: {
                    province_id: req.params.province_id,
                    district_id: req.params.district_id,
                },
            })
        }
        res.status(200).json({
            status: 200,
            message: 'Lấy danh sách khách sạn thành công',
            hotel_list: result.rows,
            total: result.count
        })
    } catch (err) {
        res.status(500).json({
            status: 500,
            message: 'Đã xảy ra lỗi khi lấy danh sách khách sạn',
            error: err.message
        });
    }
}

exports.getHotelListByUserId = async (req, res) => {
    try {
        const result = await db.Hotel.findAndCountAll({
            attributes: [
                ['hotel_id', 'id'],
                'name',
                'image',
                'phone',
                'max_price',
                'min_price',
                'province_id',
                'district_id',
                'address',
                'lat_address',
                'long_address',
                'description',
            ],
            where: {
                user_id: req.params.id,
            },
        });
        res.status(200).json({
            status: 200,
            message: 'Lấy thông tin thành công',
            hotel_list: result.rows,
            total: result.count
        })
    } catch (err) {
        res.status(500).json({
            status: 500,
            message: 'Đã xảy ra lỗi khi lấy thông tin',
            error: err.message
        });
    }
}

exports.getHotelDetails = async (req, res) => {
    try {
        const hotel = await db.Hotel.findByPk(req.params.id, {
            attributes: [
                ['hotel_id', 'id'],
                'name',
                'image',
                'phone',
                'max_price',
                'min_price',
                'province_id',
                'district_id',
                'address',
                'lat_address',
                'long_address',
                'description',
            ],
        });
        res.status(200).json({
            status: 200,
            message: 'Lấy thông tin thành công',
            hotel
        })
    } catch (err) {
        res.status(500).json({
            status: 500,
            message: 'Đã xảy ra lỗi khi lấy thông tin',
            error: err.message
        });
    }
}

exports.updateHotel = async (req, res) => {
    const hotel = req.body;
    try {
        await db.Hotel.update(
            hotel,
            {
                where: {
                    hotel_id: req.params.id,
                },
            },
        );
        res.status(200).json({
            status: 200,
            message: 'Cập nhật thông tin thành công'
        });
    } catch (err) {
        res.status(500).json({
            status: 500,
            message: 'Đã xảy ra lỗi khi cập nhật thông tin',
            error: err.message
        });
    }
}

exports.deleteHotel = async (req, res) => {
    try {
        await db.Hotel.destroy({
            where: {
                hotel_id: req.params.id,
            },
        });
        res.status(200).json({
            status: 200,
            message: 'Xóa thành công'
        });
    } catch (err) {
        res.status(500).json({
            status: 500,
            message: 'Đã xảy ra lỗi khi xóa',
            error: err.message
        });
    }
}