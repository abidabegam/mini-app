import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE } from "../api";

export default function EmployeeForm({ onSaved, editEmployee, clearEdit }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [resume, setResume] = useState(null);
  const [saving, setSaving] = useState(false);
  const isEditing = !!editEmployee;

  // Prefill when editing
  useEffect(() => {
    if (editEmployee) {
      setName(editEmployee.name || "");
      setEmail(editEmployee.email || "");
      setResume(null); // keep old file unless user picks a new one
    } else {
      setName("");
      setEmail("");
      setResume(null);
    }
  }, [editEmployee]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    const fd = new FormData();
    fd.append("name", name);
    fd.append("email", email);
    // only append resume if user picked one; otherwise backend keeps old
    if (resume) fd.append("resume", resume);

    try {
      if (isEditing) {
        await axios.put(`${API_BASE}/employees/${editEmployee.id}/`, fd, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        await axios.post(`${API_BASE}/employees/`, fd, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }
      onSaved?.();
      clearEdit?.();
      setName(""); setEmail(""); setResume(null);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={{
      maxWidth: 700, margin: "0 auto 16px", background: "#fff",
      padding: 16, borderRadius: 12, boxShadow: "0 10px 30px rgba(0,0,0,0.06)"
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <h2 style={{ margin: 0, flex: 1 }}>Mini HCM – Employees</h2>
      </div>

      <form onSubmit={handleSubmit} style={{ display: "grid", gap: 10, marginTop: 12 }}>
        <input
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          placeholder="Email Address"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={(e) => setResume(e.target.files[0])}
        />

        <div style={{ display: "flex", gap: 8 }}>
          <button
            type="submit"
            disabled={saving}
            style={{
              background: "#1d4ed8", color: "#fff", border: "none",
              padding: "10px 14px", borderRadius: 8, cursor: "pointer", minWidth: 160
            }}
          >
            {saving ? "Saving..." : isEditing ? "Update Employee" : "Add Employee"}
          </button>

          {isEditing && (
            <button
              type="button"
              onClick={clearEdit}
              style={{
                background: "#f3f4f6", color: "#111827", border: "1px solid #d1d5db",
                padding: "10px 14px", borderRadius: 8, cursor: "pointer"
              }}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
