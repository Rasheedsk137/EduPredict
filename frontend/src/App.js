import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AdminDashboard from "./pages/AdminDashboard";
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import ProtectedRoute from './components/ProtectedRoute';
import DashboardLayout from './components/DashboardLayout';
import Login from "./pages/Login";
import AdminLogin from "./pages/AdminLogin";
import LoginPage      from './pages/LoginPage';
import RegisterPage   from './pages/RegisterPage';
import DashboardPage  from './pages/DashboardPage';
import StudentsPage   from './pages/StudentsPage';
import PredictionsPage from './pages/PredictionsPage';
import AdminPage      from './pages/AdminPage';

/* Route-aware layout wrapper */
const PAGE_TITLES = {
  '/dashboard':   'Dashboard',
  '/students':    'Students',
  '/predictions': 'Predictions',
  '/admin':       'Admin Panel',
};

function LayoutWrapper({ page, element }) {
  return (
    <DashboardLayout pageTitle={PAGE_TITLES[page] || 'EduPredict'}>
      {element}
    </DashboardLayout>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <AuthProvider>
          <Routes>
            {/* Public routes */}
            <Route path="/login"    element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />

            {/* Protected routes */}
            <Route element={<ProtectedRoute />}>
            <Route path="/admin-login" element={<AdminLogin />}
/>
              <Route path="/dashboard"   element={<LayoutWrapper page="/dashboard"   element={<DashboardPage />} />} />
              <Route path="/students"    element={<LayoutWrapper page="/students"    element={<StudentsPage />} />} />
              <Route path="/predictions" element={<LayoutWrapper page="/predictions" element={<PredictionsPage />} />} />
              <Route path="/admin"       element={<LayoutWrapper page="/admin"       element={<AdminPage />} />} />
            </Route>

            {/* Default redirect */}
            <Route path="/"   element={<Navigate to="/dashboard" replace />} />
            <Route path="*"   element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </AuthProvider>
      </ToastProvider>
    </BrowserRouter>
  );
}
