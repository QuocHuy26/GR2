const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/', userController.getListUsers);
router.post('/create', userController.createUser);
router.get('/:id', userController.getUserDetails);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;
