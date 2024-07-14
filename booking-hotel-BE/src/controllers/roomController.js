import db from "../models/index";

exports.createRoom = async (req, res) => {
    const room = req.body;
    try {
        await db.Room.create(room);
        res.status(201).json({ status: 201, message: 'Tạo phòng thành công' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

exports.getRoomList = async (req, res) => {
    try {
        const room_list = await db.Room.findAll({
            attributes: [
                'room_id',
                'room_name',
                'type',
                'price',
            ],
            where: {
                hotel_id: req.params.id,
            },
            order: [['room_name', 'ASC']]
        });
        res.status(200).json({
            status: 200,
            message: 'Lấy danh sách phòng thành công',
            room_list
        })
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

exports.updateRoom = async (req, res) => {
    const room = req.body;
    try {
        await db.Room.upate(
            room,
            {
                where: {
                    room_id: req.params.id,
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

exports.getRoomDetails = async (req, res) => {
    try {
        const room = await db.Room.findByPk(req.params.id);
        res.status(200).json({
            status: 200,
            message: 'Lấy thông tin thành công',
            room
        });
    } catch (err) {
        res.status(500).json({
            status: 500,
            message: 'Đã xảy ra lỗi',
            error: err.message
        });
    }
}

exports.deleteRoom = async (req, res) => {
    try {
        await db.Room.destroy({
            where: {
                room_id: req.params.id,
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