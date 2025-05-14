import React, { useState, useEffect } from "react";
import {
  Users,
  Calendar,
  CheckCircle,
  DollarSign,
  Bell,
  Clock,
  ArrowRight,
} from "lucide-react";
import { Card } from "../../components/common/Card";
import { useAuth } from "../../contexts/AuthContext";
import { api } from "../../utils/api";

export const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const [totalEmployees, setTotalEmployees] = useState(0);
  const [attendanceStats, setAttendanceStats] = useState({
    verified: 0,
    pending: 0,
  });
  const [recentCheckIn, setRecentCheckIn] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setIsLoading(true);
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

      // Fetch recent check-ins
      const recent = await api.getRecentCheckIn();

      if (recent.data && Array.isArray(recent.data)) {
        const recentWithFormattedDates = recent.data.map((checkIn: any) => ({
          ...checkIn,
          tanggal: new Date(checkIn.tanggal), // Convert tanggal string to Date object
        }));
        setRecentCheckIn(recentWithFormattedDates);
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setIsLoading(false);
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

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString("id-ID", {
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const groupCheckInsByDate = (checkIns: any[]) => {
    const grouped: Record<string, any[]> = {};

    checkIns.forEach((checkIn) => {
      const dateKey = formatDate(checkIn.tanggal);
      if (!grouped[dateKey]) {
        grouped[dateKey] = [];
      }
      grouped[dateKey].push(checkIn);
    });

    return grouped;
  };

  const getInitials = (name: string): string => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase();
  };

  const getStatusColor = (status: string): string => {
    switch (status.toLowerCase()) {
      case "masuk":
        return "bg-green-500";
      case "pulang":
        return "bg-blue-500";
      case "izin":
        return "bg-purple-500";
      case "sakit":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusBadgeColor = (status: string): string => {
    switch (status.toLowerCase()) {
      case "masuk":
        return "bg-green-100 text-green-800";
      case "pulang":
        return "bg-blue-100 text-blue-800";
      case "izin":
        return "bg-purple-100 text-purple-800";
      case "sakit":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const groupedCheckIns = groupCheckInsByDate(recentCheckIn);

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
        {/* Recent Check-ins Card */}
        <Card className="lg:col-span-2 overflow-hidden">
          <div className="p-5 pb-3 flex items-center justify-between">
            <div className="flex items-center">
              <Calendar size={20} className="text-durian-600 mr-2" />
              <h2 className="text-lg font-semibold text-gray-800">
                Recent Check-ins
              </h2>
            </div>
            <Bell className="text-gray-400 hover:text-durian-600 cursor-pointer transition-colors duration-200" />
          </div>

          <div className="px-5 pb-2">
            <div className="h-px w-full bg-gray-100"></div>
          </div>

          <div className="p-4 max-h-96 overflow-y-auto">
            {Object.keys(groupedCheckIns).length > 0 ? (
              Object.entries(groupedCheckIns).map(([date, checkIns]) => (
                <div key={date} className="mb-5 last:mb-0">
                  <div className="flex items-center mb-3">
                    <div className="h-px flex-grow bg-gray-200"></div>
                    <span className="px-3 text-xs font-medium text-gray-500">
                      {date}
                    </span>
                    <div className="h-px flex-grow bg-gray-200"></div>
                  </div>

                  <div className="space-y-3">
                    {checkIns.map((checkIn) => (
                      <div
                        key={checkIn.id}
                        className="flex items-start p-2.5 rounded-lg hover:bg-gray-50 transition-all duration-200 animate-fade-in"
                      >
                        <div
                          className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-white font-medium shadow-sm
                          ${getStatusColor(checkIn.status)}`}
                        >
                          {getInitials(checkIn.nama)}
                        </div>
                        <div className="ml-3 flex-grow">
                          <div className="flex flex-wrap items-center gap-1.5">
                            <p className="font-medium text-gray-800">
                              {checkIn.nama}
                            </p>
                            <span
                              className={`px-2 py-0.5 text-xs rounded-full font-medium
                              ${getStatusBadgeColor(checkIn.status)}`}
                            >
                              {checkIn.status}
                            </span>
                            {checkIn.verified !== undefined && (
                              <span
                                className={`px-2 py-0.5 text-xs rounded-full font-medium
                                ${
                                  checkIn.verified
                                    ? "bg-emerald-100 text-emerald-800"
                                    : "bg-amber-100 text-amber-800"
                                }`}
                              >
                                {checkIn.verified ? "Verified" : "Pending"}
                              </span>
                            )}
                          </div>
                          <div className="flex items-center mt-1 text-sm text-gray-500">
                            <Clock size={14} className="mr-1" />
                            {checkIn.tanggal.toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <div className="py-6 text-center text-gray-500">
                <p>No recent check-ins available.</p>
              </div>
            )}
          </div>

          <div className="p-3 bg-gray-50 border-t border-gray-200 hover:bg-gray-100 transition-colors duration-200">
            <a
              href="/admin/attendance"
              className="block w-full py-2 text-center text-sm font-medium text-durian-600 hover:text-durian-700 transition-colors flex items-center justify-center"
            >
              View All Check-ins
              <ArrowRight size={16} className="ml-1" />
            </a>
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
