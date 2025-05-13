import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { CheckCircle, Calendar, Clock } from "lucide-react";
import { Card } from "../../components/common/Card";
import { Button } from "../../components/common/Button";
import { api } from "../../utils/api";

export const EmployeeAttendance: React.FC = () => {
  const [hasCheckedIn, setHasCheckedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [attendanceHistory, setAttendanceHistory] = useState<any[]>([]);
  const today = new Date();

  useEffect(() => {
    fetchAttendanceHistory();
  }, []);

  const fetchAttendanceHistory = async () => {
    try {
      const response = await api.getAttendanceHistory();
      setAttendanceHistory(response.data);
      // Check if user has already checked in today
      const todayAttendance = response.data.find(
        (record: any) =>
          format(new Date(record.tanggal), "yyyy-MM-dd") ===
          format(today, "yyyy-MM-dd")
      );
      setHasCheckedIn(!!todayAttendance);
      setError(null);
    } catch (err) {
      setError("Failed to fetch attendance history");
      console.error("Error fetching attendance:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCheckIn = async () => {
    try {
      await api.checkIn();
      setHasCheckedIn(true);
      await fetchAttendanceHistory(); // Refresh the history
    } catch (err) {
      console.error("Error checking in:", err);
      setError("Failed to check in. Please try again.");
    }
  };

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "MMMM d, yyyy");
  };

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-600 py-8">{error}</div>;
  }

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Attendance</h1>
        <p className="text-gray-600">
          Record your daily attendance and view history.
        </p>
      </div>

      {/* Today's Attendance */}
      <Card className="mb-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <div className="flex items-center">
              <Calendar className="h-5 w-5 text-durian-600 mr-2" />
              <h2 className="text-lg font-semibold text-gray-800">
                Today's Attendance
              </h2>
            </div>
            <p className="text-gray-600 mt-1">
              {format(today, "EEEE, MMMM d, yyyy")}
            </p>
            <p className="text-gray-600">
              Current Time: {format(today, "h:mm a")}
            </p>
          </div>

          <div className="text-center">
            {hasCheckedIn ? (
              <div className="flex flex-col items-center">
                <div className="mb-2 p-3 bg-green-100 rounded-full">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <p className="font-medium text-green-700">Checked In</p>
                <p className="text-green-600 text-sm">
                  {format(today, "h:mm a")}
                </p>
              </div>
            ) : (
              <Button
                variant="primary"
                icon={<Clock size={18} />}
                onClick={handleCheckIn}
                size="lg"
              >
                Check In Now
              </Button>
            )}
          </div>
        </div>
      </Card>

      {/* Attendance History */}
      <Card title="Attendance History">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Check-in Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {attendanceHistory.map((record) => (
                <tr key={record.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {formatDate(record.tanggal)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {format(new Date(record.tanggal), "HH:mm")}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        record.verifikasi
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {record.verifikasi ? "Verified" : "Pending"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
