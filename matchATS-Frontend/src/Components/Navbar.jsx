import React, { useState } from "react";
import { Menu, X, BrainCircuit, LayoutDashboard, Zap } from "lucide-react";
import { NavLink, Link } from "react-router-dom";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const links = [
    { name: "Analyze Resume", path: "/analyze", icon: <LayoutDashboard size={16} /> },
    { name: "Find Best Match", path: "/dashboard", icon: <Zap size={16} /> },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-indigo-600 p-2 rounded-lg group-hover:bg-indigo-700 transition">
              <BrainCircuit className="text-white w-5 h-5" />
            </div>
            <span className="text-xl font-bold tracking-tight">
              Match<span className="text-indigo-600">ATS</span>
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-2">
            {links.map((l) => (
              <NavLink
                key={l.path}
                to={l.path}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all
                  ${
                    isActive
                      ? "bg-indigo-50 text-indigo-700"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  }`
                }
              >
                {l.icon}
                {l.name}
              </NavLink>
            ))}
          </div>

          {/* Mobile Button */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 rounded-lg hover:bg-slate-100 transition"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 pb-6 pt-2 space-y-2 bg-white shadow-lg">
          {links.map((l) => (
            <NavLink
              key={l.path}
              to={l.path}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition
                ${
                  isActive
                    ? "bg-indigo-50 text-indigo-600"
                    : "text-slate-600 hover:bg-slate-100"
                }`
              }
            >
              {l.icon}
              {l.name}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
