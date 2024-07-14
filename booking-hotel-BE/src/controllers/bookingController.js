import db, { Sequelize } from "../models/index";

exports.createBooking = async (req, res) => {
    const { bookingRooms, user_id, hotel_id, checkinDate, checkoutDate, status } = req.body;
    try {
        await bookingRooms.forEach(room_id => {
            db.Booking.create({ room_id, user_id, hotel_id, checkinDate, checkoutDate, status });
        });
        res.status(201).json({ status: 201, message: 'Tạo đơn thành công' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

exports.getBookingList = async (req, res) => {
    try {
        // const booking_list = await db.Booking.findAll({
        //     attributes: ['book_id', 'checkinDate', 'checkoutDate', 'status'],
        //     include: [
        //         {
        //             model: db.Room,
        //             attributes: ['room_id', 'room_name', 'type', 'price'],
        //             as: 'fk_book_room',
        //             include: [
        //                 {
        //                     model: db.Hotel,
        //                     attributes: ['hotel_id', 'hotel_name', 'phone', 'address'],
        //                     as: 'fk_room_hotel',
        //                 }
        //             ]
        //         }
        //     ],
        //     where: {
        //         user_id: req.params.id,
        //     }
        // });
        let booking_list = await db.Booking.findAll({
            attributes: ['book_id', 'user_id', 'room_id', 'hotel_id', 'bookDate', 'checkinDate', 'checkoutDate', 'status'],
            where: {
                user_id: req.params.id,
            },
            order: [['bookDate', 'DESC']]
        })
        res.status(200).json({
            status: 200,
            message: 'Lấy thông tin booking thành công',
            booking_list
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            status: 500,
            message: 'Đã xảy ra lỗi khi lấy thông tin booking',
            error: err.message
        });
    }
}

exports.updateBooking = async (req, res) => {
    const booking = req.body;
    try {
        await db.Booking.update(
            booking,
            {
                where: {
                    book_id: req.params.id,
                },
            },
        );
        res.status(200).json({
            status: 200,
            message: 'Cập nhật thành công'
        });
    } catch (err) {
        res.status(500).json({
            status: 500,
            message: 'Đã xảy ra lỗi khi cập nhật thông tin',
            error: err.message
        });
    }
}

exports.getBookingListByHotel = async (req, res) => {
    try {
        const booking_list = await db.Booking.findAll({
            attributes: ['book_id', 'user_id', 'room_id', 'hotel_id', 'checkinDate', 'checkoutDate', 'bookDate', 'status'],
            include: [
                {
                    model: db.Room,
                    attributes: ['room_name'],
                    as: 'fk_book_room'
                }
            ],
            where: {
                hotel_id: req.params.id,
            },
            order: [['bookDate', 'DESC']]
        });
        res.status(200).json({
            status: 200,
            message: 'Lấy đơn thành công',
            booking_list
        });
    } catch (err) {
        res.status(500).json({
            status: 500,
            message: 'Đã xảy ra lỗi khi cập nhật thông tin',
            error: err.message
        });
    }
}

exports.deleteBooking = async (req, res) => {
    try {
        await db.Booking.destroy({
            where: {
                book_id: req.params.id,
            },
        });
        res.status(200).json({
            status: 200,
            message: 'Thành công'
        });
    } catch (err) {
        res.status(500).json({
            status: 500,
            message: 'Đã xảy ra lỗi',
            error: err.message
        });
    }
}