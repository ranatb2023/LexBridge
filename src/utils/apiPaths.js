export const BASE_URL = "http://localhost:8000";

export const API_PATHS = {
    AUTH: {
        REGISTER: "/api/auth/register",
        LOGIN: "/api/auth/login",
        GET_PROFILE: "/api/auth/profile",
    },

    USERS: {
        GET_ALL_USERS: "/api/users",
        GET_USER_BY_ID: (userId) => `/api/users/${userId}`,
    },

    LANDING_PAGE: {
        SUBSCRIBE: "/api/landing-page/subscribe",
    },

    IMAGE: {
        UPLOAD_IMAGE: "/api/auth/upload-image",
    }
}