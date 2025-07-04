import React, { useState, useEffect } from "react";
import { Calendar, Search, ChevronLeft, ChevronRight } from "lucide-react";
import { format, addDays, startOfWeek, isSameDay } from "date-fns";
import { id } from "date-fns/locale";
import toast from "react-hot-toast";
import { Schedule } from "../../types";
import { api } from "../../utils/api";
import { Card } from "../../components/common/Card";
import { Input } from "../../components/common/Input";

export const EmployeeSchedule: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentWeekStart, setCurrentWeekStart] = useState(
    startOfWeek(new Date())
  );
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSchedules();
  }, []);

  const currentWeekDays = Array.from({ length: 7 }, (_, i) =>
    addDays(currentWeekStart, i)
  );

  const fetchSchedules = async () => {
    try {
      setLoading(true);
      const response = await api.getEmployeeSchedules();

      // Set schedules regardless of whether data exists or not
      const scheduleData = response.data || [];
      setSchedules(scheduleData);

      // Show appropriate toast message
      if (scheduleData.length > 0) {
        toast.success("Jadwal berhasil dimuat");
      } else {
        toast("Tidak ada jadwal yang tersedia", {
          icon: "📅",
          duration: 3000,
        });
      }
    } catch (err: any) {
      setSchedules([]);

      if (err.response) {
        const { status, data } = err.response;

        switch (status) {
          case 404:
            toast.error("Data jadwal tidak ditemukan", {
              duration: 4000,
            });
            break;
          case 401:
            toast.error("Sesi Anda telah berakhir. Silakan login kembali", {
              duration: 5000,
            });
            break;
          case 403:
            toast.error("Anda tidak memiliki akses untuk melihat jadwal", {
              duration: 4000,
            });
            break;
          case 500:
            toast.error("Terjadi kesalahan pada server. Coba lagi nanti", {
              duration: 5000,
            });
            break;
          case 503:
            toast.error("Layanan sedang dalam maintenance", {
              duration: 5000,
            });
            break;
          default:
            toast.error(
              data?.message || `Terjadi kesalahan (${status}). Coba lagi nanti`,
              {
                duration: 4000,
              }
            );
        }
      } else if (err.request) {
        toast.error(
          "Tidak dapat terhubung ke server. Periksa koneksi internet Anda",
          {
            duration: 5000,
          }
        );
      }

      console.error("Error fetching schedules:", err);
    } finally {
      setLoading(false);
    }
  };

  // Helper functions dengan format Indonesia
  const formatScheduleDate = (dateString: string) => {
    return format(new Date(dateString), "EEEE, d MMMM yyyy", { locale: id });
  };

  const formatScheduleTime = (dateString: string) => {
    return format(new Date(dateString), "H:mm");
  };

  // Filter schedules based on search term
  const filteredSchedules = schedules.filter(
    (schedule) =>
      schedule.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      schedule.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get schedules for the selected date
  const schedulesForSelectedDate = filteredSchedules.filter((schedule) =>
    isSameDay(new Date(schedule.start), selectedDate)
  );

  // Navigate between weeks
  const navigatePreviousWeek = () => {
    const newWeekStart = addDays(currentWeekStart, -7);
    setCurrentWeekStart(newWeekStart);
    setSelectedDate(newWeekStart); // Select the first day of the new week
  };

  const navigateNextWeek = () => {
    const newWeekStart = addDays(currentWeekStart, 7);
    setCurrentWeekStart(newWeekStart);
    setSelectedDate(newWeekStart); // Select the first day of the new week
  };

  // Refresh schedules function with toast feedback
  const handleRefreshSchedules = async () => {
    toast.loading("Memuat ulang jadwal...", { id: "refresh-schedules" });
    await fetchSchedules();
    toast.dismiss("refresh-schedules");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-durian-600"></div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Jadwal Saya</h1>
            <p className="text-gray-600">
              Lihat jadwal kerja Anda yang akan datang
            </p>
          </div>
          <button
            onClick={handleRefreshSchedules}
            className="px-4 py-2 mr-14 bg-durian-600 text-white rounded-lg hover:bg-durian-700 transition-colors"
            disabled={loading}
          >
            Refresh
          </button>
        </div>
      </div>

      {/* Date Navigation */}
      <Card className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={navigatePreviousWeek}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Previous week"
          >
            <ChevronLeft size={20} />
          </button>
          <h3 className="text-lg font-semibold">
            {format(currentWeekStart, "MMMM yyyy", { locale: id })}
          </h3>
          <button
            onClick={navigateNextWeek}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Next week"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        <div className="flex overflow-x-auto space-x-2 pb-2">
          {currentWeekDays.map((date, index) => (
            <button
              key={index}
              className={`flex-shrink-0 flex flex-col items-center p-3 rounded-lg transition-colors ${
                isSameDay(date, selectedDate)
                  ? "bg-durian-600 text-white"
                  : "hover:bg-gray-100"
              }`}
              onClick={() => setSelectedDate(date)}
            >
              <span className="text-xs font-medium">
                {format(date, "EEE", { locale: id })}
              </span>
              <span className="text-lg font-bold">{format(date, "d")}</span>
            </button>
          ))}
        </div>
      </Card>

      {/* Search */}
      <div className="mb-6">
        <Input
          placeholder="Cari jadwal..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          icon={<Search size={18} />}
        />
      </div>

      {/* Schedule List */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800">
          {formatScheduleDate(selectedDate.toISOString())}
        </h3>

        {schedulesForSelectedDate.length > 0 ? (
          schedulesForSelectedDate.map((schedule) => (
            <Card
              key={schedule.id}
              className="hover:shadow-md transition-shadow"
            >
              <div className="flex items-start">
                <div className="mr-4 p-2 bg-durian-100 rounded-lg">
                  <Calendar className="h-5 w-5 text-durian-600" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-800">
                    {schedule.title}
                  </h4>
                  <p className="text-gray-600 text-sm mb-2">
                    {schedule.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <span className="inline-flex items-center rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-800">
                      {formatScheduleTime(schedule.start)} -{" "}
                      {formatScheduleTime(schedule.end)}
                    </span>
                    {schedule.status && (
                      <span
                        className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                          schedule.status === "completed"
                            ? "bg-green-100 text-green-800"
                            : schedule.status === "cancelled"
                            ? "bg-red-100 text-red-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {schedule.status.charAt(0).toUpperCase() +
                          schedule.status.slice(1)}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          ))
        ) : (
          <Card>
            <div className="text-center py-8">
              <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900">
                Tidak ada jadwal untuk hari ini
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Anda tidak memiliki tugas terjadwal untuk{" "}
                {format(selectedDate, "d MMMM yyyy", { locale: id })}.
              </p>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default EmployeeSchedule;
