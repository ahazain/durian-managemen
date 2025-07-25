import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./contexts/AuthContext";
import { AppLayout } from "./components/layout/AppLayout";

// Pages
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { ForgotPassword } from "./pages/ForgotPassword";
import { ResetPassword } from "./pages/ResetPassword";

// Admin Pages
import { AdminDashboard } from "./pages/admin/Dashboard";
import { AdminAccounts } from "./pages/admin/Accounts";
import { Profil } from "./pages/admin/Profil";
import { AdminScheduling } from "./pages/admin/Scheduling";
import { AdminAttendance } from "./pages/admin/Attendance";
import { AdminDurianPrediction } from "./pages/admin/DurianPrediction";

// Employee Pages
import { EmployeeDashboard } from "./pages/employee/Dashboard";
import { EmployeeAccount } from "./pages/employee/Account";
import { EmployeeSchedule } from "./pages/employee/Schedule";
import { EmployeeAttendance } from "./pages/employee/Attendance";
import { EmployeeDurianPrediction } from "./pages/employee/DurianPrediction";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Toaster position="top-center" reverseOrder={true} />
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          {/* Admin Routes */}
          <Route path="/admin" element={<AppLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="accounts" element={<AdminAccounts />} />
            <Route path="profil" element={<Profil />} />
            <Route path="scheduling" element={<AdminScheduling />} />
            <Route path="attendance" element={<AdminAttendance />} />
            <Route path="prediction" element={<AdminDurianPrediction />} />
          </Route>

          {/* Employee Routes */}
          <Route path="/employee" element={<AppLayout />}>
            <Route index element={<EmployeeDashboard />} />
            <Route path="account" element={<EmployeeAccount />} />
            <Route path="schedule" element={<EmployeeSchedule />} />
            <Route path="attendance" element={<EmployeeAttendance />} />
            <Route path="prediction" element={<EmployeeDurianPrediction />} />
          </Route>

          {/* Default Redirect */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
