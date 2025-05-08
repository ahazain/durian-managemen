import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Mail, Lock, Citrus as Fruit } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { Input } from "../components/common/Input";
import { Button } from "../components/common/Button";
import { Card } from "../components/common/Card";

export const Login: React.FC = () => {
  const { login, loading } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please enter both email and password");
      return;
    }

    try {
      await login(email, password);
      // Get the latest user data after login
      const userData = JSON.parse(
        localStorage.getItem("durianAppUser") || "{}"
      );
      // Redirect based on role
      if (userData.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/employee");
      }
    } catch (err: any) {
      setError(err.message || "Failed to login");
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
            Durian Management
          </h1>
          <p className="text-gray-600 mt-2">Login to access your account</p>
        </div>

        <Card className="w-full">
          <form onSubmit={handleSubmit}>
            {error && (
              <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md border border-red-200">
                {error}
              </div>
            )}

            <Input
              label="Email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              icon={<Mail size={18} />}
              required
            />

            <Input
              label="Password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              icon={<Lock size={18} />}
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

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="text-durian-600 hover:underline font-medium"
                >
                  Register here
                </Link>
              </p>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};
