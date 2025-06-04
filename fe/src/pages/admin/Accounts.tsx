import React, { useState, useEffect } from "react";
import { Edit2, Search, UserPlus, Users, Mail, Lock } from "lucide-react";
import { Card } from "../../components/common/Card";
import { Button } from "../../components/common/Button";
import { Input } from "../../components/common/Input";
import { Modal } from "../../components/common/Modal";
import { Profile } from "../../types";
import { api } from "../../utils/api";

export const AdminAccounts: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentTab, setCurrentTab] = useState<"all" | "ADMIN" | "KARYAWAN">(
    "all"
  );
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState({ total_admin: 0, total_karyawan: 0 });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);
  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "KARYAWAN",
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const fetchProfiles = async (role?: string) => {
    try {
      setLoading(true);
      const response = await api.getAllProfiles(role);
      setProfiles(response.data.users || []);
      setStats({
        total_admin: response.data.total_admin,
        total_karyawan: response.data.total_karyawan,
      });
      setError(null);
    } catch (err) {
      setError("Failed to fetch accounts");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (currentTab === "all") {
      fetchProfiles();
    } else {
      fetchProfiles(currentTab);
    }
  }, [currentTab]);

  const filteredProfiles = profiles.filter((profile) =>
    profile.nama.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const validateForm = () => {
    const errors: Record<string, string> = {};

    if (!formData.nama) errors.nama = "Name is required";
    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Invalid email format";
    }

    if (!isEditMode) {
      if (!formData.password) {
        errors.password = "Password is required";
      } else if (formData.password.length < 6) {
        errors.password = "Password must be at least 6 characters";
      }
      if (formData.password !== formData.confirmPassword) {
        errors.confirmPassword = "Passwords do not match";
      }
    }

    return errors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    try {
      if (isEditMode && selectedProfile) {
        // Update profile endpoint will be implemented later
        console.log("Update profile:", { id: selectedProfile.id, ...formData });
      } else {
        const { confirmPassword, ...registerData } = formData;
        await api.register(registerData);
        await fetchProfiles(currentTab === "all" ? undefined : currentTab);
      }
      handleCloseModal();
    } catch (err: any) {
      setFormErrors({ form: err.message || "Operation failed" });
    }
  };

  const handleOpenModal = (profile?: Profile) => {
    if (profile) {
      setIsEditMode(true);
      setSelectedProfile(profile);
      setFormData({
        nama: profile.nama,
        email: profile.email,
        password: "",
        confirmPassword: "",
        role: profile.role,
      });
    } else {
      setIsEditMode(false);
      setSelectedProfile(null);
      setFormData({
        nama: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "KARYAWAN",
      });
    }
    setFormErrors({});
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsEditMode(false);
    setSelectedProfile(null);
    setFormData({
      nama: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "KARYAWAN",
    });
    setFormErrors({});
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
        <h1 className="text-2xl font-bold text-gray-800">managemen Akun</h1>
        <p className="text-gray-600">Kelola akun karyawan dan admin</p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md text-red-700">
          {error}
        </div>
      )}

      <Card>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <div className="mb-4 sm:mb-0 w-full sm:w-auto">
            <div className="flex space-x-2">
              <Button
                variant={currentTab === "all" ? "primary" : "outline"}
                onClick={() => setCurrentTab("all")}
              >
                All
              </Button>
              <Button
                variant={currentTab === "ADMIN" ? "primary" : "outline"}
                onClick={() => setCurrentTab("ADMIN")}
              >
                Admins ({stats.total_admin})
              </Button>
              <Button
                variant={currentTab === "KARYAWAN" ? "primary" : "outline"}
                onClick={() => setCurrentTab("KARYAWAN")}
              >
                Karyawan ({stats.total_karyawan})
              </Button>
            </div>
          </div>

          <div className="w-full sm:w-auto flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
            <div className="relative">
              <Input
                placeholder="Cari Akun..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                icon={<Search size={18} />}
                className="w-full sm:w-64"
              />
            </div>

            <Button
              variant="primary"
              icon={<UserPlus size={18} />}
              onClick={() => handleOpenModal()}
            >
              Tambah Akun
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nama
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredProfiles.length > 0 ? (
                filteredProfiles.map((profile) => (
                  <tr key={profile.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-durian-100 flex items-center justify-center">
                          <Users className="h-5 w-5 text-durian-600" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {profile.nama}
                          </div>
                          <div className="text-sm text-gray-500">
                            {profile.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          profile.role === "ADMIN"
                            ? "bg-purple-100 text-purple-800"
                            : "bg-durian-100 text-durian-800"
                        }`}
                      >
                        {profile.role === "KARYAWAN"
                          ? "Employee"
                          : profile.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => handleOpenModal(profile)}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        <Edit2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={3}
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    No accounts found matching your criteria
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={isEditMode ? "Edit Account" : "Add New Account"}
      >
        <form onSubmit={handleSubmit}>
          {formErrors.form && (
            <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md border border-red-200">
              {formErrors.form}
            </div>
          )}

          <Input
            label="Full Name"
            name="nama"
            value={formData.nama}
            onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
            error={formErrors.nama}
            icon={<Users size={18} />}
          />

          <Input
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            error={formErrors.email}
            icon={<Mail size={18} />}
          />

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Role
            </label>
            <select
              value={formData.role}
              onChange={(e) =>
                setFormData({ ...formData, role: e.target.value })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            >
              <option value="KARYAWAN">Employee</option>
              <option value="ADMIN">Admin</option>
            </select>
          </div>

          {!isEditMode && (
            <>
              <Input
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                error={formErrors.password}
                icon={<Lock size={18} />}
              />

              <Input
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData({ ...formData, confirmPassword: e.target.value })
                }
                error={formErrors.confirmPassword}
                icon={<Lock size={18} />}
              />
            </>
          )}

          <div className="mt-6 flex justify-end space-x-3">
            <Button variant="outline" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              {isEditMode ? "Update" : "Create"}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
