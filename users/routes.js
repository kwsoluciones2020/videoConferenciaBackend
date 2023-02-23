const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/authorization');
const controller = require('./controller');


//const router = Router();
router.post('/users/verify', controller.verifyUser);
router.post('/users/sendemailrecovery', controller.recoverPasswordSendEmail);
router.post('/users/validatecode', controller.recoverPasswordValidateCode);



router.get('/users',authenticateToken, controller.getUsers);
router.post('/users', controller.addUser);
router.put('/users/:id', controller.updateUser);

//router.get('/:username',authenticateToken, controller.getUserByUsername);
//router.delete('users/:id',authenticateToken, controller.removeUser);
//router.get('/refresh_token/', controller.refreshToken);
router.post('/users/login', controller.loginUser);
//router.delete('/refresh_token', controller.deleteRefresh);


module.exports = router;