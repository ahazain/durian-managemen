import React, { useState, useEffect } from "react";
import { Edit2, Search, UserPlus, Users } from "lucide-react";
import { Card } from "../../components/common/Card";
import { Button } from "../../components/common/Button";
import { Input } from "../../components/common/Input";
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

  // Filter profiles based on search term
  const filteredProfiles = profiles.filter((profile) =>
    profile.nama.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEditProfile = async (id: string, data: Partial<Profile>) => {
    try {
      await api.updateProfile({ id, ...data });
      await fetchProfiles(currentTab === "all" ? undefined : currentTab);
    } catch (err) {
      console.error("Failed to update profile:", err);
    }
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
        <h1 className="text-2xl font-bold text-gray-800">Account Management</h1>
        <p className="text-gray-600">
          Manage employee and admin accounts. Total Admins: {stats.total_admin},
          Total Employees: {stats.total_karyawan}
        </p>
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
                Employees ({stats.total_karyawan})
              </Button>
            </div>
          </div>

          <div className="w-full sm:w-auto flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
            <div className="relative">
              <Input
                placeholder="Search accounts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                icon={<Search size={18} />}
                className="w-full sm:w-64"
              />
            </div>

            <Button
              variant="primary"
              icon={<UserPlus size={18} />}
              onClick={() => console.log("Add new employee")}
            >
              Add New
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
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
                        {profile.role === "KARYWAN" ? "Employee" : profile.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEditProfile(profile.id, profile)}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          <Edit2 size={18} />
                        </button>
                      </div>
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
    </div>
  );
};
