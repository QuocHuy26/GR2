import db from "../models/index";

exports.getProvinceList = async (req, res) => {
    try {
        const province_list = await db.Province.findAll({
            attributes: [
                'province_id',
                'name',
                'type',
            ],
        });
        res.status(200).json({
            status: 200,
            message: 'Lấy danh sách tỉnh thành công',
            province_list
        })
    } catch (err) {
        res.status(500).json({
            status: 500,
            message: 'Đã xảy ra lỗi khi lấy danh sách tỉnh',
            error: err.message
        });
    }
}