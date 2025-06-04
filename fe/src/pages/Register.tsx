import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Lock,
  Phone,
  Eye,
  EyeOff,
  Citrus as Fruit,
} from "lucide-react";
import toast from "react-hot-toast";
import { useAuth } from "../contexts/AuthContext";
import { Input } from "../components/common/Input";
import { Button } from "../components/common/Button";
import { Card } from "../components/common/Card";

export const Register: React.FC = () => {
  const { register, loading } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    let hasEmptyFields = false;

    if (!formData.nama) {
      newErrors.nama = "Nama wajib diisi";
      hasEmptyFields = true;
    }

    if (!formData.email) {
      newErrors.email = "Email wajib diisi";
      hasEmptyFields = true;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Format email tidak valid";
      toast.error("Format email tidak valid");
    }

    if (!formData.phoneNumber) {
      newErrors.phoneNumber = "Nomor telepon wajib diisi";
      hasEmptyFields = true;
    } else if (!/^[0-9+\-\s()]+$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "Format nomor telepon tidak valid";
      toast.error("Format nomor telepon tidak valid");
    } else if (formData.phoneNumber.length < 10) {
      newErrors.phoneNumber = "Nomor telepon minimal 10 digit";
      toast.error("Nomor telepon minimal 10 digit");
    }

    if (!formData.password) {
      newErrors.password = "Password wajib diisi";
      hasEmptyFields = true;
    } else if (formData.password.length < 6) {
      newErrors.password = "Password minimal 6 karakter";
      toast.error("Password minimal 6 karakter");
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Konfirmasi password wajib diisi";
      hasEmptyFields = true;
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Password tidak sama";
      toast.error("Password tidak sama");
    }

    // Show single toast for empty fields
    if (hasEmptyFields) {
      toast.error("Semua field wajib diisi");
    }

    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    try {
      const { confirmPassword, ...registerData } = formData;
      await register(registerData);
      toast.success("Registrasi berhasil! Silakan login untuk melanjutkan.");
      navigate("/login");
    } catch (err: any) {
      let errorMessage = "Registrasi gagal, silakan coba lagi";

      console.log("Error object:", err); // Debug log

      // Handle axios error response structure
      if (err.response?.data?.message) {
        errorMessage = err.response.data.message;
      } else if (err.response?.data?.error) {
        errorMessage = err.response.data.error;
      } else if (err.response?.data) {
        // If response data is just a string
        errorMessage =
          typeof err.response.data === "string"
            ? err.response.data
            : errorMessage;
      } else if (err.message) {
        // Handle BadRequestError and other error types
        if (err.message.includes("BadRequestError:")) {
          // Extract message after "BadRequestError: "
          errorMessage = err.message.replace("BadRequestError:", "").trim();
        } else {
          errorMessage = err.message;
        }
      }

      // Additional specific error message handling
      const lowerMessage = errorMessage.toLowerCase();
      if (lowerMessage.includes("email") && lowerMessage.includes("sudah")) {
        errorMessage = "Email sudah terdaftar, silakan gunakan email lain";
      } else if (
        lowerMessage.includes("phone") &&
        lowerMessage.includes("sudah")
      ) {
        errorMessage = "Nomor telepon sudah terdaftar";
      } else if (
        lowerMessage.includes("nama") &&
        lowerMessage.includes("sudah")
      ) {
        errorMessage = "Nama sudah digunakan";
      }

      toast.error(errorMessage);
      setErrors({});
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-durian-100 to-durian-yellow-50 p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center p-3 bg-white rounded-full shadow-md mb-4">
            <Fruit size={40} className="text-durian-600" />
          </div>
          <h1 className="text-3xl font-bold text-durian-800">Daftar Akun</h1>
          <p className="text-gray-600 mt-2">Daftar sebagai karyawan baru</p>
        </div>

        <Card className="w-full">
          <form onSubmit={handleSubmit}>
            <Input
              label="Nama Lengkap"
              name="nama"
              type="text"
              placeholder="Masukkan nama lengkap"
              value={formData.nama}
              onChange={handleChange}
              icon={<User size={18} />}
              error={errors.nama}
            />

            <Input
              label="Email"
              name="email"
              type="email"
              placeholder="Masukkan email anda"
              value={formData.email}
              onChange={handleChange}
              icon={<Mail size={18} />}
              error={errors.email}
            />

            <Input
              label="No. Telepon"
              name="phoneNumber"
              type="tel"
              placeholder="Masukkan no. telepon anda"
              value={formData.phoneNumber}
              onChange={handleChange}
              icon={<Phone size={18} />}
              error={errors.phoneNumber}
            />

            <div className="relative">
              <Input
                label="Password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Masukkan password anda"
                value={formData.password}
                onChange={handleChange}
                icon={<Lock size={18} />}
                error={errors.password}
              />
              <button
                type="button"
                className="absolute right-3 top-9 text-gray-400 hover:text-gray-600"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <div className="relative">
              <Input
                label="Konfirmasi Password"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Konfirmasi password anda"
                value={formData.confirmPassword}
                onChange={handleChange}
                icon={<Lock size={18} />}
                error={errors.confirmPassword}
              />
              <button
                type="button"
                className="absolute right-3 top-9 text-gray-400 hover:text-gray-600"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <div className="mt-6">
              <Button
                type="submit"
                variant="primary"
                fullWidth
                loading={loading}
              >
                Register
              </Button>
            </div>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Sudah punya akun?{" "}
                <Link
                  to="/login"
                  className="text-durian-600 hover:underline font-medium"
                >
                  Login disini
                </Link>
              </p>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};
