const express = require('express');
const router = express.Router();
const { getServices, getServiceById, bookAppointment, getMyAppointments } = require('../controllers/clinicController');
const { protect } = require('../middleware/authMiddleware');

router.get('/services', getServices);
router.get('/services/:id', getServiceById);
router.post('/appointments', protect, bookAppointment);
router.get('/appointments/my-appointments', protect, getMyAppointments);

module.exports = router;
