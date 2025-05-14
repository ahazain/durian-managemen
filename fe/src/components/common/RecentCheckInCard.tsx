import React, { useState, useEffect } from "react";
import { Users, Calendar, CheckCircle, DollarSign } from "lucide-react";
import { Card } from "./Card";
import { useAuth } from "../../contexts/AuthContext";
import { api } from "../../utils/api";

export const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const [totalEmployees, setTotalEmployees] = useState(0);
  const [attendanceStats, setAttendanceStats] = useState({
    verified: 0,
    pending: 0,
  });
  const [recentCheckIn, setRecentCheckIn] = useState<any | null>(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Fetch total employees (KARYAWAN role)
      const employeesResponse = await api.getAllProfiles("KARYAWAN");
      if (employeesResponse.data) {
        setTotalEmployees(employeesResponse.data.total_karyawan || 0);
      }

      // Fetch attendance stats
      const attendanceResponse = await api.getAttendances();
      if (attendanceResponse.data?.count) {
        setAttendanceStats({
          verified: attendanceResponse.data.count.verifikasi || 0,
          pending: attendanceResponse.data.count.pending || 0,
        });
      }
      const recent = await api.getRecentCheckIn();
      console.log("Recent Check-in Response:", recent);
      setRecentCheckIn(recent);

      if (recent.data && Array.isArray(recent.data)) {
        const recentWithFormattedDates = recent.data.map((checkIn: any) => ({
          ...checkIn,
          tanggal: new Date(checkIn.tanggal), // Convert tanggal string to Date object
        }));
        setRecentCheckIn(recentWithFormattedDates);
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
  };

  const stats = [
    {
      label: "Total Employees",
      value: totalEmployees,
      icon: <Users size={24} className="text-blue-500" />,
    },
    {
      label: "Pending Attendance",
      value: attendanceStats.pending.toString(),
      icon: <Calendar size={24} className="text-durian-yellow-500" />,
    },
    {
      label: "Verified Attendance",
      value: attendanceStats.verified.toString(),
      icon: <CheckCircle size={24} className="text-green-500" />,
    },
    {
      label: "Revenue This Month",
      value: "Rp 12.5M",
      icon: <DollarSign size={24} className="text-purple-500" />,
    },
  ];
  const formatDateToLocal = (date: string) => {
    const parsedDate = new Date(date);
    return parsedDate.toLocaleDateString("id-ID", {
      // id-ID untuk format Indonesia
      weekday: "long", // Menampilkan nama hari lengkap (misalnya "Senin")
      year: "numeric", // Menampilkan tahun
      month: "short", // Menampilkan bulan dengan singkatan (misalnya "Mei")
      day: "numeric", // Menampilkan hari dalam angka (misalnya "14")
    });
  };

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Welcome back, {user?.nama}
        </h1>
        <p className="text-gray-600">
          Here's what's happening with your durian business today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <Card key={index} className="flex items-center">
            <div className="mr-4 p-3 rounded-full bg-gray-100">{stat.icon}</div>
            <div>
              <p className="text-sm font-medium text-gray-600">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent absen */}
        <Card title="Recent Check-in" className="lg:col-span-2">
          <div className="divide-y divide-gray-200">
            {recentCheckIn && recentCheckIn.length > 0 ? (
              recentCheckIn.map((checkIn: any, index: number) => (
                <div key={index} className="py-3">
                  <p className="font-medium text-gray-800">
                    {checkIn.nama}{" "}
                    <span className="font-normal text-gray-600">
                      {checkIn.status}
                    </span>
                  </p>
                  <p className="text-sm text-gray-500">
                    {formatDateToLocal(checkIn.tanggal)} •{" "}
                    {new Date(checkIn.tanggal).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-500 py-3">
                No recent check-ins available.
              </p>
            )}
          </div>
        </Card>

        {/* Quick Actions */}
        <Card title="Quick Actions">
          <div className="space-y-3">
            <a
              href="/admin/scheduling"
              className="block p-3 bg-durian-50 hover:bg-durian-100 rounded-md transition-colors"
            >
              <div className="flex items-center">
                <Calendar size={18} className="text-durian-600 mr-2" />
                <span className="font-medium">Create New Schedule</span>
              </div>
            </a>
            <a
              href="/admin/attendance"
              className="block p-3 bg-blue-50 hover:bg-blue-100 rounded-md transition-colors"
            >
              <div className="flex items-center">
                <CheckCircle size={18} className="text-blue-600 mr-2" />
                <span className="font-medium">Verify Attendance</span>
              </div>
            </a>
            <a
              href="/admin/accounts"
              className="block p-3 bg-purple-50 hover:bg-purple-100 rounded-md transition-colors"
            >
              <div className="flex items-center">
                <Users size={18} className="text-purple-600 mr-2" />
                <span className="font-medium">Manage Employees</span>
              </div>
            </a>
            <a
              href="/admin/prediction"
              className="block p-3 bg-durian-yellow-50 hover:bg-durian-yellow-100 rounded-md transition-colors"
            >
              <div className="flex items-center">
                <DollarSign size={18} className="text-durian-yellow-600 mr-2" />
                <span className="font-medium">Predict Durian Quality</span>
              </div>
            </a>
          </div>
        </Card>
      </div>
    </div>
  );
};
