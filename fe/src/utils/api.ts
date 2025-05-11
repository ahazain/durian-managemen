import { API_ENDPOINTS, mapSchedule, Schedule } from "../types";

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

    const result = await response.json();

    return {
      ...result,
      data: result.data.map(mapSchedule),
    };
  },

  getScheduleById: async (id: string) => {
    const response = await fetch(API_ENDPOINTS.schedule.getById(id), {
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error("Failed to fetch schedule");
    return response.json();
  },

  createSchedule: async (data: {
    title: string;
    description: string;
    start: string;
    end: string;
    employeeId: string;
  }) => {
    // Transform data to match API expectations
    const transformedData = {
      title: data.title,
      deskripsi: data.description,
      tanggal_mulai: new Date(data.start).toISOString(),
      tanggal_selesai: new Date(data.end).toISOString(),
      user: {
        id: data.employeeId,
      },
    };

    const response = await fetch(API_ENDPOINTS.schedule.create, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(transformedData),
    });
    if (!response.ok) throw new Error("Failed to create schedule");
    return response.json();
  },

  updateSchedule: async (id: string, data: Partial<Schedule>) => {
    // Transform data to match API expectations
    const transformedData: any = {};

    if (data.title) transformedData.title = data.title;
    if (data.description) transformedData.deskripsi = data.description;
    if (data.start)
      transformedData.tanggal_mulai = new Date(data.start).toISOString();
    if (data.end)
      transformedData.tanggal_selesai = new Date(data.end).toISOString();
    if (data.employeeId) {
      transformedData.user = {
        id: data.employeeId,
      };
    }

    const response = await fetch(API_ENDPOINTS.schedule.update(id), {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify(transformedData),
    });
    if (!response.ok) throw new Error("Failed to update schedule");
    return response.json();
  },

  deleteSchedule: async (id: string) => {
    const response = await fetch(API_ENDPOINTS.schedule.delete(id), {
      method: "DELETE",
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error("Failed to delete schedule");
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
  // Profiles
  getAllProfiles: async (role?: string) => {
    const url = new URL(API_ENDPOINTS.profile.all);
    if (role) {
      url.searchParams.append("role", role);
    }
    const response = await fetch(url.toString(), {
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error("Failed to fetch profiles");
    return response.json();
  },

  getEmployeeProfiles: async () => {
    const response = await fetch(API_ENDPOINTS.profile.employees, {
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error("Failed to fetch employee profiles");
    return response.json();
  },

  updateProfile: async (data: any) => {
    const response = await fetch(API_ENDPOINTS.profile.update, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Failed to update profile");
    return response.json();
  },
};
