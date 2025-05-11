import React, { useState, useEffect } from "react";
import { Calendar, Search, ChevronLeft, ChevronRight } from "lucide-react";
import { format, addDays, isSameDay } from "date-fns";
import { Card } from "../../components/common/Card";
import { Input } from "../../components/common/Input";
import { Schedule } from "../../types";
import { api } from "../../utils/api";

export const EmployeeSchedule: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const today = new Date();

  useEffect(() => {
    fetchSchedules();
  }, []);

  const fetchSchedules = async () => {
    try {
      setLoading(true);
      const response = await api.getSchedules();
      setSchedules(response.data || []);
      setError(null);
    } catch (err) {
      setError("Failed to fetch schedules");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Helper functions
  const formatScheduleDate = (dateString: string) => {
    return format(new Date(dateString), "EEEE, MMMM d, yyyy");
  };

  const formatScheduleTime = (dateString: string) => {
    return format(new Date(dateString), "h:mm a");
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

  // Generate next 7 days for the date picker
  const next7Days = Array.from({ length: 7 }, (_, i) => addDays(today, i));

  // Navigate between weeks
  const navigatePreviousWeek = () => {
    setSelectedDate((prevDate) => addDays(prevDate, -7));
  };

  const navigateNextWeek = () => {
    setSelectedDate((prevDate) => addDays(prevDate, 7));
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
        <h1 className="text-2xl font-bold text-gray-800">My Schedule</h1>
        <p className="text-gray-600">View your upcoming work schedule.</p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md text-red-700">
          {error}
        </div>
      )}

      {/* Date Navigation */}
      <Card className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={navigatePreviousWeek}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <ChevronLeft size={20} />
          </button>
          <h3 className="text-lg font-semibold">
            {format(selectedDate, "MMMM yyyy")}
          </h3>
          <button
            onClick={navigateNextWeek}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        <div className="flex overflow-x-auto space-x-2 pb-2">
          {next7Days.map((date, index) => (
            <button
              key={index}
              className={`flex-shrink-0 flex flex-col items-center p-3 rounded-lg transition-colors ${
                isSameDay(date, selectedDate)
                  ? "bg-durian-600 text-white"
                  : "hover:bg-gray-100"
              }`}
              onClick={() => setSelectedDate(date)}
            >
              <span className="text-xs font-medium">{format(date, "EEE")}</span>
              <span className="text-lg font-bold">{format(date, "d")}</span>
            </button>
          ))}
        </div>
      </Card>

      {/* Search */}
      <div className="mb-6">
        <Input
          placeholder="Search schedules..."
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
                No schedules for this day
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                You don't have any scheduled tasks for{" "}
                {format(selectedDate, "MMMM d, yyyy")}.
              </p>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};
