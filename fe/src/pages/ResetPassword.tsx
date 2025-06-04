import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { KeyRound, EyeOff, Eye, ArrowLeft, Check } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import { Button } from "../components/common/Button"; // Import your Button component

export const ResetPassword: React.FC = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [token, setToken] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const tokenParam = queryParams.get("token");

    if (!tokenParam) {
      toast.error("Token reset password tidak valid");
      navigate("/login");
      return;
    }

    setToken(tokenParam);
  }, [location, navigate]);

  const validatePassword = (password: string): boolean => {
    return password.length >= 6;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validatePassword(newPassword)) {
      toast.error("Password harus minimal 6 karakter");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Konfirmasi password tidak cocok");
      return;
    }

    setIsLoading(true);

    try {
      const resetUrl = `http://localhost:3000/api/v1/profil/reset-password?token=${token}`;

      await axios.post(resetUrl, {
        newPassw: newPassword,
        confirmPassw: confirmPassword,
      });

      setIsSuccess(true);
      toast.success("Password berhasil diubah");

      // Redirect to login after 3 seconds
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (error) {
      console.error("Error resetting password:", error);
      toast.error("Gagal mengubah password");
    } finally {
      setIsLoading(false);
    }
  };

  const passwordStrength = (): { strength: string; color: string } => {
    if (newPassword.length === 0) return { strength: "", color: "" };
    if (newPassword.length < 6)
      return { strength: "Lemah", color: "text-red-500" };
    if (newPassword.length < 10)
      return { strength: "Sedang", color: "text-yellow-500" };
    return { strength: "Kuat", color: "text-green-500" };
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
          <div className="bg-durian-600 p-6 text-white">
            <h1 className="text-2xl font-bold">Reset Password</h1>
            <p className="mt-2 opacity-90">
              Buat password baru untuk akun Anda
            </p>
          </div>

          <div className="p-6">
            {!isSuccess ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label
                    htmlFor="newPassword"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password Baru
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <KeyRound className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="newPassword"
                      type={showNewPassword ? "text" : "password"}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-durian-500 focus:border-durian-500"
                      placeholder="Masukkan password baru"
                      required
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                    >
                      {showNewPassword ? (
                        <EyeOff className="h-5 w-5 text-gray-400" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-400" />
                      )}
                    </button>
                  </div>
                  {newPassword && (
                    <div className="flex items-center mt-1">
                      <span className={`text-xs ${passwordStrength().color}`}>
                        Kekuatan: {passwordStrength().strength}
                      </span>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Konfirmasi Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <KeyRound className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-durian-500 focus:border-durian-500"
                      placeholder="Konfirmasi password baru"
                      required
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-5 w-5 text-gray-400" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-400" />
                      )}
                    </button>
                  </div>
                  {confirmPassword && newPassword !== confirmPassword && (
                    <p className="text-xs text-red-500 mt-1">
                      Password tidak cocok
                    </p>
                  )}
                  {confirmPassword && newPassword === confirmPassword && (
                    <p className="text-xs text-green-500 mt-1 flex items-center">
                      <Check className="h-3 w-3 mr-1" /> Password cocok
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  fullWidth
                  loading={isLoading}
                >
                  {isLoading ? "Memproses..." : "Reset Password"}
                </Button>

                <div className="mt-4">
                  <Link
                    to="/login"
                    className="inline-flex items-center text-sm text-durian-600 hover:text-durian-800 transition-colors"
                  >
                    <ArrowLeft className="mr-1 h-4 w-4" /> Kembali ke Login
                  </Link>
                </div>
              </form>
            ) : (
              <div className="text-center py-6">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                  <svg
                    className="h-6 w-6 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                </div>
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Password Berhasil Diubah!
                </h3>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Password Anda telah berhasil diubah. Anda akan dialihkan ke
                    halaman login dalam beberapa detik.
                  </p>
                </div>
                <div className="mt-6">
                  <Link to="/login">
                    <Button variant="primary" size="md">
                      Ke Halaman Login
                    </Button>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
