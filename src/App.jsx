import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import ProtectedRoute from "./components/ProtectedRoute";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";

import AdminOverview from "./pages/admin/AdminOverview";
import AdminMachines from "./pages/admin/AdminMachines";
import AdminMachineDetail from "./pages/admin/AdminMachineDetail";
import AdminVendors from "./pages/admin/AdminVendors";
import AdminVendorDetail from "./pages/admin/AdminVendorDetail";
import AdminCustomers from "./pages/admin/AdminCustomers";
import AdminCustomerDetail from "./pages/admin/AdminCustomerDetail";
import AdminWithdrawals from "./pages/admin/AdminWithdrawals";

import VendorOverview from "./pages/vendor/VendorOverview";
import VendorMachines from "./pages/vendor/VendorMachines";
import VendorMachineDetail from "./pages/vendor/VendorMachineDetail";
import VendorBank from "./pages/vendor/VendorBank";
import VendorWithdrawals from "./pages/vendor/VendorWithdrawals";

export default function App() {
  return (
    <Routes>
      {/* Public landing page */}
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />

      {/* Admin */}
      <Route path="/admin" element={<ProtectedRoute requiredRole="admin"><AdminOverview /></ProtectedRoute>} />
      <Route path="/admin/machines" element={<ProtectedRoute requiredRole="admin"><AdminMachines /></ProtectedRoute>} />
      <Route path="/admin/machines/:machineId" element={<ProtectedRoute requiredRole="admin"><AdminMachineDetail /></ProtectedRoute>} />
      <Route path="/admin/vendors" element={<ProtectedRoute requiredRole="admin"><AdminVendors /></ProtectedRoute>} />
      <Route path="/admin/vendors/:vendorId" element={<ProtectedRoute requiredRole="admin"><AdminVendorDetail /></ProtectedRoute>} />
      <Route path="/admin/customers" element={<ProtectedRoute requiredRole="admin"><AdminCustomers /></ProtectedRoute>} />
      <Route path="/admin/customers/:customerId" element={<ProtectedRoute requiredRole="admin"><AdminCustomerDetail /></ProtectedRoute>} />
      <Route path="/admin/withdrawals" element={<ProtectedRoute requiredRole="admin"><AdminWithdrawals /></ProtectedRoute>} />

      {/* Vendor */}
      <Route path="/vendor" element={<ProtectedRoute requiredRole="vendor"><VendorOverview /></ProtectedRoute>} />
      <Route path="/vendor/machines" element={<ProtectedRoute requiredRole="vendor"><VendorMachines /></ProtectedRoute>} />
      <Route path="/vendor/machines/:machineId" element={<ProtectedRoute requiredRole="vendor"><VendorMachineDetail /></ProtectedRoute>} />
      <Route path="/vendor/bank" element={<ProtectedRoute requiredRole="vendor"><VendorBank /></ProtectedRoute>} />
      <Route path="/vendor/withdrawals" element={<ProtectedRoute requiredRole="vendor"><VendorWithdrawals /></ProtectedRoute>} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
