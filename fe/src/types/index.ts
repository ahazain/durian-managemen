export type User = {
  id: string;
  nama: string;
  email: string;
  role: "admin" | "employee";
  token?: string;
  createdAt: string;
};

export type Schedule = {
  id: string;
  title: string;
  description: string;
  start: string;
  end: string;
  employeeId: string;
  employeeName: string;
  status: "pending" | "completed" | "cancelled";
};

export type Attendance = {
  id: string;
  employeeId: string;
  employeeName: string;
  date: string;
  checkInTime: string;
  verified: boolean;
  notes?: string;
};

export type DurianPrediction = {
  id: string;
  imageUrl: string;
  quality: "A" | "B" | "C" | "D";
  predictedPrice: number;
  submittedBy: string;
  submittedAt: string;
};

// API endpoints configuration
export const API_ENDPOINTS = {
  auth: {
    login: "http://localhost:3000/api/v1/autentifikasi/login",
    register: "http://localhost:3000/api/v1/autentifikasi/register",
    resetPassword: "http://localhost:3000/api/v1/autentifikasi/reset-password",
    updateProfile: "http://localhost:3000/api/v1/autentifikasi/update-profile",
  },
  employee: {
    list: "http://localhost:3000/api/v1/employees",
    create: "http://localhost:3000/api/v1/employees",
    update: (id: string) => `http://localhost:3000/api/v1/employees/${id}`,
    delete: (id: string) => `http://localhost:3000/api/v1/employees/${id}`,
  },
  schedule: {
    list: "http://localhost:3000/api/v1/schedules",
    create: "http://localhost:3000/api/v1/schedules",
    update: (id: string) => `http://localhost:3000/api/v1/schedules/${id}`,
    delete: (id: string) => `http://localhost:3000/api/v1/schedules/${id}`,
    employee: (id: string) =>
      `http://localhost:3000/api/v1/schedules/employee/${id}`,
  },
  attendance: {
    list: "http://localhost:3000/api/v1/attendance",
    checkIn: "http://localhost:3000/api/v1/attendance/check-in",
    verify: (id: string) =>
      `http://localhost:3000/api/v1/attendance/${id}/verify`,
    employee: (id: string) =>
      `http://localhost:3000/api/v1/attendance/employee/${id}`,
  },
  prediction: {
    predict: "http://localhost:3000/api/v1/prediction",
    history: "http://localhost:3000/api/v1/prediction/history",
    employee: (id: string) =>
      `http://localhost:3000/api/v1/prediction/employee/${id}`,
  },
};
