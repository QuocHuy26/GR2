const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');

router.get('/user_id=:id', bookingController.getBookingList);
router.get('/hotel=:id', bookingController.getBookingListByHotel);
router.post('/create', bookingController.createBooking);
router.put('/:id', bookingController.updateBooking);
router.delete('/:id', bookingController.deleteBooking);

module.exports = router;
