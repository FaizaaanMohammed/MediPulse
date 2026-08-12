const express = require("express");
const router = express.Router();
const clinicAdminController = require("../controllers/clinicAdminController");
const AuthCheck = require("../middlewares/AuthMiddleware");
const authorizeRoles = require("../middlewares/RoleMiddleware");

router.use(AuthCheck);

router.post("/add-doctor", authorizeRoles("CLINIC_ADMIN", "SUPER_ADMIN"), (req, res, next) => {
  // #swagger.tags = ['Clinic Admin']
  clinicAdminController.addDoctor(req, res, next);
});

router.get("/doctors/:clinicId", authorizeRoles("CLINIC_ADMIN", "SUPER_ADMIN"), (req, res, next) => {
  // #swagger.tags = ['Clinic Admin']
  clinicAdminController.getClinicDoctors(req, res, next);
});

router.get("/stats/:clinicId", authorizeRoles("CLINIC_ADMIN", "SUPER_ADMIN"), (req, res, next) => {
  // #swagger.tags = ['Clinic Admin']
  clinicAdminController.getClinicStats(req, res, next);
});

module.exports = router;