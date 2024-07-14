import multer from 'multer';
import path from 'path';

const MAX_SIZE = 5 * 1024 * 1024; // 5mb
const storageImage = multer.diskStorage({
    destination: async function (req, file, cb) {
        if (file.fieldname === 'image') {
            cb(null, 'public/images/thumb');
        }
        if (file.fieldname === 'url') {
            cb(null, 'public/images/hotel-image');
        }
    },
    filename: function (req, file, cb) {
        const fileName =
            Date.now() +
            '-' +
            Math.round(Math.random() * 1e9) +
            path.extname(file.originalname);
        cb(null, fileName);
    },
});

const fileFilter = (req, file, cb) => {
    if (
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg'
    ) {
        let size = +req.rawHeaders.slice(-1)[0];
        if (size >= MAX_SIZE) {
            let error = [
                {
                    param: file.fieldname,
                    msg: 'Kích thước file quá lớn',
                },
            ];
            cb({ status: 400, message: 'Lỗi tải file', error: error });
        } else {
            cb(null, true);
        }
    } else {
        let error = [
            {
                param: file.fieldname,
                msg: 'Định dạng file không đúng',
            },
        ];
        cb({ status: 400, message: 'Lỗi tải file', error: error });
    }
};

const uploadImage = multer({
    limits: { fileSize: MAX_SIZE },
    fileFilter: fileFilter,
    storage: storageImage,
});

module.exports = { uploadImage };