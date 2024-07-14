const express = require('express');
const router = express.Router();
import { uploadImage } from '../middleware/uploadImage';
const hotelController = require('../controllers/hotelController');

router.get('/province=:province_id&district=:district_id', hotelController.getHotelListByAddress);
router.get('/user/:id', hotelController.getHotelListByUserId);
router.post('/create', [
    uploadImage.single('image'),
    hotelController.createHotel,
]);
router.get('/:id', hotelController.getHotelDetails);
router.put('/:id', [
    uploadImage.single('image'),
    hotelController.updateHotel,
]);
router.delete('/:id', hotelController.deleteHotel);

module.exports = router;