const { signup, login, checkUser, refreshToken } = require('../Controllers/AuthController')


const router = require('express').Router();

router.post('/signup', signup);
router.post('/login', login);
// router.post('/', checkUser);
// router.get('/refreshToken', refreshToken, checkUser);
router.get('/refreshToken', refreshToken);

module.exports = router; 