"use client";

import { useEffect, useState, useCallback, memo } from "react";
import axios from "axios";
import {
  Users,
  UserCheck,
  UserX,
  Camera,
  Database,
  ShieldCheck,
  AlertTriangle,
  Download,
  RefreshCw,
  Clock,
} from "lucide-react";

import StatsCard from "@/components/StatsCard";

const API = "http://127.0.0.1:8000";

/* =========================
   HEALTH ROW (memoized)
========================= */
const HealthRow = memo(function HealthRow({ icon, title, status }) {
  return (
    <div className="flex justify-between items-center border-b pb-4">
      <div className="flex items-center gap-3">
        <div className="text-blue-600">{icon}</div>
        <span>{title}</span>
      </div>

      <span className="text-green-600 font-semibold">{status}</span>
    </div>
  );
});

export default function Dashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState("");

  const data = dashboardData || {};

  /* =========================
     FETCH DASHBOARD
  ========================= */
  const fetchDashboard = useCallback(async (showLoader = false) => {
    try {
      if (showLoader) setRefreshing(true);

      const { data } = await axios.get(`${API}/dashboard`);
      setDashboardData(data);

      setLastUpdated(
        new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    } catch (err) {
      console.error("Dashboard fetch error:", err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  /* =========================
     AUTO REFRESH (SAFE)
  ========================= */
  useEffect(() => {
    let isMounted = true;

    const load = async () => {
      if (isMounted) await fetchDashboard();
    };

    load();

    const interval = setInterval(() => {
      if (isMounted) fetchDashboard();
    }, 5000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [fetchDashboard]);

  /* =========================
     EXPORT ATTENDANCE
  ========================= */
  const exportAttendance = () => {
    window.open(`${API}/attendance/export`, "_blank");
  };

  /* =========================
     LOADING UI
  ========================= */
  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center bg-slate-100">
        <div className="text-center">
          <RefreshCw className="animate-spin mx-auto mb-4" size={45} />
          <p className="text-xl font-semibold">Loading Dashboard...</p>
        </div>
      </div>
    );
  }

  /* =========================
     SAFE VALUES
  ========================= */
  const attendance = Math.min(
    100,
    Math.max(0, data.attendancePercentage || 0)
  );

  const systemOnline = data.systemStatus !== "offline";

  return (
    <div className="min-h-screen bg-slate-100 p-6">

      {/* ================= HEADER ================= */}
      <div className="flex flex-col lg:flex-row justify-between items-center mb-8">

        <div>
          <h1 className="text-4xl font-bold text-slate-800">
            Face Recognition Attendance System
          </h1>

          <p className="text-gray-500 mt-2">
            Real-time Employee Monitoring Dashboard
          </p>

          <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
            <Clock size={15} />
            Last Updated: {lastUpdated}
          </div>
        </div>

        <div className="flex gap-3 mt-4 lg:mt-0">

          <button
            onClick={() => fetchDashboard(true)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
          >
            <RefreshCw
              size={18}
              className={refreshing ? "animate-spin" : ""}
            />
            Refresh
          </button>

          <button
            onClick={exportAttendance}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
          >
            <Download size={18} />
            Export Report
          </button>

          <div
            className={`px-4 py-2 rounded-lg font-semibold ${
              systemOnline
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            ● {systemOnline ? "System Online" : "System Offline"}
          </div>
        </div>
      </div>

      {/* ================= WARNING ================= */}
      {data.missingIdCardCount > 0 && (
        <div className="mb-6 bg-red-100 border border-red-300 rounded-xl p-4 flex items-center gap-3 text-red-700">
          <AlertTriangle />
          <span>
            {data.missingIdCardCount} Employee(s) detected without ID Card.
          </span>
        </div>
      )}

      {/* ================= STATS ================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">

        <StatsCard
          title="Total Employees"
          value={data.totalEmployees || 0}
          icon={<Users size={25} />}
          color="blue"
        />

        <StatsCard
          title="Present Today"
          value={data.presentToday || 0}
          icon={<UserCheck size={25} />}
          color="green"
        />

        <StatsCard
          title="Absent Today"
          value={data.absentToday || 0}
          icon={<UserX size={25} />}
          color="red"
        />

        <StatsCard
          title="Faces Detected"
          value={data.facesDetected || 0}
          icon={<Camera size={25} />}
          color="purple"
        />
      </div>

      {/* ================= ANALYTICS + SYSTEM ================= */}
      <div className="grid lg:grid-cols-3 gap-6 mb-8">

        {/* ANALYTICS */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-6">

          <h2 className="text-2xl text-gray-500 font-bold mb-6">
            Attendance Analytics
          </h2>

          <div className="flex justify-between mb-2 text-gray-500">
            <span>Attendance Rate</span>
            <span className="font-bold text-green-600">
              {attendance}%
            </span>
          </div>

          <div className="bg-gray-200 rounded-full h-5">
            <div
              className="bg-green-500 h-5 rounded-full transition-all duration-700"
              style={{ width: `${attendance}%` }}
            />
          </div>

          <div className="grid md:grid-cols-3 gap-5 mt-8">

            <div className="bg-blue-200 rounded-xl p-5">
              <h3 className="font-semibold text-blue-500">
                Today's Check-ins
              </h3>
              <p className="text-3xl text-blue-500 font-bold mt-2">
                {data.presentToday || 0}
              </p>
            </div>

            <div className="bg-green-200 rounded-xl p-5">
              <h3 className="font-semibold text-green-500">
                Recognized Faces
              </h3>
              <p className="text-3xl text-green-500 font-bold mt-2">
                {data.facesDetected || 0}
              </p>
            </div>

            <div className="bg-purple-200 rounded-xl p-5">
              <h3 className="font-semibold text-purple-500">
                Accuracy
              </h3>
              <p className="text-3xl text-purple-500 font-bold mt-2">
                {data.accuracy || 0}%
              </p>
            </div>

          </div>
        </div>

        {/* SYSTEM HEALTH */}
        <div className="bg-white rounded-2xl shadow-lg p-6">

          <h2 className="text-2xl font-bold mb-6 text-gray-500">
            System Health
          </h2>

          <div className="space-y-5 text-gray-500">

            <HealthRow
              icon={<Camera />}
              title="Camera Feed"
              status="Active"
            />

            <HealthRow
              icon={<Database />}
              title="Database"
              status="Connected"
            />

            <HealthRow
              icon={<ShieldCheck />}
              title="Recognition Engine"
              status="Running"
            />

          </div>
        </div>
      </div>

      {/* ================= LOGS ================= */}
      <div className="bg-white rounded-2xl shadow-lg p-6">

        <h2 className="text-2xl font-bold mb-6 text-gray-500">
          Recent Attendance Logs
        </h2>

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead>
              <tr className="bg-slate-200 ">
                <th className="p-4 text-left text-gray-500">Employee ID</th>
                <th className="p-4 text-left text-gray-500">Name</th>
                <th className="p-4 text-left text-gray-500">Department</th>
                <th className="p-4 text-left text-gray-500">Time</th>
                <th className="p-4 text-left text-gray-500">Status</th>
              </tr>
            </thead>

            <tbody>

              {data.logs?.length ? (
                data.logs.map((log) => (
                  <tr
                    key={log.id}
                    className="border-b hover:bg-slate-50  "
                  >
                    <td className="p-4 text-gray-500">{log.employee_id}</td>
                    <td className="p-4 text-gray-500">{log.name}</td>
                    <td className="p-4 text-gray-500">{log.department}</td>
                    <td className="p-4 text-gray-500">{log.time}</td>
                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm ${
                          log.status === "Present"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {log.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className="text-center py-8 text-gray-500"
                  >
                    No attendance records available.
                  </td>
                </tr>
              )}

            </tbody>

          </table>

        </div>
      </div>

    </div>
  );
}