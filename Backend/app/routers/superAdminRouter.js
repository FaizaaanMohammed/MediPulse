const express = require('express');
const router = express.Router();
const superAdminController = require('../controllers/superAdminController');
const AuthCheck = require('../middlewares/AuthMiddleware');
const authorizeRoles = require('../middlewares/RoleMiddleware');

// Security Middlewares Applied
router.use(AuthCheck);
router.use(authorizeRoles('SUPER_ADMIN'));

router.get('/dashboard-stats', (req, res, next) => {
  // #swagger.tags = ['Super Admin']
  superAdminController.getDashboardStats(req, res, next);
});

router.get('/clinics', (req, res, next) => {
  // #swagger.tags = ['Super Admin']
  superAdminController.getAllClinics(req, res, next);
});

router.post('/clinics/onboard', (req, res, next) => {
  // #swagger.tags = ['Super Admin']
  superAdminController.onboardClinic(req, res, next);
});

router.patch('/clinics/:clinicId/status', (req, res, next) => {
  // #swagger.tags = ['Super Admin']
  superAdminController.updateClinicStatus(req, res, next);
});

router.post('/subscriptions', (req, res, next) => {
  // #swagger.tags = ['Super Admin']
  superAdminController.saveSubscriptionPlan(req, res, next);
});

router.patch('/users/:userId/status', (req, res, next) => {
  // #swagger.tags = ['Super Admin']
  superAdminController.toggleUserStatus(req, res, next);
});

module.exports = router;