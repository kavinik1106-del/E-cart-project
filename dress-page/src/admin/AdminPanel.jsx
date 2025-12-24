import React from "react";
import AdminLayout from "./AdminLayout";
import AdminDashboard from "./AdminDashboard";

function AdminPanel() {
  return (
    <AdminLayout>
      <AdminDashboard />
    </AdminLayout>
  );
}

export default AdminPanel;