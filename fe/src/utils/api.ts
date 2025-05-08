import { API_ENDPOINTS } from "../types";

const getAuthHeaders = () => {
  const token = localStorage.getItem("durianAppToken");
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

export const api = {
  // Auth
  login: async (email: string, password: string) => {
    const response = await fetch(API_ENDPOINTS.auth.login, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (!response.ok) throw new Error("Login failed");
    return response.json();
  },

  register: async (data: { nama: string; email: string; password: string }) => {
    const response = await fetch(API_ENDPOINTS.auth.register, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Registration failed");
    return response.json();
  },

  resetPassword: async (email: string) => {
    const response = await fetch(API_ENDPOINTS.auth.resetPassword, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    if (!response.ok) throw new Error("Password reset failed");
    return response.json();
  },

  // Employees
  getEmployees: async () => {
    const response = await fetch(API_ENDPOINTS.employee.list, {
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error("Failed to fetch employees");
    return response.json();
  },

  // Schedules
  getSchedules: async () => {
    const response = await fetch(API_ENDPOINTS.schedule.list, {
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error("Failed to fetch schedules");
    return response.json();
  },

  createSchedule: async (data: Omit<Schedule, "id">) => {
    const response = await fetch(API_ENDPOINTS.schedule.create, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Failed to create schedule");
    return response.json();
  },

  // Attendance
  checkIn: async (employeeId: string) => {
    const response = await fetch(API_ENDPOINTS.attendance.checkIn, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify({ employeeId }),
    });
    if (!response.ok) throw new Error("Check-in failed");
    return response.json();
  },

  verifyAttendance: async (attendanceId: string) => {
    const response = await fetch(
      API_ENDPOINTS.attendance.verify(attendanceId),
      {
        method: "PUT",
        headers: getAuthHeaders(),
      }
    );
    if (!response.ok) throw new Error("Verification failed");
    return response.json();
  },

  // Predictions
  predictDurian: async (formData: FormData) => {
    const response = await fetch(API_ENDPOINTS.prediction.predict, {
      method: "POST",
      headers: getAuthHeaders(),
      body: formData,
    });
    if (!response.ok) throw new Error("Prediction failed");
    return response.json();
  },

  getPredictionHistory: async () => {
    const response = await fetch(API_ENDPOINTS.prediction.history, {
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error("Failed to fetch prediction history");
    return response.json();
  },
};
