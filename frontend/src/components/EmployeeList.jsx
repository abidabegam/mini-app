import React from "react";

export default function EmployeeList({ employees, onDelete, onEdit }) {
  if (!employees.length) {
    return <p style={{ color: "#6b7280" }}>No employees yet. Add one above.</p>;
  }

  return (
    <ul className="list">
      {employees.map((e) => (
        <li className="item" key={e.id} style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 700 }}>{e.name}</div>
            <div style={{ color: "#6b7280", fontSize: 14 }}>{e.email}</div>
          </div>

          {e.resume && (
            <a
              href={e.resume}
              target="_blank"
              rel="noreferrer"
              style={{ textDecoration: "none", fontSize: 14 }}
              title="Open resume"
            >
              📄 Resume
            </a>
          )}

          <button
            onClick={() => onEdit?.(e)}
            style={{
              border: "1px solid #3b82f6",
              background: "#fff",
              color: "#1d4ed8",
              padding: "6px 10px",
              borderRadius: 6,
              cursor: "pointer"
            }}
            title="Edit employee"
          >
            Edit
          </button>

          <button
            onClick={() => onDelete?.(e.id)}
            style={{
              border: "1px solid #ef4444",
              background: "#fff",
              color: "#b91c1c",
              padding: "6px 10px",
              borderRadius: 6,
              cursor: "pointer"
            }}
            title="Delete employee"
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}
