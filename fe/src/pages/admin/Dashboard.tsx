import React, { useState, useEffect } from "react";
import { Users, Calendar, CheckCircle, DollarSign } from "lucide-react";
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

  // Recent activities mock data
  const activities = [
    {
      id: 1,
      user: "Budi Santoso",
      action: "checked in",
      time: "08:02 AM",
      date: "Today",
    },
    {
      id: 2,
      user: "Sarah Wijaya",
      action: "submitted durian quality prediction",
      time: "09:15 AM",
      date: "Today",
    },
    {
      id: 3,
      user: "Ahmad Rahman",
      action: "completed scheduled task",
      time: "11:30 AM",
      date: "Today",
    },
    {
      id: 4,
      user: "Dewi Lestari",
      action: "checked in",
      time: "07:50 AM",
      date: "Yesterday",
    },
    {
      id: 5,
      user: "Rini Puspita",
      action: "updated profile information",
      time: "02:45 PM",
      date: "Yesterday",
    },
  ];

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Welcome back, {user?.fullName}
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
        {/* Recent Activity */}
        <Card title="Recent Activity" className="lg:col-span-2">
          <div className="divide-y divide-gray-200">
            {activities.map((activity) => (
              <div key={activity.id} className="py-3 first:pt-0 last:pb-0">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-gray-800">
                      {activity.user}{" "}
                      <span className="font-normal text-gray-600">
                        {activity.action}
                      </span>
                    </p>
                    <p className="text-sm text-gray-500">
                      {activity.time} • {activity.date}
                    </p>
                  </div>
                </div>
              </div>
            ))}
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
