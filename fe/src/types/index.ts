export type User = {
  id: string;
  username: string;
  fullName: string;
  email: string;
  role: 'admin' | 'employee';
  phoneNumber?: string;
  avatar?: string;
  createdAt: string;
};

export type Schedule = {
  id: string;
  title: string;
  description: string;
  start: string;
  end: string;
  employeeId?: string;
  employeeName?: string;
  status: 'pending' | 'completed' | 'cancelled';
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
  quality: 'A' | 'B' | 'C' | 'D';
  predictedPrice: number;
  submittedBy: string;
  submittedAt: string;
};