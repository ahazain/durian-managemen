import React, { useState, useEffect } from "react";
import { Calendar, Plus, Search, Edit, Trash } from "lucide-react";
import { format } from "date-fns";
import { Card } from "../../components/common/Card";
import { Button } from "../../components/common/Button";
import { Input } from "../../components/common/Input";
import { MultiSelect } from "../../components/common/MultiSelect";
import { Schedule } from "../../types";
import { api } from "../../utils/api";

export const AdminScheduling: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [employees, setEmployees] = useState<{ id: string; nama: string }[]>(
    []
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingSchedule, setEditingSchedule] = useState<Schedule | null>(null);

  useEffect(() => {
    fetchSchedules();
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await api.getEmployees();
      setEmployees(response.data || []);
      setError(null);
    } catch (err) {
      setError("Failed to fetch employees");
      console.error(err);
    }
  };

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

  // Filter schedules based on search term
  const filteredSchedules = schedules.filter(
    (schedule) =>
      schedule.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      schedule.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      schedule.employeeNames?.some((name) =>
        name.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  const formatScheduleDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, "dd MMM yyyy");
  };

  const formatScheduleTime = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, "HH:mm");
  };

  const handleCreateSchedule = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData(e.currentTarget);
      const employeeIds =
        formData.get("employeeIds")?.toString().split(",") || [];

      const scheduleData = {
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        start: formData.get("start") as string,
        end: formData.get("end") as string,
        employeeIds,
      };

      await api.createSchedule(scheduleData);
      await fetchSchedules();
      setShowAddForm(false);
      setError(null);
    } catch (err) {
      console.error("Failed to create schedule:", err);
      setError("Failed to create schedule. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateSchedule = async (id: string, data: Partial<Schedule>) => {
    try {
      setIsSubmitting(true);
      await api.updateSchedule(id, data);
      await fetchSchedules();
      setEditingSchedule(null);
      setError(null);
    } catch (err) {
      console.error("Failed to update schedule:", err);
      setError("Failed to update schedule. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteSchedule = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this schedule?")) {
      try {
        setIsSubmitting(true);
        await api.deleteSchedule(id);
        await fetchSchedules();
        setError(null);
      } catch (err) {
        console.error("Failed to delete schedule:", err);
        setError("Failed to delete schedule. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const EditScheduleForm = ({ schedule }: { schedule: Schedule }) => {
    const [selectedEmployees, setSelectedEmployees] = useState<string[]>(
      schedule.employeeIds || []
    );

    const formatDateForInput = (dateString: string) => {
      const date = new Date(dateString);
      return format(date, "yyyy-MM-dd'T'HH:mm");
    };

    return (
      <Card className="mb-6 border-2 border-blue-200 animate-fadeIn">
        <h2 className="text-lg font-semibold mb-4">Edit Jadwal</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            const employeeIds =
              formData.get("employeeIds")?.toString().split(",") || [];

            handleUpdateSchedule(schedule.id, {
              title: formData.get("title") as string,
              description: formData.get("description") as string,
              start: formData.get("start") as string,
              end: formData.get("end") as string,
              employeeIds,
            });
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Judul"
              name="title"
              placeholder="Schedule title"
              defaultValue={schedule.title}
              required
            />

            <div className="md:col-span-2">
              <Input
                label="Deskripsi"
                name="description"
                placeholder="Schedule description"
                defaultValue={schedule.description}
              />
            </div>

            <Input
              label="Tanggal & Waktu Mulai"
              name="start"
              type="datetime-local"
              defaultValue={formatDateForInput(schedule.start)}
              required
            />

            <Input
              label="Tanggal & Waktu Berakhir"
              name="end"
              type="datetime-local"
              defaultValue={formatDateForInput(schedule.end)}
              required
            />

            <div className="md:col-span-2">
              <MultiSelect
                label="Pilih Pegawai"
                name="employeeIds"
                options={employees.map((emp) => ({
                  id: emp.id,
                  label: emp.nama,
                }))}
                value={selectedEmployees}
                onChange={setSelectedEmployees}
                required
              />
            </div>
          </div>

          <div className="flex justify-end space-x-2 mt-6">
            <Button
              variant="outline"
              onClick={() => setEditingSchedule(null)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button variant="primary" type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Updating..." : "Update Jadwal"}
            </Button>
          </div>
        </form>
      </Card>
    );
  };

  const AddScheduleForm = () => {
    const [selectedEmployees, setSelectedEmployees] = useState<string[]>([]);

    return (
      <Card className="mb-6">
        <h2 className="text-lg font-semibold mb-4">Tambah Jadwal Baru</h2>
        <form onSubmit={handleCreateSchedule}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Judul"
              name="title"
              placeholder="Judul Jadwal"
              required
            />

            <div className="md:col-span-2">
              <Input
                label="Deskripsi"
                name="description"
                placeholder="Deskripsi jadwal"
              />
            </div>

            <Input
              label="Tanggal & Waktu Mulai"
              name="start"
              type="datetime-local"
              required
            />

            <Input
              label="Tanggal & Waktu Berakhir"
              name="end"
              type="datetime-local"
              required
            />

            <div className="md:col-span-2">
              <MultiSelect
                label="Pilih Pegawai"
                name="employeeIds"
                options={employees.map((emp) => ({
                  id: emp.id,
                  label: emp.nama,
                }))}
                value={selectedEmployees}
                onChange={setSelectedEmployees}
                required
              />
            </div>
          </div>

          <div className="flex justify-end space-x-2 mt-6">
            <Button
              variant="outline"
              onClick={() => setShowAddForm(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button variant="primary" type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Creating..." : "Buat Jadwal"}
            </Button>
          </div>
        </form>
      </Card>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Jadwal</h1>
        <p className="text-gray-600">
          Membuat dan mengelola jadwal kerja untuk karyawan.
        </p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md text-red-700">
          {error}
        </div>
      )}

      {editingSchedule ? (
        <EditScheduleForm schedule={editingSchedule} />
      ) : showAddForm ? (
        <AddScheduleForm />
      ) : (
        <div className="flex justify-end mb-6">
          <Button
            variant="primary"
            onClick={() => setShowAddForm(true)}
            icon={<Plus size={16} />}
          >
            Tambah Jadwal Baru
          </Button>
        </div>
      )}

      <div className="mb-6">
        <Input
          placeholder="Cari jadwal..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          icon={<Search size={18} />}
        />
      </div>

      <div className="space-y-4">
        {filteredSchedules.length > 0 ? (
          filteredSchedules.map((schedule) => (
            <Card
              key={schedule.id}
              className="hover:shadow-md transition-shadow duration-300"
            >
              <div className="flex flex-col md:flex-row justify-between">
                <div className="flex-1">
                  <div className="flex items-start">
                    <div className="mr-4 p-2 bg-blue-50 rounded-md">
                      <Calendar className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">
                        {schedule.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-2">
                        {schedule.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700">
                          {formatScheduleDate(schedule.start)}
                        </span>
                        <span className="inline-flex items-center rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-800">
                          {formatScheduleTime(schedule.start)} -{" "}
                          {formatScheduleTime(schedule.end)}
                        </span>
                        {schedule.employeeNames?.map((name, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700"
                          >
                            {name}
                          </span>
                        ))}
                        {schedule.status && (
                          <span
                            className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                              schedule.status === "completed"
                                ? "bg-green-50 text-green-700"
                                : schedule.status === "pending"
                                ? "bg-yellow-50 text-yellow-700"
                                : "bg-gray-100 text-gray-700"
                            }`}
                          >
                            {schedule.status}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2 mt-4 md:mt-0">
                  <Button
                    variant="outline"
                    size="sm"
                    icon={<Edit size={16} />}
                    onClick={() => setEditingSchedule(schedule)}
                    disabled={isSubmitting}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    icon={<Trash size={16} />}
                    onClick={() => handleDeleteSchedule(schedule.id)}
                    disabled={isSubmitting}
                  >
                    Hapus
                  </Button>
                </div>
              </div>
            </Card>
          ))
        ) : (
          <Card>
            <div className="text-center py-8">
              <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900">
                No schedules found
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                {searchTerm
                  ? "Try adjusting your search criteria."
                  : "Create your first schedule to get started."}
              </p>
              <div className="mt-6">
                <Button
                  variant="primary"
                  onClick={() => setShowAddForm(true)}
                  disabled={isSubmitting}
                >
                  Create New Schedule
                </Button>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};
