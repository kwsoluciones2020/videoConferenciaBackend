const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../../middleware/authorization');
const controller = require('./controller');
const patch = '/meet';




router.get(patch,controller.getMeeting);
router.get(patch+'/:id',controller.getMeeting);

router.post(patch,controller.createMeeting);
router.put(patch+'/:id', controller.updateMeeting);
router.delete(patch+'/:id', controller.deleteMeeting);





module.exports = router;