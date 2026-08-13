export const API_ENDPOINTS = {
  // Auth
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    ME: '/auth/me',
  },

  // Super Admin
  SUPER_ADMIN: {
    STATS: '/super-admin/dashboard-stats',
    CLINICS: '/super-admin/clinics',
    GET_USERS: '/super-admin/users',
    ONBOARD_CLINIC: '/super-admin/clinics/onboard',
    UPDATE_CLINIC_STATUS: (clinicId) => `/super-admin/clinics/${clinicId}/status`,
    UPDATE_USER_STATUS: (userId) => `/super-admin/users/${userId}/status`,

  },

  // Subscriptions
  SUBSCRIPTIONS: {
    GET_ALL: '/subscription',
    CREATE: '/subscription',
    UPDATE: (planId) => `/subscription/${planId}`,
  },

  // Clinic Admin
  CLINIC: {
    GET_MY_CLINIC: '/clinic/my-clinic',
    DOCTORS: '/clinic/doctors',
  },

  // Doctor
  DOCTOR: {
    APPOINTMENTS: '/doctor/appointments',
    SLOTS: '/doctor/slots',
  },

  // Patient
  PATIENT: {
    SEARCH_DOCTORS: '/patient/search-doctors',
    BOOK_APPOINTMENT: '/patient/appointments/book',
  },
};