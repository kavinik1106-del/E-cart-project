// src/contexts/CustomerContext.jsx
import React, { useState } from "react";
import axios from "axios";
import { CustomerContext } from "./CustomerContextConfig";

export function CustomerProvider({ children }) {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

 const fetchCustomers = async () => {
  try {
    setLoading(true);
    const res = await axios.get("http://localhost:5000/api/admin/customers/all");
    if (res.data.success) {
      setCustomers(res.data.data);
    }
  } catch (err) {
    console.error(err);
    setError("Failed to fetch customers");
  } finally {
    setLoading(false);
  }
};

  return (
    <CustomerContext.Provider value={{ customers, fetchCustomers, loading, error }}>
      {children}
    </CustomerContext.Provider>
  );
}
