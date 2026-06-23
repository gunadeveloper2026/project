"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  ClipboardCheck,
  Camera,
  BarChart3,
  Settings,
  LogOut,
  ScanFace,
} from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();

  const menuItems = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Employees",
      href: "/employees",
      icon: Users,
    },
    {
      title: "Attendance",
      href: "/attendance",
      icon: ClipboardCheck,
    },
    {
      title: "Live Camera",
      href: "/camera",
      icon: Camera,
    },
    {
      title: "Analytics",
      href: "/analytics",
      icon: BarChart3,
    },
    {
      title: "Settings",
      href: "/settings",
      icon: Settings,
    },
  ];

  return (
    <aside className="w-72 min-h-screen bg-slate-900 text-white flex flex-col shadow-xl">
      {/* Logo */}
      <div className="border-b border-slate-700 p-6">
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 p-3 rounded-xl">
            <ScanFace size={28} />
          </div>

          <div>
            <h1 className="font-bold text-xl">
              Face Detection
            </h1>

            <p className="text-xs text-slate-400">
              Attendance System
            </p>
          </div>
        </div>
      </div>

      {/* User Profile */}
      <div className="p-6 border-b border-slate-700">
        <div className="flex items-center gap-4">
          <img
            src="https://i.pravatar.cc/150?img=12"
            alt="Admin"
            className="w-12 h-12 rounded-full border-2 border-blue-500"
          />

          <div>
            <h3 className="font-semibold">
              Admin User
            </h3>

            <p className="text-sm text-slate-400">
              System Administrator
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 p-4">
        <p className="text-xs uppercase text-slate-500 px-3 mb-4">
          Main Menu
        </p>

        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                    active
                      ? "bg-blue-600 text-white shadow-lg"
                      : "hover:bg-slate-800 text-slate-300"
                  }`}
                >
                  <Icon size={20} />
                  <span>{item.title}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Quick Stats */}
      <div className="mx-4 mb-4 bg-slate-800 rounded-xl p-4">
        <h3 className="font-semibold mb-3">
          Today's Overview
        </h3>

        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Present</span>
            <span className="text-green-400">
              120
            </span>
          </div>

          <div className="flex justify-between">
            <span>Absent</span>
            <span className="text-red-400">
              30
            </span>
          </div>

          <div className="flex justify-between">
            <span>Accuracy</span>
            <span className="text-blue-400">
              98.7%
            </span>
          </div>
        </div>
      </div>

      {/* Logout */}
      <div className="border-t border-slate-700 p-4">
        <button className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 transition-all py-3 rounded-xl">
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
}