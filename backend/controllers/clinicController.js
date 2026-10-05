const store = require('../utils/store');

// @desc    Get all clinic services
// @route   GET /api/clinic/services
// @access  Public
const getServices = async (req, res, next) => {
  try {
    const services = await store.getClinicServices();
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Clinic services retrieved successfully',
      data: services,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single clinic service by ID or Slug
// @route   GET /api/clinic/services/:id
// @access  Public
const getServiceById = async (req, res, next) => {
  try {
    const service = await store.getClinicServiceById(req.params.id);
    if (!service) {
      return res.status(404).json({
        success: false,
        statusCode: 404,
        message: 'Clinic service not found',
      });
    }
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Clinic service retrieved',
      data: service,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Book a new veterinary clinic appointment
// @route   POST /api/clinic/appointments
// @access  Private
const bookAppointment = async (req, res, next) => {
  try {
    const { serviceId, serviceName, price, petName, petType, petAge, ownerName, ownerPhone, date, timeSlot, notes } = req.body;

    if (!serviceId || !petName || !petType || !date || !timeSlot || !ownerPhone) {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        message: 'Please provide all required appointment fields (service, pet name, pet type, date, slot, phone).',
      });
    }

    const appointmentData = {
      userId: req.user.id || req.user._id,
      userEmail: req.user.email,
      serviceId,
      serviceName: serviceName || 'Veterinary Consultation',
      price: Number(price || 499),
      petName,
      petType,
      petAge: petAge || '',
      ownerName: ownerName || req.user.name,
      ownerPhone,
      date,
      timeSlot,
      notes: notes || '',
    };

    const newAppointment = await store.createAppointment(appointmentData);

    res.status(201).json({
      success: true,
      statusCode: 201,
      message: 'Appointment booked successfully! Our clinic team looks forward to meeting your pet.',
      data: newAppointment,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get current user's appointments
// @route   GET /api/clinic/appointments/my-appointments
// @access  Private
const getMyAppointments = async (req, res, next) => {
  try {
    const userId = req.user.id || req.user._id;
    const appointments = await store.getAppointmentsByUser(userId);

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Appointments retrieved successfully',
      data: appointments,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getServices,
  getServiceById,
  bookAppointment,
  getMyAppointments,
};
