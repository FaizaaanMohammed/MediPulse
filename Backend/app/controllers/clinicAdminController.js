const User = require("../models/UserModels");
const Doctor = require("../models/DoctorModel");
const Appointment = require("../models/AppointmentModel");
const httpStatusCode = require("../utils/httpStatusCode");
const bcrypt = require("bcrypt");

class ClinicAdminController {
  // 1. Onboard / Add Doctor to Clinic
  async addDoctor(req, res) {
    try {
      const { name, email, password, phone, specialization, experienceYears, consultationFee, availableDays } = req.body;
      const clinicId = req.user.clinicId || req.body.clinicId;

      if (!name || !email || !password || !specialization || !consultationFee) {
        return res.status(httpStatusCode.BAD_REQUEST).json({
          success: false,
          message: "Name, email, password, specialization, and consultation fee are required",
        });
      }

      // Check existing user
      const existingUser = await User.findOne({ email: email.toLowerCase().trim() });
      if (existingUser) {
        return res.status(httpStatusCode.BAD_REQUEST).json({
          success: false,
          message: "User with this email already exists",
        });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      // Create User Account with DOCTOR role
      const user = await User.create({
        name,
        email: email.toLowerCase().trim(),
        password: hashedPassword,
        phone,
        role: "DOCTOR",
        isVerified: true,
      });

      // Create Doctor Profile Linked to Clinic
      const doctor = await Doctor.create({
        userId: user._id,
        clinicId,
        specialization,
        experienceYears,
        consultationFee,
        availableDays,
      });

      return res.status(httpStatusCode.CREATED).json({
        success: true,
        message: "Doctor onboarded successfully",
        data: { user, doctor },
      });
    } catch (err) {
      return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: err.message,
      });
    }
  }

  // 2. Get All Doctors in Clinic
  async getClinicDoctors(req, res) {
    try {
      const clinicId = req.params.clinicId || req.user.clinicId;
      const doctors = await Doctor.find({ clinicId }).populate("userId", "name email phone status");

      return res.status(httpStatusCode.OK).json({
        success: true,
        count: doctors.length,
        data: doctors,
      });
    } catch (err) {
      return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: err.message,
      });
    }
  }

  // 3. Get Clinic OPD Analytics
  async getClinicStats(req, res) {
    try {
      const clinicId = req.params.clinicId || req.user.clinicId;
      const totalDoctors = await Doctor.countDocuments({ clinicId });
      const totalAppointments = await Appointment.countDocuments({ clinicId });
      const completedAppointments = await Appointment.countDocuments({ clinicId, status: "COMPLETED" });

      return res.status(httpStatusCode.OK).json({
        success: true,
        data: {
          totalDoctors,
          totalAppointments,
          completedAppointments,
        },
      });
    } catch (err) {
      return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: err.message,
      });
    }
  }
}

module.exports = new ClinicAdminController();