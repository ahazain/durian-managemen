import { API_ENDPOINTS, mapSchedule, Schedule } from "../types";
import { createAuthHeaders, handleTokenExpiration } from "./authUtils";

// Helper function to handle API responses
const handleResponse = async (response: Response) => {
  if (response.status === 401) {
    // Token is invalid or expired
    handleTokenExpiration();
    throw new Error("Session expired. Please login again.");
  }
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }
  return response.json();
};

export const api = {
  // Auth
  login: async (email: string, password: string) => {
    const response = await fetch(API_ENDPOINTS.auth.login, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    return handleResponse(response);
  },

  register: async (data: { nama: string; email: string; password: string }) => {
    const response = await fetch(API_ENDPOINTS.auth.register, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  },

  resetPassword: async (email: string) => {
    const response = await fetch(API_ENDPOINTS.auth.resetPassword, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    return handleResponse(response);
  },

  // Employees
  getEmployees: async () => {
    const response = await fetch(API_ENDPOINTS.employee.list, {
      headers: createAuthHeaders(),
    });
    return handleResponse(response);
  },

  // Schedules
  getSchedules: async () => {
    const response = await fetch(API_ENDPOINTS.schedule.list, {
      headers: createAuthHeaders(),
    });
    const result = await handleResponse(response);
    return {
      ...result,
      data: result.data.map(mapSchedule),
    };
  },

  getScheduleById: async (id: string) => {
    const response = await fetch(API_ENDPOINTS.schedule.getById(id), {
      headers: createAuthHeaders(),
    });
    return handleResponse(response);
  },
  getEmployeeSchedules: async () => {
    const response = await fetch(API_ENDPOINTS.schedule.listByEmploye, {
      headers: createAuthHeaders(),
    });
    if (!response.ok) throw new Error("Failed to fetch employee schedules");

    const result = await response.json();

    return {
      ...result,
      data: result.data.map(mapSchedule),
    };
  },

  createSchedule: async (data: {
    title: string;
    description: string;
    start: string;
    end: string;
    employeeIds: string[];
  }) => {
    // Transform the employeeIds array into the format expected by the API
    const transformedData = {
      title: data.title,
      deskripsi: data.description,
      tanggal_mulai: new Date(data.start).toISOString(),
      tanggal_selesai: new Date(data.end).toISOString(),
      user: data.employeeIds.map((id) => ({ id })),
    };

    const response = await fetch(API_ENDPOINTS.schedule.create, {
      method: "POST",
      headers: createAuthHeaders(),
      body: JSON.stringify(transformedData),
    });
    return handleResponse(response);
  },

  updateSchedule: async (id: string, data: Partial<Schedule>) => {
    const transformedData: any = {};

    if (data.title) transformedData.title = data.title;
    if (data.description) transformedData.deskripsi = data.description;
    if (data.start)
      transformedData.tanggal_mulai = new Date(data.start).toISOString();
    if (data.end)
      transformedData.tanggal_selesai = new Date(data.end).toISOString();
    if (data.employeeIds && data.employeeIds.length > 0) {
      transformedData.user = data.employeeIds.map((id) => ({ id }));
    }

    const response = await fetch(API_ENDPOINTS.schedule.update(id), {
      method: "PUT",
      headers: createAuthHeaders(),
      body: JSON.stringify(transformedData),
    });
    return handleResponse(response);
  },
  deleteSchedule: async (id: string) => {
    const response = await fetch(API_ENDPOINTS.schedule.delete(id), {
      method: "DELETE",
      headers: createAuthHeaders(),
    });
    return handleResponse(response);
  },
  checkIn: async () => {
    const response = await fetch(API_ENDPOINTS.attendance.checkIn, {
      method: "POST",
      headers: createAuthHeaders(),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Check-in failed");
    }
    return response.json();
  },

  // Attendance
  getAttendances: async (filterStatus?: "verified" | "unverified") => {
    let endpoint = API_ENDPOINTS.attendance.filter;

    if (filterStatus) {
      endpoint = `${endpoint}?status=${filterStatus}`;
    }

    const response = await fetch(endpoint, {
      headers: createAuthHeaders(),
    });
    return handleResponse(response);
  },

  getAttendanceHistory: async () => {
    const response = await fetch(API_ENDPOINTS.attendance.employeeHistory, {
      headers: createAuthHeaders(),
    });
    if (!response.ok) throw new Error("Failed to fetch attendance history");
    return response.json();
  },
  getRecentCheckIn: async () => {
    const response = await fetch(API_ENDPOINTS.attendance.recentCheckIn, {
      headers: createAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch recent check-in");
    }

    return response.json();
  },

  verifyAttendance: async (id: string) => {
    const response = await fetch(API_ENDPOINTS.attendance.verify(id), {
      method: "PATCH",
      headers: createAuthHeaders(),
    });
    return handleResponse(response);
  },
  // Predictions
  predictDurian: async (formData: FormData) => {
    const response = await fetch(API_ENDPOINTS.prediction.predict, {
      method: "POST",
      headers: createAuthHeaders(),
      body: formData,
    });
    return handleResponse(response);
  },

  getPredictionHistory: async () => {
    const response = await fetch(API_ENDPOINTS.prediction.history, {
      headers: createAuthHeaders(),
    });
    return handleResponse(response);
  },

  // Profiles
  getAllProfiles: async (role?: string) => {
    const url = new URL(API_ENDPOINTS.profile.all);
    if (role) {
      url.searchParams.append("role", role);
    }
    const response = await fetch(url.toString(), {
      headers: createAuthHeaders(),
    });
    return handleResponse(response);
  },

  getEmployeeProfiles: async () => {
    const response = await fetch(API_ENDPOINTS.profile.employees, {
      headers: createAuthHeaders(),
    });
    return handleResponse(response);
  },

  updateProfile: async (data: any) => {
    const response = await fetch(API_ENDPOINTS.profile.update, {
      method: "PUT",
      headers: createAuthHeaders(),
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  },
};
