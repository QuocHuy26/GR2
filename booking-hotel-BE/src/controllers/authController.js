const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
import db from '../models/index';


let register = async (req, res) => {
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

let login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await db.User.findOne({ where: { email: email } });

        if (!user) {
            return res.status(401).json({ message: 'Địa chỉ email không đúng', status: 401 });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: 'Sai mật khẩu', status: 401 });
        }

        res.status(200).json({
            message: 'Đăng nhập thành công', status: 200, data: {
                id: user.user_id,
                username: user.username,
                phone: user.phone,
                email: user.email,
                role: user.role
            }
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    register: register,
    login: login,
}