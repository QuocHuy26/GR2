const express = require('express');
const router = express.Router();
const districtController = require('../controllers/districtController');

router.get('/:id', districtController.getDistrictListByProvince);

module.exports = router;