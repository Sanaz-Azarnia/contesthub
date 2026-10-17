"use client";

import React from "react";

 
export default function Footer(): React.ReactElement {
   

  return (
    <footer
      style={{
        width: "100%",
        backgroundColor: "#020617",
        borderTop: "1px solid #000",
        padding: "24px 0",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
      }} 
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          color: "#a1a1aa",
          fontSize: "14px",
          letterSpacing: "0.4px",
        }}
      >
        <span style={{ color: "#cbd5e1", fontWeight: 400 }}>Made by</span>
        <span style={{ color: "#cbd5e1", fontWeight: 600 }}>
         Sanaz Azarnia
        </span>
        <Dot />
        <span style={{ color: "#cbd5e1", fontWeight: 400 }}>
          All rights reserved
        </span>
      </div>
    </footer>
  );
}

function Dot(): React.ReactElement {
  return (
    <span
      style={{
        width: "4px",
        height: "4px",
        borderRadius: "50%",
        backgroundColor: "#52525b",
        display: "inline-block",
      }}
    ></span>
  );
}