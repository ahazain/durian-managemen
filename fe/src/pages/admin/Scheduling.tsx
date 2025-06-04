import React, { useState, useEffect } from "react";
import {
  Calendar,
  Plus,
  Search,
  Edit,
  Trash,
  AlertTriangle,
  X,
} from "lucide-react";
import { format } from "date-fns";
import toast from "react-hot-toast";
import { Card } from "../../components/common/Card";
import { Button } from "../../components/common/Button";
import { Input } from "../../components/common/Input";
import { MultiSelect } from "../../components/common/MultiSelect";
import { Schedule } from "../../types";
import { api } from "../../utils/api";

// Komponen Modal Konfirmasi
const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Hapus",
  cancelText = "Batal",
  type = "danger",
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  type?: "danger" | "warning" | "info";
}) => {
  if (!isOpen) return null;

  const getTypeStyles = () => {
    switch (type) {
      case "danger":
        return {
          icon: <Trash className="h-6 w-6 text-red-600" />,
          iconBg: "bg-red-100",
          confirmBtn: "bg-red-600 hover:bg-red-700 text-white",
        };
      case "warning":
        return {
          icon: <AlertTriangle className="h-6 w-6 text-yellow-600" />,
          iconBg: "bg-yellow-100",
          confirmBtn: "bg-yellow-600 hover:bg-yellow-700 text-white",
        };
      default:
        return {
          icon: <AlertTriangle className="h-6 w-6 text-blue-600" />,
          iconBg: "bg-blue-100",
          confirmBtn: "bg-blue-600 hover:bg-blue-700 text-white",
        };
    }
  };

  const styles = getTypeStyles();

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          onClick={onClose}
        ></div>

        <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg animate-fadeIn">
          <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div
                className={`mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full ${styles.iconBg} sm:mx-0 sm:h-10 sm:w-10`}
              >
                {styles.icon}
              </div>
              <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                <h3 className="text-base font-semibold leading-6 text-gray-900">
                  {title}
                </h3>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">{message}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
            <button
              type="button"
              className={`inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold shadow-sm sm:ml-3 sm:w-auto ${styles.confirmBtn}`}
              onClick={onConfirm}
            >
              {confirmText}
            </button>
            <button
              type="button"
              className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
              onClick={onClose}
            >
              {cancelText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const AdminScheduling: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [loading, setLoading] = useState(true);
  const [employees, setEmployees] = useState<{ id: string; nama: string }[]>(
    []
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingSchedule, setEditingSchedule] = useState<Schedule | null>(null);
  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
  }>({
    isOpen: false,
    title: "",
    message: "",
    onConfirm: () => {},
  });

  useEffect(() => {
    fetchSchedules();
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await api.getEmployees();
      setEmployees(response.data || []);
    } catch (err) {
      console.error(err);
      toast.error("Gagal memuat data pegawai");
    }
  };

  const fetchSchedules = async () => {
    try {
      setLoading(true);
      const response = await api.getSchedules();
      setSchedules(response.data || []);
    } catch (err) {
      console.error(err);
      toast.error("Gagal memuat data jadwal");
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

      toast.success("Jadwal berhasil dibuat!");
    } catch (err) {
      console.error("Failed to create schedule:", err);
      toast.error("Gagal membuat jadwal. Silakan coba lagi.");
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

      toast.success("Jadwal berhasil diperbarui!");
    } catch (err) {
      console.error("Failed to update schedule:", err);
      toast.error("Gagal memperbarui jadwal. Silakan coba lagi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const showDeleteConfirmation = (schedule: Schedule) => {
    setConfirmModal({
      isOpen: true,
      title: "Hapus Jadwal",
      message: `Apakah Anda yakin ingin menghapus jadwal "${schedule.title}"? Tindakan ini tidak dapat dibatalkan.`,
      onConfirm: () => {
        handleDeleteSchedule(schedule.id);
        setConfirmModal((prev) => ({ ...prev, isOpen: false }));
      },
    });
  };

  const handleDeleteSchedule = async (id: string) => {
    try {
      setIsSubmitting(true);

      await api.deleteSchedule(id);
      await fetchSchedules();

      toast.success("Jadwal berhasil dihapus!");
    } catch (err) {
      console.error("Failed to delete schedule:", err);
      toast.error("Gagal menghapus jadwal. Silakan coba lagi.");
    } finally {
      setIsSubmitting(false);
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
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Edit Jadwal</h2>
          <button
            onClick={() => setEditingSchedule(null)}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={20} className="text-gray-500" />
          </button>
        </div>
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
              Batal
            </Button>
            <Button variant="primary" type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Memperbarui..." : "Perbarui Jadwal"}
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
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Tambah Jadwal Baru</h2>
          <button
            onClick={() => setShowAddForm(false)}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={20} className="text-gray-500" />
          </button>
        </div>
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
              Batal
            </Button>
            <Button variant="primary" type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Membuat..." : "Buat Jadwal"}
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
                    onClick={() => showDeleteConfirmation(schedule)}
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
                Tidak ada jadwal ditemukan
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                {searchTerm
                  ? "Coba sesuaikan kriteria pencarian Anda."
                  : "Buat jadwal pertama Anda untuk memulai."}
              </p>
              <div className="mt-6">
                <Button
                  variant="primary"
                  onClick={() => setShowAddForm(true)}
                  disabled={isSubmitting}
                >
                  Buat Jadwal Baru
                </Button>
              </div>
            </div>
          </Card>
        )}
      </div>

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={confirmModal.isOpen}
        onClose={() => setConfirmModal((prev) => ({ ...prev, isOpen: false }))}
        onConfirm={confirmModal.onConfirm}
        title={confirmModal.title}
        message={confirmModal.message}
        confirmText="Hapus"
        cancelText="Batal"
        type="danger"
      />
    </div>
  );
};
