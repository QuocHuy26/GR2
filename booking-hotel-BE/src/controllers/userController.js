import bcrypt from 'bcryptjs';
import db from "../models/index";

exports.createUser = async (req, res) => {
    const { username, phone, role, email, password } = req.body;

    try {
        let user = await db.User.findOne({ where: { email: email } });
        if (user) {
            return res.status(409).json({ status: 409, message: "Địa chỉ email đã tồn tại" });
        }
        user = await db.User.findOne({ where: { phone: phone } });
        if (user) {
            return res.status(409).json({ status: 409, message: "Số điện thoại đã tồn tại" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        user = await db.User.create({ username, phone, role, email, password: hashedPassword });
        res.status(201).json({ status: 201, message: "Đăng ký thành công" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getListUsers = async (req, res) => {
    try {
        const { count, rows } = await db.User.findAndCountAll({
            attributes: [
                ['user_id', 'id'],
                'username',
                'role',
                'email',
            ],
        })
        res.status(200).json({
            status: 200,
            message: 'Lấy danh sách user thành công',
            user_list: rows,
            total: count
        })
    } catch (err) {
        console.error(err);
        res.status(500).json({
            status: 500,
            message: 'Đã xảy ra lỗi khi lấy danh sách user',
            error: err.message
        });
    }
}

exports.getUserDetails = async (req, res) => {
    try {
        const user = await db.User.findByPk(req.params.id, {
            attributes: [
                ['user_id', 'id'],
                'username',
                'phone',
                'role',
                'email',
            ],
        });
        res.status(200).json({
            status: 200,
            message: 'Lấy thông tin user thành công',
            user
        })
    } catch (err) {
        res.status(500).json({
            status: 500,
            message: 'Đã xảy ra lỗi khi lấy thông tin user',
            error: err.message
        });
    }
}

exports.updateUser = async (req, res) => {
    const { username, phone, role, email } = req.body;
    try {
        await db.User.update(
            {
                username,
                phone,
                role,
                email
            },
            {
                where: {
                    user_id: req.params.id,
                },
            },
        );
        res.status(200).json({
            status: 200,
            message: 'Cập nhật thông tin user thành công'
        });
    } catch (err) {
        res.status(500).json({
            status: 500,
            message: 'Đã xảy ra lỗi khi cập nhật thông tin user',
            error: err.message
        });
    }
}

exports.deleteUser = async (req, res) => {
    try {
        await db.User.destroy({
            where: {
                user_id: req.params.id,
            },
        });
        res.status(200).json({
            status: 200,
            message: 'Xóa user thành công'
        });
    } catch (err) {
        res.status(500).json({
            status: 500,
            message: 'Đã xảy ra lỗi khi xóa user',
            error: err.message
        });
    }
}