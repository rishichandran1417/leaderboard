import React from "react";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-4 py-3 bg-white shadow">
      <a href="https://www.iedccet.com/">
        <img src="/iedc_logo.png" alt="IEDC Logo" className="w-20 h-auto" />
      </a>
    </nav>
  );
}
