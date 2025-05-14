import React, { useState, useEffect } from "react";
import { CheckCircle, Search } from "lucide-react";
import { format } from "date-fns";
import { Card } from "../../components/common/Card";
import { Button } from "../../components/common/Button";
import { Input } from "../../components/common/Input";
import { Attendance } from "../../types";
import { api } from "../../utils/api";

export const AdminAttendance: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState<"all" | "verified" | "unverified">(
    "all"
  );
  const [attendances, setAttendances] = useState<Attendance[]>([]);
  const [stats, setStats] = useState({ verified: 0, pending: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAttendances();
  }, [filter]); // Re-fetch when filter changes

  const fetchAttendances = async () => {
    setLoading(true);
    try {
      let filterParam: "verified" | "unverified" | undefined;

      if (filter === "verified") filterParam = "verified";
      if (filter === "unverified") filterParam = "unverified";

      const response = await api.getAttendances(filterParam);

      // Handle the new response structure
      if (response.data && response.data.data) {
        setAttendances(response.data.data);

        // Set statistics if available
        if (response.data.count) {
          setStats({
            verified: response.data.count.verifikasi || 0,
            pending: response.data.count.pending || 0,
          });
        }
      } else {
        // Fallback if response structure is different
        setAttendances(response.data || []);
      }

      setError(null);
    } catch (err) {
      setError("Failed to fetch attendance data");
      console.error("Error fetching attendances:", err);
    } finally {
      setLoading(false);
    }
  };

  // Filter attendance records by search term only
  // (Status filtering is now handled by the API)
  const filteredAttendance = attendances.filter((record) => {
    return (
      record.user.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.tanggal.includes(searchTerm)
    );
  });

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "MMMM d, yyyy HH:mm");
  };

  const handleVerify = async (id: string) => {
    try {
      await api.verifyAttendance(id);
      await fetchAttendances(); // Refresh the list
    } catch (err) {
      console.error("Error verifying attendance:", err);
    }
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
        <h1 className="text-2xl font-bold text-gray-800">
          Attendance Verification
        </h1>
        <p className="text-gray-600">Verify employee attendance records.</p>
      </div>

      <div className="flex flex-col md:flex-row md:justify-between md:items-center space-y-4 md:space-y-0 mb-6">
        <div className="flex space-x-2">
          <Button
            variant={filter === "all" ? "primary" : "outline"}
            onClick={() => setFilter("all")}
          >
            All ({stats.verified + stats.pending})
          </Button>
          <Button
            variant={filter === "verified" ? "primary" : "outline"}
            onClick={() => setFilter("verified")}
          >
            Verified ({stats.verified})
          </Button>
          <Button
            variant={filter === "unverified" ? "primary" : "outline"}
            onClick={() => setFilter("unverified")}
          >
            Unverified ({stats.pending})
          </Button>
        </div>

        <div className="w-full md:w-64">
          <Input
            placeholder="Search by name or date..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            icon={<Search size={18} />}
          />
        </div>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Employee
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Verification
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAttendance.length > 0 ? (
                filteredAttendance.map((attendance) => (
                  <tr
                    key={attendance.id}
                    className="hover:bg-gray-50 transition-colors duration-150"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">
                        {attendance.user.nama}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {formatDate(attendance.tanggal)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {attendance.status}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          attendance.verifikasi
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {attendance.verifikasi ? "Verified" : "Pending"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {!attendance.verifikasi && (
                        <Button
                          variant="success"
                          size="sm"
                          icon={<CheckCircle size={16} />}
                          onClick={() => handleVerify(attendance.id)}
                          className="transition-all duration-150 hover:scale-105"
                        >
                          Verify
                        </Button>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    No attendance records found matching your criteria
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
