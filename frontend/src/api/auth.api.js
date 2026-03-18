import api from "./axios";

export const registerUser = (data) => {
  return api.post("/auth/register", data);
};

export const loginUser = (data) => {
  return api.post("/auth/login", data);
};

export const logoutUser = () => {
  return api.post("/auth/logout");
};

export const getCurrentUser = () => {
  return api.get("/auth/current-user");
};

export const forgotPassword = (data) => {
  return api.post("/auth/forgot-password", data);
};

export const resetPassword = (token, data) => {
  return api.post(`/auth/reset-password/${token}`, data);
};

export const verifyEmail = (token) => {
  return api.get(`/auth/verify-email/${token}`);
};

export const resendVerificationEmail = () => {
  return api.post("/auth/resend-email-verification");
};

export const changeCurrentPassword = (data) => {
  return api.post("/auth/change-password", data);
};