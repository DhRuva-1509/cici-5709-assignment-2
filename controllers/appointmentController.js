const Appointment = require('../models/Appointment.js');

exports.createAppointment = async (req, res) => {
  try {
    const { patientId, dateTime } = req.body;

    if (!patientId || !dateTime) {
      return res.status(400).json({ message: 'patientId and dateTime are required.' });
    }

    const meetingCode = `VID-${Math.floor(100000 + Math.random() * 900000)}`;

    const appointment = new Appointment({
      patientId,
      doctorId: req.user.userId,
      dateTime,
      meetingCode,
      createdBy: req.user.userId
    });

    await appointment.save();

    res.status(201).json({
      message: 'Appointment created successfully.',
      appointmentId: appointment._id,
      meetingCode
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error.' });
  }
};

exports.getAppointments = async (req, res) => {
  try {
    const { patientId } = req.query;

    if (!patientId) {
      return res.status(400).json({ message: 'patientId query param is required.' });
    }

    const appointments = await Appointment.find({ patientId }).select('-__v');

    if (appointments.length === 0) {
      return res.status(404).json({ message: 'No appointments found for this patient.' });
    }

    res.status(200).json({ appointments });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error.' });
  }
};
   
