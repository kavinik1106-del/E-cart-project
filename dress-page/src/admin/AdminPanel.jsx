import React from "react";
import { useNavigate } from "react-router-dom";

function AdminPanel() {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("isAdmin");
    navigate("/admin/login");
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Admin Panel</h1>
        <div className="flex gap-2">
          <button className="px-3 py-1 bg-gray-200 rounded" onClick={() => navigate('/collection')}>View Site</button>
          <button className="px-3 py-1 bg-red-500 text-white rounded" onClick={handleLogout}>Logout</button>
        </div>
      </div>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="p-4 border rounded">
          <h2 className="font-semibold">Products</h2>
          <p className="text-sm text-gray-600">Manage products, add new items, edit or remove existing ones.</p>
          <div className="mt-3">
            <button className="px-3 py-1 bg-blue-600 text-white rounded" onClick={() => navigate('/admin/products')}>Manage Products</button>
          </div>
        </div>

        <div className="p-4 border rounded">
          <h2 className="font-semibold">Orders</h2>
          <p className="text-sm text-gray-600">View and manage orders (connect a backend to enable).</p>
          <div className="mt-3">
            <button className="px-3 py-1 bg-blue-600 text-white rounded" onClick={() => navigate('/admin/orders')}>Orders</button>
          </div>
        </div>

        <div className="p-4 border rounded">
          <h2 className="font-semibold">Settings</h2>
          <p className="text-sm text-gray-600">Configure site settings and integrations.</p>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-3">Notes</h2>
        <div className="border rounded p-4">
          <p className="text-sm text-gray-600">This admin is a frontend demo. To make it production-ready, integrate real authentication (JWT/OAuth), a backend API, and role-based access control.</p>
        </div>
      </section>
    </div>
  );
}

export default AdminPanel;
