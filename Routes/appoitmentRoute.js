const express = require('express');
const router = express.Router();

const {
  getappoitment,
  request,
  accepted,
  canceled,
} = require('../controllers/appoitmentController');

router.post('/addAppointment', request);
router.get('/getAllAppointments', getappoitment);
router.put('/updateAppointment/:ID', accepted);
router.delete('/deleteAppointmentById/:ID', canceled);

module.exports = router;

