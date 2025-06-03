import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { CheckCircle, Calendar, Clock } from "lucide-react";
import toast from "react-hot-toast";
import { Card } from "../../components/common/Card";
import { Button } from "../../components/common/Button";
import { api } from "../../utils/api";

// Enhanced attendance record interface
interface AttendanceRecord {
  id: string;
  tanggal: string;
  verifikasi: boolean;
}

export const EmployeeAttendance: React.FC = () => {
  const [hasCheckedIn, setHasCheckedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [checkingIn, setCheckingIn] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [attendanceHistory, setAttendanceHistory] = useState<
    AttendanceRecord[]
  >([]);
  const today = new Date();

  useEffect(() => {
    fetchAttendanceHistory();
  }, []);

  const fetchAttendanceHistory = async () => {
    try {
      const response = await api.getAttendanceHistory();
      setAttendanceHistory(response.data);
      setError(null);
      // Removed the check for today's attendance - user can always check in
    } catch (err: any) {
      console.error("Error fetching attendance:", err);

      let errorMessage = "Gagal mengambil riwayat kehadiran";

      // Handle specific error cases
      if (err.message) {
        errorMessage = err.message;
      } else if (err.status === 500) {
        errorMessage = "Terjadi kesalahan server. Silakan coba lagi nanti.";
      } else if (err.status === 401) {
        errorMessage = "Sesi Anda telah berakhir. Silakan login kembali.";
      }

      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleCheckIn = async () => {
    setCheckingIn(true);
    setError(null);

    try {
      const response = await api.checkIn();

      if (response.success) {
        toast.success("Berhasil melakukan check in!");
        setHasCheckedIn(true);
        await fetchAttendanceHistory(); // Refresh the history
      } else {
        const errorMessage =
          response.message || "Gagal melakukan check in. Silakan coba lagi.";
        setError(errorMessage);
        toast.error(errorMessage);
      }
    } catch (err: any) {
      console.error("Error checking in:", err);

      let errorMessage = "Gagal melakukan check in. Silakan coba lagi.";

      // Handle specific error cases
      if (err.message) {
        errorMessage = err.message;
      } else if (err.status === 400) {
        errorMessage =
          "Data check in tidak valid. Periksa kembali informasi Anda.";
      } else if (err.status === 409) {
        errorMessage = "Anda sudah melakukan check in hari ini.";
      } else if (err.status === 500) {
        errorMessage = "Terjadi kesalahan server. Silakan coba lagi nanti.";
      } else if (err.status === 401) {
        errorMessage = "Sesi Anda telah berakhir. Silakan login kembali.";
      }

      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setCheckingIn(false);
    }
  };

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "d MMMM yyyy", { locale: id });
  };

  const formatDateTime = (dateString: string) => {
    return format(new Date(dateString), "EEEE, d MMMM yyyy", { locale: id });
  };

  const formatTime = (dateString: string) => {
    return format(new Date(dateString), "HH:mm", { locale: id });
  };

  if (loading) {
    return (
      <div className="animate-fade-in">
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-durian-600"></div>
          <p className="mt-2 text-gray-600">Memuat data kehadiran...</p>
        </div>
      </div>
    );
  }

  if (error && attendanceHistory.length === 0) {
    return (
      <div className="animate-fade-in">
        <div className="text-center py-8">
          <div className="text-red-600 mb-4">
            <svg
              className="mx-auto h-12 w-12"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.082 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
          <p className="text-red-600 text-lg font-medium">{error}</p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => {
              setError(null);
              fetchAttendanceHistory();
            }}
          >
            Coba Lagi
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Kehadiran</h1>
        <p className="text-gray-600">
          Catat kehadiran harian Anda dan lihat riwayatnya.
        </p>
      </div>

      {/* Today's Attendance */}
      <Card className="mb-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <div className="flex items-center">
              <Calendar className="h-5 w-5 text-durian-600 mr-2" />
              <h2 className="text-lg font-semibold text-gray-800">
                Kehadiran Hari Ini
              </h2>
            </div>
            <p className="text-gray-600 mt-1">
              {formatDateTime(today.toISOString())}
            </p>
            <p className="text-gray-600">
              Waktu Sekarang: {formatTime(today.toISOString())}
            </p>
          </div>

          <div className="text-center">
            <Button
              variant="primary"
              icon={<Clock size={18} />}
              onClick={handleCheckIn}
              size="lg"
              disabled={checkingIn}
            >
              {checkingIn ? "Sedang Check In..." : "Check In Sekarang"}
            </Button>
          </div>
        </div>
      </Card>

      {/* Attendance History */}
      <Card title="Riwayat Kehadiran">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tanggal
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Waktu Check-in
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {attendanceHistory.length > 0 ? (
                attendanceHistory.map((record) => (
                  <tr key={record.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {formatDate(record.tanggal)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {formatTime(record.tanggal)}
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
                        {record.verifikasi ? "Terverifikasi" : "Menunggu"}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={3}
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    <div className="flex flex-col items-center py-4">
                      <svg
                        className="h-12 w-12 text-gray-300 mb-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                        />
                      </svg>
                      <p className="text-gray-500">Belum ada data kehadiran</p>
                      <p className="text-gray-400 text-sm mt-1">
                        Mulai dengan melakukan check in pertama Anda
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
