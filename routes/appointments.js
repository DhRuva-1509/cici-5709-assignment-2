const express = require('express');
const router = express.Router();
const { createAppointment, getAppointments } = require('../controllers/appointmentController');
const { verifyToken } = require('../middleware/auth');

router.post('/', verifyToken, createAppointment);
router.get('/', verifyToken, getAppointments);

module.exports = router;
