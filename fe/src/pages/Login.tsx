import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Mail, Lock, Citrus as Fruit, Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";
import { useAuth } from "../contexts/AuthContext";
import { Input } from "../components/common/Input";
import { Button } from "../components/common/Button";
import { Card } from "../components/common/Card";

export const Login: React.FC = () => {
  const { login, loading } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please enter both email and password");
      return;
    }

    try {
      await login(email, password);
      // Get the latest user data after login
      const userData = JSON.parse(
        localStorage.getItem("durianAppUser") || "{}"
      );

      toast.success("Login berhasil!");

      // Redirect based on role
      if (userData.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/employee");
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to login");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-durian-100 to-durian-yellow-50 p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center p-3 bg-white rounded-full shadow-md mb-4">
            <Fruit size={40} className="text-durian-600" />
          </div>
          <h1 className="text-3xl font-bold text-durian-800">
            Manajemen Durian
          </h1>
          <p className="text-gray-600 mt-2">Masuk untuk mengakses akun Anda</p>
        </div>

        <Card className="w-full">
          <form onSubmit={handleSubmit}>
            <Input
              label="Email"
              type="email"
              placeholder="masukkan email anda"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              icon={<Mail size={18} />}
              required
            />
            <Input
              label="Password"
              type={showPassword ? "text" : "password"}
              placeholder="Masukkan password anda"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              icon={<Lock size={18} />}
              rightIcon={
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              }
              required
            />

            <div className="mt-6">
              <Button
                type="submit"
                variant="primary"
                fullWidth
                loading={loading}
              >
                Login
              </Button>
            </div>

            {/* lupa passw*/}
            <div className="mt-4 flex justify-end">
              <Link
                to="/forgot-password"
                className="text-sm text-durian-600 hover:underline"
              >
                Lupa Password?
              </Link>
            </div>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Belum punya akun?{" "}
                <Link
                  to="/register"
                  className="text-durian-600 hover:underline font-medium"
                >
                  Daftar di sini
                </Link>
              </p>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};
