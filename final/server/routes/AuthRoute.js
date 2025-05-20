const { Router } = require('express');
const router = Router(); 
const AuthController = require('../controllers/AuthController'); 

router.post('/register',AuthController.register);
router.post('/login',AuthController.login)
router.post('/logout',AuthController.logout)
router.get('/me',AuthController.me)

module.exports = router