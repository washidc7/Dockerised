import React from "react";
import { NavLink } from "react-router-dom";

const linkStyle = {
  padding: "10px 14px",
  borderRadius: 8,
  textDecoration: "none",
  fontWeight: 600,
};

const activeStyle = {
  background: "#4F46E5",
  color: "#fff",
};

export default function Navbar() {
  return (
    <nav
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "12px 20px",
        background: "#111827",
        color: "white",
        boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
      }}
    >
      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <div style={{ fontWeight: 800, fontSize: 18, marginRight: 8 }}>
          My Demo App
        </div>

        <NavLink
          to="/video"
          style={({ isActive }) => ({
            ...linkStyle,
            color: isActive ? activeStyle.color : "#e5e7eb",
            background: isActive ? activeStyle.background : "transparent",
          })}
        >
          Video
        </NavLink>

        <NavLink
          to="/chart"
          style={({ isActive }) => ({
            ...linkStyle,
            color: isActive ? activeStyle.color : "#e5e7eb",
            background: isActive ? activeStyle.background : "transparent",
          })}
        >
          Chart
        </NavLink>

        <NavLink
          to="/agrid"
          style={({ isActive }) => ({
            ...linkStyle,
            color: isActive ? activeStyle.color : "#e5e7eb",
            background: isActive ? activeStyle.background : "transparent",
          })}
        >
          Agrid
        </NavLink>

        <NavLink
          to="/iframe"
          style={({ isActive }) => ({
            ...linkStyle,
            color: isActive ? activeStyle.color : "#e5e7eb",
            background: isActive ? activeStyle.background : "transparent",
          })}
        >
          Iframe
        </NavLink>
      </div>

      <div style={{ opacity: 0.9, fontSize: 14 }}>Welcome 🔥</div>
    </nav>
  );
}
