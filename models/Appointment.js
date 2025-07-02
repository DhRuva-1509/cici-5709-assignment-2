const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
  patientId: { type: String, required: true },
  doctorId: { type: String, required: true },
  dateTime: { type: Date, required: true },
  meetingCode: { type: String, required: true },
  createdBy: { type: String, required: true }
});

module.exports = mongoose.model('Appointment', AppointmentSchema);