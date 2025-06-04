import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, ArrowLeft, Send } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import { Button } from "../components/common/Button"; // Import your Button component

export const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      toast.error("Email tidak boleh kosong");
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      toast.error("Format email tidak valid");
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/profil/send-email",
        {
          email,
        }
      );

      setIsSuccess(true);
      toast.success("Link reset password telah dikirim ke email");
      console.log("Reset link:", response.data.data.reset_link);
    } catch (error) {
      console.error("Error sending email:", error);
      toast.error("Gagal mengirim email reset password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
          <div className="bg-durian-600 p-6 text-white">
            <h1 className="text-2xl font-bold">Lupa Password</h1>
            <p className="mt-2 opacity-90">
              Masukkan email Anda untuk menerima link reset password
            </p>
          </div>

          <div className="p-6">
            {!isSuccess ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-durian-500 focus:border-durian-500"
                      placeholder="nama@example.com"
                      required
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  fullWidth
                  loading={isLoading}
                  icon={<Send className="h-4 w-4" />}
                >
                  {isLoading ? "Mengirim..." : "Kirim Link Reset"}
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
                  Email Terkirim!
                </h3>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Kami telah mengirimkan link reset password ke email Anda.
                    Silakan periksa kotak masuk atau folder spam Anda.
                  </p>
                </div>
                <div className="mt-6">
                  <Link to="/login">
                    <Button variant="primary" size="md">
                      Kembali ke Login
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
