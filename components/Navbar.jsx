"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  Bell,
  Search,
  Camera,
  LayoutDashboard,
  Users,
  ClipboardCheck,
  Settings,
} from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();

  const navLinks = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: <LayoutDashboard size={18} />,
    },
    {
      name: "Employees",
      href: "/employees",
      icon: <Users size={18} />,
    },
    {
      name: "Attendance",
      href: "/attendance",
      icon: <ClipboardCheck size={18} />,
    },
    {
      name: "Camera",
      href: "/camera",
      icon: <Camera size={18} />,
    },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white border-b shadow-sm">
      <div className="px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 p-2 rounded-lg">
            <Camera className="text-white" size={24} />
          </div>

          <div>
            <h1 className="text-xl font-bold text-slate-800">
              Face Detection
            </h1>
            <p className="text-xs text-slate-500">
              Attendance Management
            </p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-2">
          {navLinks.map((link) => {
            const active = pathname === link.href;

            return (
              <Link
                key={link.name}
                href={link.href}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                  active
                    ? "bg-blue-600 text-white"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                {link.icon}
                {link.name}
              </Link>
            );
          })}
        </div>

        {/* Search */}
        <div className="hidden md:flex items-center bg-slate-100 rounded-lg px-3 py-2 w-72">
          <Search
            size={18}
            className="text-slate-500"
          />

          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent outline-none ml-2 w-full"
          />
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Notifications */}
          <button className="relative p-2 rounded-lg hover:bg-slate-100">
            <Bell
              size={22}
              className="text-slate-600"
            />

            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* Settings */}
          <button className="p-2 rounded-lg hover:bg-slate-100">
            <Settings
              size={22}
              className="text-slate-600"
            />
          </button>

          {/* User Profile */}
          <div className="flex items-center gap-3">
            <img
              src="https://i.pravatar.cc/150?img=12"
              alt="profile"
              className="w-10 h-10 rounded-full border"
            />

            <div className="hidden md:block">
              <p className="font-semibold text-slate-800">
                Admin User
              </p>
              <p className="text-xs text-slate-500">
                System Administrator
              </p>
            </div>
          </div>

          {/* Mobile Menu */}
          <button className="lg:hidden p-2 rounded-lg hover:bg-slate-100">
            <Menu
              size={24}
              className="text-slate-700"
            />
          </button>
        </div>
      </div>
    </nav>
  );
}