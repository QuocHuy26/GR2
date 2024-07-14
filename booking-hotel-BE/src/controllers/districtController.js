import db from "../models/index";

exports.getDistrictListByProvince = async (req, res) => {
    try {
        const district_list = await db.District.findAll({
            attributes: [
                'district_id',
                'name',
                'type',
                'province_id',
            ],
            where: {
                province_id: req.params.id,
            }
        });
        res.status(200).json({
            status: 200,
            message: 'Lấy danh sách huyện thành công',
            district_list
        })
    } catch (err) {
        res.status(500).json({
            status: 500,
            message: 'Đã xảy ra lỗi khi lấy danh sách tỉnh',
            error: err.message
        });
        console.log(err);
    }
}