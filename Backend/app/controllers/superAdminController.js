const Clinic = require("../models/ClinicModel");
const User = require("../models/UserModels");
const Subscription = require("../models/SubscriptionModel");
const httpStatusCode = require("../utils/httpStatusCode");

class SuperAdminController {
  // 1. GET SYSTEM GOVERNANCE DASHBOARD STATS
  async getDashboardStats(req, res) {
    try {
      const totalClinics = await Clinic.countDocuments();
      const activeClinics = await Clinic.countDocuments({ status: "APPROVED" });
      const pendingClinics = await Clinic.countDocuments({ status: "PENDING" });
      const totalDoctors = await User.countDocuments({ role: "DOCTOR" });
      const totalPatients = await User.countDocuments({ role: "PATIENT" });

      return res.status(httpStatusCode.OK).json({
        success: true,
        data: {
          totalClinics,
          activeClinics,
          pendingClinics,
          totalDoctors,
          totalPatients,
          mrr: 485000, // Monthly Recurring Revenue
        },
      });
    } catch (err) {
      console.error("Super Admin Stats Error:", err);
      return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: err.message || "Internal Server Error",
      });
    }
  }

  // 2. GET ALL CLINICS
  async getAllClinics(req, res) {
    try {
      const clinics = await Clinic.find()
        .populate("ownerId", "name email phone")
        .populate("subscriptionPlan")
        .sort({ createdAt: -1 });

      return res.status(httpStatusCode.OK).json({
        success: true,
        count: clinics.length,
        data: clinics,
      });
    } catch (err) {
      return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: err.message,
      });
    }
  }

  // 3. ONBOARD NEW CLINIC TENANT
  async onboardClinic(req, res) {
    try {
      const { name, email, phone, city, address, ownerId, subscriptionPlan } = req.body;

      if (!name || !email || !phone || !city) {
        return res.status(httpStatusCode.BAD_REQUEST).json({
          success: false,
          message: "Clinic name, email, phone, and city are required",
        });
      }

      const newClinic = await Clinic.create({
        name,
        email: email.toLowerCase().trim(),
        phone,
        city,
        address,
        ownerId,
        subscriptionPlan,
        status: "APPROVED", // Directly approved when onboarded by Super Admin
      });

      return res.status(httpStatusCode.CREATED).json({
        success: true,
        message: "Clinic onboarded successfully",
        data: newClinic,
      });
    } catch (err) {
      return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: err.message,
      });
    }
  }

  // 4. APPROVE OR SUSPEND CLINIC
  async updateClinicStatus(req, res) {
    try {
      const { clinicId } = req.params;
      const { status } = req.body; // 'APPROVED' | 'SUSPENDED' | 'PENDING'

      if (!["APPROVED", "SUSPENDED", "PENDING"].includes(status)) {
        return res.status(httpStatusCode.BAD_REQUEST).json({
          success: false,
          message: "Invalid status value provided",
        });
      }

      const clinic = await Clinic.findByIdAndUpdate(
        clinicId,
        { status },
        { new: true }
      );

      if (!clinic) {
        return res.status(httpStatusCode.NOT_FOUND).json({
          success: false,
          message: "Clinic tenant not found",
        });
      }

      return res.status(httpStatusCode.OK).json({
        success: true,
        message: `Clinic status updated to ${status}`,
        data: clinic,
      });
    } catch (err) {
      return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: err.message,
      });
    }
  }

  // 5. CREATE OR UPDATE SAAS SUBSCRIPTION PLAN
  async saveSubscriptionPlan(req, res) {
    try {
      const { id, name, price, period, features, highlight } = req.body;

      if (!name || price === undefined || !period) {
        return res.status(httpStatusCode.BAD_REQUEST).json({
          success: false,
          message: "Plan name, price, and billing period are required",
        });
      }

      let plan;
      if (id) {
        // Update Plan
        plan = await Subscription.findByIdAndUpdate(
          id,
          { name, price, period, features, highlight },
          { new: true }
        );
      } else {
        // Create Plan
        plan = await Subscription.create({
          name,
          price,
          period,
          features,
          highlight,
        });
      }

      return res.status(httpStatusCode.OK).json({
        success: true,
        message: id ? "Subscription plan updated" : "Subscription plan created",
        data: plan,
      });
    } catch (err) {
      return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: err.message,
      });
    }
  }

  // 6. BLOCK OR UNBLOCK GLOBAL USER
  async toggleUserStatus(req, res) {
    try {
      const { userId } = req.params;
      const { status } = req.body; // 'ACTIVE' | 'BLOCKED'

      if (!["ACTIVE", "BLOCKED"].includes(status)) {
        return res.status(httpStatusCode.BAD_REQUEST).json({
          success: false,
          message: "Invalid user status",
        });
      }

      const user = await User.findByIdAndUpdate(
        userId,
        { status },
        { new: true }
      );

      if (!user) {
        return res.status(httpStatusCode.NOT_FOUND).json({
          success: false,
          message: "User not found",
        });
      }

      return res.status(httpStatusCode.OK).json({
        success: true,
        message: `User status changed to ${status}`,
        data: user,
      });
    } catch (err) {
      return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: err.message,
      });
    }
  }
}

module.exports = new SuperAdminController();