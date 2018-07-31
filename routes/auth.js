const express = require('expresss');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/signup', authController.signUp);

module.exports = router;