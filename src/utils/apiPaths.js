// export const BASE_URL = "https://lexbridge.onrender.com";
export const BASE_URL = "http://localhost:8000";

export const API_PATHS = {
  AUTH: {
    REGISTER: "/api/auth/register",
    LOGIN: "/api/auth/login",
    GET_PROFILE: "/api/auth/profile",
  },

  USERS: {
    GET_ALL_USERS: "/api/auth/users",
  },

  CASES: {
    GENERATE: "/api/cases/generate",
    GET_ALL_BY_USER: "/api/cases",
    GET_BY_ID: (caseId) => `/api/cases/${caseId}`,
    EXPORT_BY_ID: (caseId) => `/api/cases/${caseId}/export`,
    GET_ALL: "/api/admin/cases",
    GET_CASE_BY_ADMIN: (caseId) => `/api/admin/cases/${caseId}`,
  },

  BILLING: {
    CREATE_CHECKOUT_SESSION: "/api/stripe/create-checkout-session",
    WEBHOOK: "/api/stripe/webhook",
    CANCEL_SUBSCRIPTION: "/api/stripe/cancel-subscription",
  },

  ADMIN: {
    TOPICS: {
      GET_ALL: "/api/admin/topics",
      CREATE: "/api/admin/topics",
      UPDATE: (id) => `/api/admin/topics/${id}`,
      DELETE: (id) => `/api/admin/topics/${id}`,
    },
    SUBTOPICS: {
      GET_ALL: "/api/admin/subtopics",
      CREATE: "/api/admin/subtopics",
      UPDATE: (id) => `/api/admin/subtopics/${id}`,
      DELETE: (id) => `/api/admin/subtopics/${id}`,
    },
    JURISDICTIONS: {
      GET_ALL: "/api/admin/jurisdictions",
      CREATE: "/api/admin/jurisdictions",
      UPDATE: (id) => `/api/admin/jurisdictions/${id}`,
      DELETE: (id) => `/api/admin/jurisdictions/${id}`,
    },
    DIFFICULTIES: {
      GET_ALL: "/api/admin/difficulties",
      CREATE: "/api/admin/difficulties",
      UPDATE: (id) => `/api/admin/difficulties/${id}`,
      DELETE: (id) => `/api/admin/difficulties/${id}`,
    },
  },

  OPTIONS: {
    GET_TOPICS: "/api/options/topics",
    GET_SUBTOPICS: "/api/options/subtopics",
    GET_DIFFICULTIES: "/api/options/difficulties",
    GET_JURISDICTIONS: "/api/options/jurisdictions",
    GET_SUBTOPICS_BY_TOPIC: (topicId) => `/api/options/subtopics/by-topic/${topicId}`,
  },

  LANDING_PAGE: {
    SUBSCRIBE: "/api/landing-page/subscribe",
  },

  IMAGE: {
    UPLOAD_IMAGE: "/api/auth/upload-image",
  },
};
