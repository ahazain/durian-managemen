import React, { useState, useEffect } from "react";
import {
  Calendar,
  CheckCircle,
  Clock,
  Citrus as Fruit,
  Loader2,
} from "lucide-react";
import { format } from "date-fns";
import { Card } from "../../components/common/Card";
import { Button } from "../../components/common/Button";
import { useAuth } from "../../contexts/AuthContext";
import { api } from "../../utils/api"; // Adjust this path if needed
import { Toast } from "../../components/common/Toast"; // Adjust this path if needed

export const EmployeeDashboard: React.FC = () => {
  const { user } = useAuth();
  const today = new Date();

  // State for check-in functionality
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  // Check if user has already checked in (could be extended to fetch from API)
  useEffect(() => {
    // You could check localStorage or make an API call to verify if user has checked in today
    const checkedInToday =
      localStorage.getItem("checkedInDate") === format(today, "yyyy-MM-dd");
    setIsCheckedIn(checkedInToday);
  }, []);

  // Handle check-in
  const handleCheckIn = async () => {
    if (isCheckedIn) return;

    setIsLoading(true);
    try {
      const response = await api.checkIn();

      // Update state and store in localStorage
      setIsCheckedIn(true);
      localStorage.setItem("checkedInDate", format(today, "yyyy-MM-dd"));

      // Show success message
      setToast({ message: "Successfully checked in!", type: "success" });
    } catch (error) {
      // Show error message
      setToast({
        message:
          error instanceof Error
            ? error.message
            : "Failed to check in. Please try again.",
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Mock data
  const nextSchedule = {
    title: "Morning Harvesting",
    date: format(
      new Date(today.getTime() + 24 * 60 * 60 * 1000),
      "MMMM d, yyyy"
    ),
    startTime: "07:00 AM",
    endTime: "11:00 AM",
  };

  const attendanceStats = {
    present: 18,
    absent: 2,
    late: 3,
  };

  return (
    <div className="animate-fade-in">
      {/* Toast notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Welcome, {user?.fullName}
        </h1>
        <p className="text-gray-600">{format(today, "EEEE, MMMM d, yyyy")}</p>
      </div>

      {/* Check-in Section */}
      <Card className="mb-6">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-4 md:mb-0">
            <h2 className="text-lg font-semibold text-gray-800">
              Today's Attendance
            </h2>
            <p className="text-gray-600">
              {format(today, "MMMM d, yyyy")} | Current time:{" "}
              {format(today, "h:mm a")}
            </p>
          </div>
          <Button
            variant={isCheckedIn ? "success" : "primary"}
            icon={
              isLoading ? (
                <Loader2 size={18} className="animate-spin" />
              ) : isCheckedIn ? (
                <CheckCircle size={18} />
              ) : (
                <Clock size={18} />
              )
            }
            disabled={isCheckedIn || isLoading}
            onClick={handleCheckIn}
            className="transition-all duration-300"
          >
            {isLoading
              ? "Processing..."
              : isCheckedIn
              ? "Checked In"
              : "Check In Now"}
          </Button>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* Next Schedule */}
        <Card className="col-span-2">
          <div className="flex items-start">
            <div className="mr-4 p-2 bg-durian-yellow-100 rounded-full">
              <Calendar className="h-6 w-6 text-durian-yellow-600" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-800">
                Next Schedule
              </h3>
              <div className="mt-2">
                <h4 className="font-semibold text-durian-800">
                  {nextSchedule.title}
                </h4>
                <p className="text-gray-600 text-sm">{nextSchedule.date}</p>
                <p className="text-gray-600 text-sm">
                  {nextSchedule.startTime} - {nextSchedule.endTime}
                </p>
              </div>
              <div className="mt-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => console.log("View all schedules")}
                >
                  View All Schedules
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Monthly Attendance */}
        <Card>
          <h3 className="text-lg font-medium text-gray-800 mb-3">
            Monthly Attendance
          </h3>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Present</span>
              <span className="font-semibold text-green-600">
                {attendanceStats.present} days
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-green-500 h-2.5 rounded-full transition-all duration-500"
                style={{ width: `${(attendanceStats.present / 23) * 100}%` }}
              ></div>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Absent</span>
              <span className="font-semibold text-red-600">
                {attendanceStats.absent} days
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-red-500 h-2.5 rounded-full transition-all duration-500"
                style={{ width: `${(attendanceStats.absent / 23) * 100}%` }}
              ></div>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Late</span>
              <span className="font-semibold text-yellow-600">
                {attendanceStats.late} days
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-yellow-500 h-2.5 rounded-full transition-all duration-500"
                style={{ width: `${(attendanceStats.late / 23) * 100}%` }}
              ></div>
            </div>
          </div>
        </Card>
      </div>

      {/* Quick Access */}
      <Card title="Quick Access">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div
            className="p-4 bg-durian-50 hover:bg-durian-100 rounded-lg transition-colors cursor-pointer"
            onClick={() => console.log("Navigate to attendance")}
          >
            <div className="flex flex-col items-center text-center">
              <div className="p-3 bg-white rounded-full shadow-sm mb-3">
                <CheckCircle className="h-6 w-6 text-durian-600" />
              </div>
              <h4 className="font-medium text-gray-800">Attendance</h4>
              <p className="text-xs text-gray-600 mt-1">
                Mark attendance & view history
              </p>
            </div>
          </div>

          <div
            className="p-4 bg-durian-yellow-50 hover:bg-durian-yellow-100 rounded-lg transition-colors cursor-pointer"
            onClick={() => console.log("Navigate to schedule")}
          >
            <div className="flex flex-col items-center text-center">
              <div className="p-3 bg-white rounded-full shadow-sm mb-3">
                <Calendar className="h-6 w-6 text-durian-yellow-600" />
              </div>
              <h4 className="font-medium text-gray-800">My Schedule</h4>
              <p className="text-xs text-gray-600 mt-1">
                View upcoming schedules
              </p>
            </div>
          </div>

          <div
            className="p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors cursor-pointer"
            onClick={() => console.log("Navigate to durian prediction")}
          >
            <div className="flex flex-col items-center text-center">
              <div className="p-3 bg-white rounded-full shadow-sm mb-3">
                <Fruit className="h-6 w-6 text-green-600" />
              </div>
              <h4 className="font-medium text-gray-800">Durian Quality</h4>
              <p className="text-xs text-gray-600 mt-1">
                Predict durian quality
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
