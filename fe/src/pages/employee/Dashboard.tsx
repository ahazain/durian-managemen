import React, { useState, useEffect } from "react";
import {
  Calendar,
  CheckCircle,
  Clock,
  Citrus as Fruit,
  Loader2,
} from "lucide-react";
import { format, startOfMonth, endOfMonth } from "date-fns";
import { id } from "date-fns/locale";
import toast from "react-hot-toast";
import { Card } from "../../components/common/Card";
import { Button } from "../../components/common/Button";
import { useAuth } from "../../contexts/AuthContext";
import { api } from "../../utils/api";
import { useNavigate } from "react-router-dom";

// Interface untuk schedule
interface Schedule {
  id: string;
  title: string;
  start: string;
  end: string;
  description?: string;
}

// Interface untuk attendance stats
interface AttendanceStats {
  present: number;
  absent: number;
  late: number;
  month: string;
}

export const EmployeeDashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // State for check-in functionality
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // State for schedule functionality
  const [todaySchedules, setTodaySchedules] = useState<Schedule[]>([]);
  const [scheduleLoading, setScheduleLoading] = useState(true);

  // State for monthly attendance
  const [attendanceStats, setAttendanceStats] = useState<AttendanceStats>({
    present: 0,
    absent: 0,
    late: 0,
    month: "",
  });
  const [attendanceLoading, setAttendanceLoading] = useState(true);

  // FIXED: Timezone utility functions
  const getIndonesiaTime = (date: Date = new Date()): Date => {
    // Menggunakan Intl API untuk timezone yang akurat
    const indonesiaTimeString = date.toLocaleString("en-US", {
      timeZone: "Asia/Jakarta",
    });
    return new Date(indonesiaTimeString);
  };

  const formatIndonesiaTime = (
    date: Date | string,
    formatStr: string = "HH:mm"
  ): string => {
    const dateObj = typeof date === "string" ? new Date(date) : date;
    const indonesiaDate = getIndonesiaTime(dateObj);
    return format(indonesiaDate, formatStr, { locale: id });
  };

  const formatIndonesiaDate = (
    date: Date | string,
    formatStr: string = "EEEE, d MMMM yyyy"
  ): string => {
    const dateObj = typeof date === "string" ? new Date(date) : date;
    const indonesiaDate = getIndonesiaTime(dateObj);
    return format(indonesiaDate, formatStr, { locale: id });
  };

  const getTodayIndonesia = (): string => {
    const today = getIndonesiaTime();
    return format(today, "yyyy-MM-dd");
  };

  const getCurrentIndonesiaTime = (): Date => {
    return getIndonesiaTime();
  };

  // FIXED: Format schedule time dengan timezone Indonesia yang benar
  const formatScheduleTime = (dateString: string): string => {
    return formatIndonesiaTime(dateString, "HH:mm");
  };

  // Check if user has already checked in
  useEffect(() => {
    // FIXED: Gunakan tanggal Indonesia untuk pengecekan
    const todayIndonesia = getTodayIndonesia();
    const checkedInToday =
      localStorage.getItem("checkedInDate") === todayIndonesia;
    setIsCheckedIn(checkedInToday);

    // Fetch today's schedules and monthly attendance
    fetchTodaySchedules();
    fetchMonthlyAttendance();
  }, []);

  // FIXED: Fetch today's schedules dengan timezone Indonesia
  const fetchTodaySchedules = async (): Promise<void> => {
    try {
      setScheduleLoading(true);
      const response = await api.getEmployeeSchedules();
      const schedules: Schedule[] = response.data || [];

      // FIXED: Filter schedules untuk hari ini dengan timezone Indonesia
      const todayIndonesia = getTodayIndonesia();
      const todaySchedulesList = schedules.filter((schedule: Schedule) => {
        // Convert schedule date ke Indonesia timezone
        const scheduleIndonesiaTime = getIndonesiaTime(
          new Date(schedule.start)
        );
        const scheduleDateStr = format(scheduleIndonesiaTime, "yyyy-MM-dd");

        // Debug logging
        console.log("Schedule original:", schedule.start);
        console.log("Schedule Indonesia time:", scheduleIndonesiaTime);
        console.log("Schedule date string:", scheduleDateStr);
        console.log("Today Indonesia:", todayIndonesia);
        console.log("Match:", scheduleDateStr === todayIndonesia);

        return scheduleDateStr === todayIndonesia;
      });

      setTodaySchedules(todaySchedulesList);
    } catch (error) {
      console.error("Failed to fetch schedules:", error);
      setTodaySchedules([]);
    } finally {
      setScheduleLoading(false);
    }
  };

  // Fetch monthly attendance data
  const fetchMonthlyAttendance = async (): Promise<void> => {
    try {
      setAttendanceLoading(true);

      // FIXED: Get start and end date of current month dalam timezone Indonesia
      const currentMonth = getIndonesiaTime();
      const startDate = format(startOfMonth(currentMonth), "yyyy-MM-dd");
      const endDate = format(endOfMonth(currentMonth), "yyyy-MM-dd");

      const response = await api.getRecapAbsensi(startDate, endDate);

      console.log("Full API Response:", response);

      if (response.success && response.data) {
        const responseData = response.data;

        console.log("Response data object:", responseData);
        console.log("Individual properties:", {
          bulan: responseData.bulan,
          hadir: responseData.hadir,
          alpha: responseData.alpha,
          telat: responseData.telat,
        });

        // Enhanced function to parse attendance values with better error handling
        const parseAttendanceValue = (
          value: any,
          fieldName: string
        ): number => {
          console.log(`Parsing ${fieldName}:`, value, "Type:", typeof value);

          // Handle null or undefined
          if (value === null || value === undefined) {
            console.warn(`${fieldName} is null/undefined`);
            return 0;
          }

          // Handle number type
          if (typeof value === "number") {
            return value;
          }

          // Handle string type
          if (typeof value === "string") {
            // Extract numbers from strings like "1 hari" -> 1
            const match = value.match(/\d+/);
            const result = match ? parseInt(match[0], 10) : 0;
            console.log(`Extracted from "${value}":`, result);
            return result;
          }

          // Return 0 for other types
          console.warn(
            `Unexpected type for ${fieldName}:`,
            typeof value,
            value
          );
          return 0;
        };

        // Parse each field individually with logging
        const presentCount = parseAttendanceValue(responseData.hadir, "hadir");
        const absentCount = parseAttendanceValue(responseData.alpha, "alpha");
        const lateCount = parseAttendanceValue(responseData.telat, "telat");

        console.log("Parsed values:", { presentCount, absentCount, lateCount });

        setAttendanceStats({
          present: presentCount,
          absent: absentCount,
          late: lateCount,
          month:
            responseData.bulan ||
            formatIndonesiaTime(getCurrentIndonesiaTime(), "MMMM"),
        });
      } else {
        // Fallback to default values if API fails
        console.warn("API response unsuccessful or no data:", response);
        setAttendanceStats({
          present: 0,
          absent: 0,
          late: 0,
          month: formatIndonesiaTime(getCurrentIndonesiaTime(), "MMMM"),
        });
      }
    } catch (error) {
      console.error("Failed to fetch monthly attendance:", error);

      // Log the full error for debugging
      if (error instanceof Error) {
        console.error("Error details:", error.message);
        console.error("Error stack:", error.stack);
      }

      toast.error("Gagal memuat data kehadiran bulanan");

      // Set default values on error
      setAttendanceStats({
        present: 0,
        absent: 0,
        late: 0,
        month: formatIndonesiaTime(getCurrentIndonesiaTime(), "MMMM"),
      });
    } finally {
      setAttendanceLoading(false);
    }
  };

  // FIXED: Handle check-in dengan timezone Indonesia
  const handleCheckIn = async (): Promise<void> => {
    if (isCheckedIn) return;

    setIsLoading(true);
    try {
      const response = await api.checkIn();

      // FIXED: Update state dan store tanggal Indonesia
      setIsCheckedIn(true);
      const todayIndonesia = getTodayIndonesia();
      localStorage.setItem("checkedInDate", todayIndonesia);

      toast.success("Berhasil melakukan check in!");

      // Refresh monthly attendance after successful check-in
      fetchMonthlyAttendance();
    } catch (error: any) {
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
  const handleNavigateToSchedule = (): void => {
    navigate("schedule");
  };

  const handleNavigateToAttendance = (): void => {
    navigate("attendance");
  };

  const handleNavigateToPrediction = (): void => {
    navigate("prediction");
  };

  const handleNavigateToAccount = (): void => {
    navigate("account");
  };

  // Calculate total working days for percentage calculation
  const totalWorkingDays =
    attendanceStats.present + attendanceStats.absent + attendanceStats.late;
  const maxDays = Math.max(totalWorkingDays, 23); // Use 23 as minimum for percentage calculation

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Selamat datang, {user?.nama}
        </h1>
        <p className="text-gray-600">
          {formatIndonesiaDate(getCurrentIndonesiaTime(), "EEEE, d MMMM yyyy")}
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
              {formatIndonesiaDate(getCurrentIndonesiaTime(), "d MMMM yyyy")} |
              Waktu saat ini:{" "}
              {formatIndonesiaTime(getCurrentIndonesiaTime(), "HH:mm")} WIB
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
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-medium text-gray-800">
              Kehadiran Bulanan
            </h3>
            {attendanceLoading && (
              <Loader2 size={16} className="animate-spin text-gray-400" />
            )}
          </div>

          {attendanceStats.month && (
            <p className="text-sm text-gray-600 mb-3">
              Bulan {attendanceStats.month}
            </p>
          )}

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Hadir</span>
              <span className="font-semibold text-green-600">
                {attendanceStats.present} hari
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-green-500 h-2.5 rounded-full transition-all duration-500"
                style={{
                  width: `${
                    totalWorkingDays > 0
                      ? (attendanceStats.present / maxDays) * 100
                      : 0
                  }%`,
                }}
              ></div>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Absen</span>
              <span className="font-semibold text-red-600">
                {attendanceStats.absent} hari
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-red-500 h-2.5 rounded-full transition-all duration-500"
                style={{
                  width: `${
                    totalWorkingDays > 0
                      ? (attendanceStats.absent / maxDays) * 100
                      : 0
                  }%`,
                }}
              ></div>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Telat</span>
              <span className="font-semibold text-yellow-600">
                {attendanceStats.late} hari
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-yellow-500 h-2.5 rounded-full transition-all duration-500"
                style={{
                  width: `${
                    totalWorkingDays > 0
                      ? (attendanceStats.late / maxDays) * 100
                      : 0
                  }%`,
                }}
              ></div>
            </div>

            {totalWorkingDays > 0 && (
              <div className="text-xs text-gray-500 mt-2 pt-2 border-t">
                Total: {totalWorkingDays} hari kerja
              </div>
            )}
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
