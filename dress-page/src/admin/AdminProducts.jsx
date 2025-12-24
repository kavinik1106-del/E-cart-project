import React, { useEffect, useState } from "react";
import { menProducts } from "../data/menProducts";

function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ id: "", name: "", type: "", price: "", image: "" });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("admin_products");
    if (stored) setProducts(JSON.parse(stored));
    else {
      localStorage.setItem("admin_products", JSON.stringify(menProducts));
      setProducts(menProducts);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("admin_products", JSON.stringify(products));
  }, [products]);

  function resetForm() {
    setForm({ id: "", name: "", type: "", price: "", image: "" });
    setEditingId(null);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (editingId != null) {
      setProducts((prev) => prev.map((p) => (p.id === editingId ? { ...p, ...form, price: Number(form.price) } : p)));
    } else {
      const nextId = products.reduce((max, p) => Math.max(max, p.id || 0), 0) + 1;
      setProducts((prev) => [...prev, { ...form, id: nextId, price: Number(form.price) }]);
    }
    resetForm();
  }

  function handleEdit(p) {
    setEditingId(p.id);
    setForm({ id: p.id, name: p.name || "", type: p.type || "", price: String(p.price || ""), image: p.image || "" });
  }

  function handleDelete(id) {
    if (!confirm("Delete product?")) return;
    setProducts((prev) => prev.filter((p) => p.id !== id));
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Manage Products</h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-6">
        <input className="border p-2" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <input className="border p-2" placeholder="Type" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} />
        <input className="border p-2" placeholder="Price" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
        <input className="border p-2" placeholder="Image path" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} />
        <div className="md:col-span-4 flex gap-2">
          <button className="px-3 py-1 bg-green-600 text-white rounded" type="submit">{editingId ? 'Save' : 'Add'}</button>
          <button type="button" className="px-3 py-1 bg-gray-200 rounded" onClick={resetForm}>Cancel</button>
        </div>
      </form>

      <div className="overflow-x-auto border rounded">
        <table className="min-w-full text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2">ID</th>
              <th className="p-2">Name</th>
              <th className="p-2">Type</th>
              <th className="p-2">Price</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-t">
                <td className="p-2">{p.id}</td>
                <td className="p-2">{p.name}</td>
                <td className="p-2">{p.type}</td>
                <td className="p-2">₹{p.price}</td>
                <td className="p-2">
                  <button className="mr-2 px-2 py-1 bg-yellow-400 rounded" onClick={() => handleEdit(p)}>Edit</button>
                  <button className="px-2 py-1 bg-red-500 text-white rounded" onClick={() => handleDelete(p.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminProducts;
