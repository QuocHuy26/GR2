const express = require('express');
const router = express.Router();
const roomController = require('../controllers/roomController');

router.get('/hotel_id=:id', roomController.getRoomList);
router.post('/create', roomController.createRoom);
router.put('/:id', roomController.updateRoom);
router.get('/:id', roomController.getRoomDetails);
router.delete('/:id', roomController.deleteRoom);

module.exports = router;
