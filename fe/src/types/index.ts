export type User = {
  id: string;
  nama: string;
  email: string;
  role: "admin" | "employee";
  token?: string;
  createdAt: string;
};

export type Profile = {
  id: string;
  nama: string;
  email: string;
  role: "ADMIN" | "EMPLOYEE";
  createdAt: string;
  updatedAt: string;
};

export type Schedule = {
  id: string;
  title: string;
  description: string;
  start: string;
  end: string;
  employeeId: string;
  employeeName?: string; // optional kalau tidak selalu tersedia
  status?: string; // tambahkan jika memang ada
};

export const mapSchedule = (item: any): Schedule => ({
  id: item.id,
  title: item.title,
  description: item.deskripsi,
  start: item.tanggal_mulai,
  end: item.tanggal_selesai,
  employeeId: item.id_user,
  employeeName: item.nama_karyawan || undefined,
  status: item.status || undefined,
});

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
    list: "http://localhost:3000/api/v1/profil/all-karyawan",
    create: "http://localhost:3000/api/v1/profil/all-karyawan",
    update: (id: string) =>
      `http://localhost:3000/api/v1/profil/all-karyawan/${id}`,
    delete: (id: string) =>
      `http://localhost:3000/api/v1/profil/all-karyawan/${id}`,
  },
  profile: {
    all: "http://localhost:3000/api/v1/profil/all",
    update: "http://localhost:3000/api/v1/profil",
  },
  schedule: {
    list: "http://localhost:3000/api/v1/penjadwalan",
    create: "http://localhost:3000/api/v1/penjadwalan",
    update: (id: string) => `http://localhost:3000/api/v1/penjadwalan/${id}`,
    delete: (id: string) => `http://localhost:3000/api/v1/penjadwalan/${id}`,
    getById: (id: string) => `http://localhost:3000/api/v1/penjadwalan/${id}`,
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
