import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import EmployeeForm from "../components/EmployeeForm";
import EmployeeList from "../components/EmployeeList";
import { API_BASE } from "../api";

export default function EmployeePage() {
  const [employees, setEmployees] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState("");
  const [editEmployee, setEditEmployee] = useState(null);

  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE}/employees/`);
      setEmployees(res.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchEmployees(); }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return employees;
    return employees.filter(e =>
      (e.name || "").toLowerCase().includes(q) ||
      (e.email || "").toLowerCase().includes(q)
    );
  }, [employees, query]);

  const handleDelete = async (id) => {
    const ok = window.confirm("Delete this employee? This cannot be undone.");
    if (!ok) return;
    await axios.delete(`${API_BASE}/employees/${id}/`);
    setToast("Employee deleted.");
    setTimeout(() => setToast(""), 1800);
    fetchEmployees();
  };

  return (
    <div style={{ padding: 16 }}>
      {/* Toolbar */}
      <div style={{
        maxWidth: 700, margin: "0 auto 12px", display: "flex", gap: 10, alignItems: "center"
      }}>
        <div style={{ fontWeight: 700 }}>Total: {employees.length}</div>
        <input
          placeholder="Search name or email…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{
            marginLeft: "auto", padding: "8px 10px", border: "1px solid #d1d5db",
            borderRadius: 8, minWidth: 280
          }}
        />
        <button
          onClick={fetchEmployees}
          style={{ padding: "8px 12px", borderRadius: 8, border: "1px solid #d1d5db", background: "#fff" }}
        >
          Refresh
        </button>
      </div>

      {/* Form (Create or Edit) */}
      <EmployeeForm
        onSaved={fetchEmployees}
        editEmployee={editEmployee}
        clearEdit={() => setEditEmployee(null)}
      />

      {toast && <div style={{ color: "green", textAlign: "center" }}>{toast}</div>}
      {loading && <p style={{ textAlign: "center" }}>Loading…</p>}

      {/* List */}
      <div style={{
        maxWidth: 700, margin: "0 auto", background: "#fff", padding: 12,
        borderRadius: 12, boxShadow: "0 10px 30px rgba(0,0,0,0.06)"
      }}>
        <EmployeeList
          employees={filtered}
          onDelete={handleDelete}
          onEdit={(emp) => setEditEmployee(emp)}
        />
      </div>
    </div>
  );
}
