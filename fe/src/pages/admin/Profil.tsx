import React, { useState } from "react";
import { User, Mail, Phone, Lock, Edit2, Save } from "lucide-react";
import toast from "react-hot-toast";
import { Card } from "../../components/common/Card";
import { Button } from "../../components/common/Button";
import { Input } from "../../components/common/Input";
import { useAuth } from "../../contexts/AuthContext";
import { api } from "../../utils/api";

export const Profil: React.FC = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Personal Info Form State
  const [formData, setFormData] = useState({
    nama: user?.nama || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
  });

  // Password Change Form State
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    clearError(name);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
    clearError(name);
  };

  const clearError = (fieldName: string) => {
    if (errors[fieldName]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[fieldName];
        return newErrors;
      });
    }
  };

  const validatePersonalInfo = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.nama.trim()) {
      newErrors.nama = "Full name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email format is invalid";
    }

    if (
      formData.phoneNumber &&
      formData.phoneNumber.trim() &&
      !/^\+?[0-9\s-]{10,15}$/.test(formData.phoneNumber.trim())
    ) {
      newErrors.phoneNumber = "Phone number format is invalid";
    }

    return newErrors;
  };

  const validatePasswordChange = () => {
    const newErrors: Record<string, string> = {};

    if (!passwordData.currentPassword) {
      newErrors.currentPassword = "Current password is required";
    }

    if (!passwordData.newPassword) {
      newErrors.newPassword = "New password is required";
    } else if (passwordData.newPassword.length < 6) {
      newErrors.newPassword = "Password must be at least 6 characters";
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    return newErrors;
  };

  const handleSubmitPersonalInfo = async (e: React.FormEvent) => {
    e.preventDefault();

    const formErrors = validatePersonalInfo();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      // Show toast for validation errors
      const firstError = Object.values(formErrors)[0];
      toast.error(firstError);
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      // Prepare data - only send phoneNumber if it's not empty
      const updateData: { nama: string; email: string; phoneNumber?: string } =
        {
          nama: formData.nama.trim(),
          email: formData.email.trim(),
          phoneNumber: formData.phoneNumber.trim(),
        };

      // Only include phoneNumber if it has a value
      if (formData.phoneNumber && formData.phoneNumber.trim()) {
        updateData.phoneNumber = formData.phoneNumber.trim();
      }

      console.log("Submitting profile update:", updateData);

      const response = await api.ubahProfil(updateData);

      if (response.success) {
        toast.success("Profile updated successfully!");
        setIsEditing(false);

        // Optional: Update the user context with new data
        // if (updateUser) {
        //   updateUser({ ...user, ...updateData });
        // }
      } else {
        const errorMessage =
          response.message || "Failed to update profile. Please try again.";
        toast.error(errorMessage);
        setErrors({ general: errorMessage });
      }
    } catch (error: any) {
      console.error("Profile update error:", error);

      let errorMessage =
        "An error occurred while updating profile. Please try again.";

      if (error.message) {
        errorMessage = error.message;
      }

      // Special attention for phone number errors
      if (error.message && error.message.toLowerCase().includes("phone")) {
        errorMessage =
          "Invalid phone number format. Please check and try again.";
        setErrors({ phoneNumber: errorMessage });
      } else {
        setErrors({ general: errorMessage });
      }

      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitPasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();

    const formErrors = validatePasswordChange();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      // Show toast for validation errors
      const firstError = Object.values(formErrors)[0];
      toast.error(firstError);
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      // Prepare payload dengan format yang benar sesuai API
      const passwordPayload = {
        oldPassword: passwordData.currentPassword.trim(),
        newPassword: passwordData.newPassword.trim(),
      };

      // Log data yang akan dikirim untuk debugging
      console.log("Password update payload:", passwordPayload);
      console.log("Payload length check:", {
        oldPasswordLength: passwordPayload.oldPassword.length,
        newPasswordLength: passwordPayload.newPassword.length,
        oldPasswordEmpty: passwordPayload.oldPassword === "",
        newPasswordEmpty: passwordPayload.newPassword === "",
      });

      const response = await api.ubahPassword(passwordPayload);

      if (response.success) {
        toast.success("Password updated successfully!");
        setShowPasswordForm(false);
        setPasswordData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      } else {
        const errorMessage =
          response.message ||
          "Failed to update password. Please check your current password.";
        toast.error(errorMessage);
        setErrors({ currentPassword: errorMessage });
      }
    } catch (error: any) {
      console.error("Password update error:", error);
      console.error("Full error object:", JSON.stringify(error, null, 2));

      let errorMessage =
        "An error occurred while updating password. Please try again.";

      // Handle specific error cases
      if (error.status === 400) {
        // Check if there's a specific error message from server
        if (error.response && error.response.message) {
          errorMessage = error.response.message;
        } else if (error.message.includes("password")) {
          errorMessage =
            "Current password is incorrect or new password doesn't meet requirements.";
        } else {
          errorMessage = "Invalid request. Please check your password input.";
        }
      } else if (error.message) {
        errorMessage = error.message;
      }

      toast.error(errorMessage);
      setErrors({ currentPassword: errorMessage });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setErrors({});
    // Reset form data to original values
    setFormData({
      nama: user?.nama || "",
      email: user?.email || "",
      phoneNumber: user?.phoneNumber || "",
    });
  };

  const handleCancelPasswordChange = () => {
    setShowPasswordForm(false);
    setErrors({});
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  if (!user) return null;

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Akun Saya</h1>
        <p className="text-gray-600">Lihat dan perbarui informasi akun Anda.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <Card className="lg:col-span-1">
          <div className="flex flex-col items-center text-center">
            <div className="w-32 h-32 rounded-full overflow-hidden mb-4 border-4 border-durian-100">
              <img
                src="https://static.vecteezy.com/system/resources/previews/021/548/095/original/default-profile-picture-avatar-user-avatar-icon-person-icon-head-icon-profile-picture-icons-default-anonymous-user-male-and-female-businessman-photo-placeholder-social-network-avatar-portrait-free-vector.jpg"
                alt={user.nama}
                className="w-full h-full object-cover"
              />
            </div>
            <h2 className="text-xl font-bold text-gray-800">{user.nama}</h2>
            <p className="text-sm text-durian-600 mt-1 capitalize">
              {user.role}
            </p>

            <div className="mt-6 w-full">
              <div className="flex items-center justify-between py-3 border-b border-gray-200">
                <span className="text-gray-500 flex items-center">
                  <Mail size={16} className="mr-2" />
                  Email
                </span>
                <span className="text-gray-800 text-sm">{user.email}</span>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-gray-200">
                <span className="text-gray-500 flex items-center">
                  <Phone size={16} className="mr-2" />
                  Phone
                </span>
                <span className="text-gray-800 text-sm">
                  {user.phoneNumber || "-"}
                </span>
              </div>
              <div className="flex items-center justify-between py-3">
                <span className="text-gray-500 flex items-center">
                  <User size={16} className="mr-2" />
                  Admin Sejak
                </span>
                <span className="text-gray-800 text-sm">
                  {new Date(user.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        </Card>

        {/* Account Settings */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Information */}
          <Card title="Informasi Pribadi">
            <form onSubmit={handleSubmitPersonalInfo}>
              <div className="space-y-4">
                <Input
                  label="Nama Lengkap"
                  name="nama"
                  value={formData.nama}
                  onChange={handleChange}
                  icon={<User size={18} />}
                  disabled={!isEditing || isLoading}
                  error={errors.nama}
                  required
                />

                <Input
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  icon={<Mail size={18} />}
                  disabled={!isEditing || isLoading}
                  error={errors.email}
                  required
                />

                <Input
                  label="Nomor Telepon (Opsional)"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  icon={<Phone size={18} />}
                  disabled={!isEditing || isLoading}
                  error={errors.phoneNumber}
                  placeholder="Contoh: +62812345678"
                />
              </div>
              <div className="mt-6 flex justify-end">
                {isEditing ? (
                  <>
                    <Button
                      variant="outline"
                      className="mr-2"
                      onClick={handleCancelEdit}
                      disabled={isLoading}
                      type="button"
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="primary"
                      type="submit"
                      icon={<Save size={18} />}
                      disabled={isLoading}
                    >
                      {isLoading ? "Saving..." : "Save Changes"}
                    </Button>
                  </>
                ) : (
                  <Button
                    variant="primary"
                    icon={<Edit2 size={18} />}
                    onClick={() => setIsEditing(true)}
                    type="button"
                  >
                    Edit Profile
                  </Button>
                )}
              </div>
            </form>
          </Card>

          {/* Password Change */}
          <Card title="Password">
            {showPasswordForm ? (
              <form onSubmit={handleSubmitPasswordChange}>
                <div className="space-y-4">
                  <Input
                    label="Password Lama"
                    name="currentPassword"
                    type="password"
                    value={passwordData.currentPassword}
                    onChange={handlePasswordChange}
                    icon={<Lock size={18} />}
                    error={errors.currentPassword}
                    disabled={isLoading}
                    required
                  />

                  <Input
                    label="Password Baru"
                    name="newPassword"
                    type="password"
                    value={passwordData.newPassword}
                    onChange={handlePasswordChange}
                    icon={<Lock size={18} />}
                    error={errors.newPassword}
                    disabled={isLoading}
                    required
                  />

                  <Input
                    label="Konfirmasi Password Baru"
                    name="confirmPassword"
                    type="password"
                    value={passwordData.confirmPassword}
                    onChange={handlePasswordChange}
                    icon={<Lock size={18} />}
                    error={errors.confirmPassword}
                    disabled={isLoading}
                    required
                  />
                </div>

                <div className="mt-6 flex justify-end">
                  <Button
                    variant="outline"
                    className="mr-2"
                    onClick={handleCancelPasswordChange}
                    disabled={isLoading}
                    type="button"
                  >
                    Cancel
                  </Button>
                  <Button variant="primary" type="submit" disabled={isLoading}>
                    {isLoading ? "Updating..." : "Update Password"}
                  </Button>
                </div>
              </form>
            ) : (
              <div>
                <p className="text-gray-600 mb-4">
                  Ubah kata sandi Anda untuk menjaga keamanan akun Anda.
                </p>
                <Button
                  variant="outline"
                  icon={<Lock size={18} />}
                  onClick={() => setShowPasswordForm(true)}
                  type="button"
                >
                  Ubah Password
                </Button>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};
