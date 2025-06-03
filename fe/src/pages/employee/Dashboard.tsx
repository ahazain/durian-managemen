import React, { useState, useEffect } from "react";
import {
  Calendar,
  CheckCircle,
  Clock,
  Citrus as Fruit,
  Loader2,
} from "lucide-react";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import toast from "react-hot-toast"; // Changed: Use react-hot-toast instead of custom Toast
import { Card } from "../../components/common/Card";
import { Button } from "../../components/common/Button";
import { useAuth } from "../../contexts/AuthContext";
import { api } from "../../utils/api";
import { useNavigate } from "react-router-dom";

export const EmployeeDashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const today = new Date();

  // State for check-in functionality
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // Removed: toast state since we're using react-hot-toast

  // State for schedule functionality
  const [todaySchedules, setTodaySchedules] = useState<any[]>([]);
  const [scheduleLoading, setScheduleLoading] = useState(true);

  // Check if user has already checked in (could be extended to fetch from API)
  useEffect(() => {
    // You could check localStorage or make an API call to verify if user has checked in today
    const checkedInToday =
      localStorage.getItem("checkedInDate") === format(today, "yyyy-MM-dd");
    setIsCheckedIn(checkedInToday);

    // Fetch today's schedules
    fetchTodaySchedules();
  }, []);

  // Fetch today's schedules
  const fetchTodaySchedules = async () => {
    try {
      setScheduleLoading(true);
      const response = await api.getEmployeeSchedules();
      const schedules = response.data || [];

      // Filter schedules for today
      const todayFormatted = format(today, "yyyy-MM-dd");
      const todaySchedulesList = schedules.filter((schedule: any) => {
        const scheduleDate = format(new Date(schedule.start), "yyyy-MM-dd");
        return scheduleDate === todayFormatted;
      });

      setTodaySchedules(todaySchedulesList);
    } catch (error) {
      console.error("Failed to fetch schedules:", error);
      setTodaySchedules([]);
    } finally {
      setScheduleLoading(false);
    }
  };

  // Handle check-in
  const handleCheckIn = async () => {
    if (isCheckedIn) return;

    setIsLoading(true);
    try {
      const response = await api.checkIn();

      // Update state and store in localStorage
      setIsCheckedIn(true);
      localStorage.setItem("checkedInDate", format(today, "yyyy-MM-dd"));

      // Changed: Use react-hot-toast instead of custom toast state
      toast.success("Berhasil melakukan check in!");
    } catch (error: any) {
      // Changed: Use react-hot-toast with better error handling
      let errorMessage = "Gagal melakukan check in. Silakan coba lagi.";

      if (error.message) {
        errorMessage = error.message;
      } else if (error.status === 400) {
        errorMessage =
          "Data check in tidak valid. Periksa kembali informasi Anda.";
      } else if (error.status === 409) {
        errorMessage = "Anda sudah melakukan check in hari ini.";
      } else if (error.status === 500) {
        errorMessage = "Terjadi kesalahan server. Silakan coba lagi nanti.";
      } else if (error.status === 401) {
        errorMessage = "Sesi Anda telah berakhir. Silakan login kembali.";
      }

      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // Navigation handlers
  const handleNavigateToSchedule = () => {
    navigate("schedule");
  };

  const handleNavigateToAttendance = () => {
    navigate("attendance");
  };

  const handleNavigateToPrediction = () => {
    navigate("prediction");
  };

  const handleNavigateToAccount = () => {
    navigate("account");
  };

  // Helper functions untuk format waktu Indonesia
  const formatScheduleTime = (dateString: string) => {
    const date = new Date(dateString);
    // Convert to Indonesia timezone (UTC+7)
    const indonesiaTime = new Date(date.getTime() + 7 * 60 * 60 * 1000);
    return format(indonesiaTime, "HH:mm", { locale: id });
  };

  const getCurrentIndonesiaTime = () => {
    const now = new Date();
    // Convert to Indonesia timezone (UTC+7)
    const indonesiaTime = new Date(now.getTime() + 7 * 60 * 60 * 1000);
    return indonesiaTime;
  };

  // Mock data
  const attendanceStats = {
    present: 18,
    absent: 2,
    late: 3,
  };

  return (
    <div className="animate-fade-in">
      {/* Removed: Custom Toast component */}

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Selamat datang, {user?.nama}
        </h1>
        <p className="text-gray-600">
          {format(getCurrentIndonesiaTime(), "EEEE, d MMMM yyyy", {
            locale: id,
          })}
        </p>
      </div>

      {/* Check-in Section */}
      <Card className="mb-6">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-4 md:mb-0">
            <h2 className="text-lg font-semibold text-gray-800">
              Kehadiran Hari Ini
            </h2>
            <p className="text-gray-600">
              {format(getCurrentIndonesiaTime(), "d MMMM yyyy", { locale: id })}{" "}
              | Waktu saat ini:{" "}
              {format(getCurrentIndonesiaTime(), "HH:mm", { locale: id })} WIB
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
        {/* Today's Schedule */}
        <Card className="col-span-2">
          <div className="flex items-start">
            <div className="mr-4 p-2 bg-durian-yellow-100 rounded-full">
              <Calendar className="h-6 w-6 text-durian-yellow-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-medium text-gray-800">
                Jadwal Hari ini
              </h3>

              {scheduleLoading ? (
                <div className="mt-2 flex items-center">
                  <Loader2 size={16} className="animate-spin mr-2" />
                  <span className="text-sm text-gray-600">
                    Memuat jadwal...
                  </span>
                </div>
              ) : todaySchedules.length > 0 ? (
                <div className="mt-2 space-y-2">
                  {todaySchedules.slice(0, 2).map((schedule, index) => (
                    <div
                      key={schedule.id || index}
                      className="border-l-2 border-durian-400 pl-3"
                    >
                      <h4 className="font-semibold text-durian-800">
                        {schedule.title}
                      </h4>
                      <p className="text-gray-600 text-sm">
                        {formatScheduleTime(schedule.start)} -{" "}
                        {formatScheduleTime(schedule.end)}
                      </p>
                      {schedule.description && (
                        <p className="text-gray-500 text-xs mt-1">
                          {schedule.description}
                        </p>
                      )}
                    </div>
                  ))}
                  {todaySchedules.length > 2 && (
                    <p className="text-xs text-gray-500 mt-2">
                      +{todaySchedules.length - 2} jadwal lainnya
                    </p>
                  )}
                </div>
              ) : (
                <div className="mt-2">
                  <p className="text-gray-600 text-sm">
                    Tidak ada jadwal untuk hari ini
                  </p>
                </div>
              )}

              <div className="mt-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleNavigateToSchedule}
                >
                  Lihat Semua Jadwal
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Monthly Attendance */}
        <Card>
          <h3 className="text-lg font-medium text-gray-800 mb-3">
            Kehadiran Bulanan
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
      <Card title="Akses Cepat" className="mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div
            className="p-4 bg-durian-50 hover:bg-durian-100 rounded-lg transition-colors cursor-pointer"
            onClick={handleNavigateToAttendance}
          >
            <div className="flex flex-col items-center text-center">
              <div className="p-3 bg-white rounded-full shadow-sm mb-3">
                <CheckCircle className="h-6 w-6 text-durian-600" />
              </div>
              <h4 className="font-medium text-gray-800">Absensi</h4>
              <p className="text-xs text-gray-600 mt-1">
                Tandai kehadiran & lihat riwayat
              </p>
            </div>
          </div>

          <div
            className="p-4 bg-durian-yellow-50 hover:bg-durian-yellow-100 rounded-lg transition-colors cursor-pointer"
            onClick={handleNavigateToSchedule}
          >
            <div className="flex flex-col items-center text-center">
              <div className="p-3 bg-white rounded-full shadow-sm mb-3">
                <Calendar className="h-6 w-6 text-durian-yellow-600" />
              </div>
              <h4 className="font-medium text-gray-800">Jadwal Kerja</h4>
              <p className="text-xs text-gray-600 mt-1">
                Lihat jadwal yang akan datang
              </p>
            </div>
          </div>

          <div
            className="p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors cursor-pointer"
            onClick={handleNavigateToPrediction}
          >
            <div className="flex flex-col items-center text-center">
              <div className="p-3 bg-white rounded-full shadow-sm mb-3">
                <Fruit className="h-6 w-6 text-green-600" />
              </div>
              <h4 className="font-medium text-gray-800">Kualitas Durian</h4>
              <p className="text-xs text-gray-600 mt-1">
                Prediksi kualitas durian menggunakan AI
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
