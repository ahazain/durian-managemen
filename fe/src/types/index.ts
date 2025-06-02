export type User = {
  id: string;
  nama: string;
  email: string;
  phoneNumber: string;
  role: "admin" | "employee";
  token?: string;
  createdAt: string;
};

export type Profile = {
  id: string;
  nama: string;
  email: string;
  phoneNumber: string;
  role: "ADMIN" | "EMPLOYEE";
};
export interface Schedule {
  id: string;
  title: string;
  description: string;
  start: string;
  end: string;
  employeeId?: string;
  employeeIds?: string[];
  employeeName?: string;
  employeeNames?: string[];
  status?: string;
}

export const mapSchedule = (item: any): Schedule => ({
  id: item.id,
  title: item.title,
  description: item.deskripsi,
  start: item.tanggal_mulai,
  end: item.tanggal_selesai,
  employeeIds: item.user?.map((u: any) => u.id) || [],
  employeeNames: item.user?.map((u: any) => u.nama) || [],
  status: item.status || undefined,
});
export type Attendance = {
  id: string;
  tanggal: string;
  status: string;
  verifikasi: boolean;
  user_id: string;
  jadwal_id: string;
  user: {
    id: string;
    nama: string;
    email: string;
    role: string;
  };
  jadwal: {
    id: string;
    deskripsi: string;
    title: string;
    tanggal_mulai: string;
    tanggal_selesai: string;
    id_user: string;
  };
};
export interface DurianPrediction {
  id: string;
  imageUrl: string;
  quality: string;
  predictedPrice: number;
  submittedBy: string;
  submittedAt: string;
  confidence?: number;
  label?: string;
  bbox?: {
    xmin: number;
    ymin: number;
    xmax: number;
    ymax: number;
  };
}

export interface ApiPredictionResult {
  confidence: number;
  grade: string;
  harga: number;
  label: string;
  xmax: number;
  xmin: number;
  ymax: number;
  ymin: number;
}

export interface ApiPredictionResponse {
  success: boolean;
  data: ApiPredictionResult[];
}

export interface PredictionSchema {
  id: string;
  imageUrl: string;
  user_id: string;
  kualitas: string | null;
  harga: number | null;
}
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
    profilToken : "http://localhost:3000/api/v1/profil",
    updateProfil: "http://localhost:3000/api/v1/profil/update-profil",
    ubahPassword: "http://localhost:3000/api/v1/profil/update-password",
  },
  schedule: {
    list: "http://localhost:3000/api/v1/penjadwalan",
    create: "http://localhost:3000/api/v1/penjadwalan",
    listByEmploye: "http://localhost:3000/api/v1/penjadwalan/karyawan",
    update: (id: string) => `http://localhost:3000/api/v1/penjadwalan/${id}`,
    delete: (id: string) => `http://localhost:3000/api/v1/penjadwalan/${id}`,
    getById: (id: string) => `http://localhost:3000/api/v1/penjadwalan/${id}`,
  },
  // list: "http://localhost:3000/api/v1/absensi/all",
  attendance: {
    filter: "http://localhost:3000/api/v1/absensi/filter",
    checkIn: "http://localhost:3000/api/v1/absensi/checkin",
    verify: (id: string) =>
      `http://localhost:3000/api/v1/absensi/verifikasi/${id}`,
    employeeHistory: "http://localhost:3000/api/v1/absensi/histori-karyawan",
    recentCheckIn:
      "http://localhost:3000/api/v1/absensi/dashboard/recent-checkin",
  },
  prediction: {
    predict: "http://localhost:3000/api/v1/predict",
    // history: "http://localhost:3000/api/v1/prediction/history",
    // employee: (id: string) =>
    //   `http://localhost:3000/api/v1/prediction/employee/${id}`,
  },
};
