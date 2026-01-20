export const API = {
  AUTH: {
    LOGIN: "/auth/login",
    UPDATE_PROFILE: "/auth/profile",
    SIGNUP: "/auth/signup",
    CHANGE_PASSWORD: "/auth/change-password",
    UPLOAD_PROFILE_IMAGE: "/auth/upload-profile-image",
  },
  USERS: {
    LIST: "/users",
    CREATE: "/users",
    UPDATE: (id) => `/users/${id}`,
    DELETE: (id) => `/users/${id}`,
  },
  TESTS: {
    LIST: "/tests",
    RANDOM: "/tests/random",
    CREATE: "/tests",
    UPDATE: (id) => `/tests/${id}`,
    DELETE: (id) => `/tests/${id}`,
  },
};
