const { signup, login, checkUser, refreshToken, checkout } = require('../Controllers/AuthController')


const router = require('express').Router();

router.post('/signup', signup);
router.post('/login', login);
// router.post('/', checkUser);
// router.get('/refreshToken', refreshToken, checkUser);
router.get('/refreshToken', refreshToken);
router.post('/checkout', checkout);

module.exports = router; 