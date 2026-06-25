"use client";

import { useEffect, useState } from "react";
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
} from "lucide-react";

import StatsCard from "@/components/StatsCard";

export default function Dashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchDashboard = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/dashboard"
      );

      setDashboardData(response.data);
    } catch (error) {
      console.error("Dashboard Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();

    const interval = setInterval(() => {
      fetchDashboard();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const exportAttendance = () => {
    window.open(
      "http://127.0.0.1:8000/attendance/export",
      "_blank"
    );
  };

  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <div className="text-2xl font-bold">
          Loading Dashboard...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold text-slate-800">
            Face Detection System
          </h1>

          <p className="text-gray-500 mt-2">
            Real-time Employee Attendance Monitoring
          </p>
        </div>

        <div className="flex gap-3 mt-4 lg:mt-0">
          <button
            onClick={exportAttendance}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
          >
            <Download size={18} />
            Export Report
          </button>

          <div className="bg-green-100 text-green-700 px-4 py-2 rounded-lg font-semibold">
            ● System Online
          </div>
        </div>
      </div>

      {/* ID Card Warning */}
      {dashboardData.missingIdCardCount > 0 && (
        <div className="mb-6 bg-red-100 border border-red-300 text-red-700 p-4 rounded-xl flex items-center gap-3">
          <AlertTriangle />
          <span>
            {dashboardData.missingIdCardCount} Employee(s)
            detected without ID Card
          </span>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Total Employees"
          value={dashboardData.totalEmployees}
          icon={<Users size={24} />}
          color="blue"
        />

        <StatsCard
          title="Present Today"
          value={dashboardData.presentToday}
          icon={<UserCheck size={24} />}
          color="green"
        />

        <StatsCard
          title="Absent Today"
          value={dashboardData.absentToday}
          icon={<UserX size={24} />}
          color="red"
        />

        <StatsCard
          title="Faces Detected"
          value={dashboardData.facesDetected}
          icon={<Camera size={24} />}
          color="purple"
        />
      </div>

      {/* Analytics + Health */}
      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        {/* Attendance Analytics */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow p-6">
          <h2 className="text-xl font-bold mb-6">
            Attendance Analytics
          </h2>

          <div className="flex justify-between mb-2">
            <span>Attendance Rate</span>

            <span className="font-bold text-green-600">
              {dashboardData.attendancePercentage}%
            </span>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-5">
            <div
              className="bg-green-500 h-5 rounded-full transition-all duration-500"
              style={{
                width: `${dashboardData.attendancePercentage}%`,
              }}
            />
          </div>

          <div className="grid md:grid-cols-3 gap-4 mt-8">
            <div className="bg-blue-50 p-5 rounded-xl">
              <h3 className="font-semibold">
                Check-ins
              </h3>

              <p className="text-3xl font-bold mt-2">
                {dashboardData.presentToday}
              </p>
            </div>

            <div className="bg-green-50 p-5 rounded-xl">
              <h3 className="font-semibold">
                Recognized Faces
              </h3>

              <p className="text-3xl font-bold mt-2">
                {dashboardData.facesDetected}
              </p>
            </div>

            <div className="bg-purple-50 p-5 rounded-xl">
              <h3 className="font-semibold">
                Recognition Accuracy
              </h3>

              <p className="text-3xl font-bold mt-2">
                {dashboardData.accuracy}%
              </p>
            </div>
          </div>
        </div>

        {/* System Health */}
        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-xl font-bold mb-6">
            System Health
          </h2>

          <div className="space-y-5">
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

      {/* Attendance Logs */}
      <div className="bg-white rounded-2xl shadow p-6">
        <h2 className="text-xl font-bold mb-6">
          Recent Attendance Logs
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 border-b">
                <th className="p-4 text-left">ID</th>
                <th className="p-4 text-left">Name</th>
                <th className="p-4 text-left">Department</th>
                <th className="p-4 text-left">Time</th>
                <th className="p-4 text-left">Status</th>
              </tr>
            </thead>

            <tbody>
              {dashboardData.logs?.map((employee) => (
                <tr
                  key={employee.id}
                  className="border-b hover:bg-slate-50"
                >
                  <td className="p-4">
                    {employee.employee_id}
                  </td>

                  <td className="p-4">
                    {employee.name}
                  </td>

                  <td className="p-4">
                    {employee.department}
                  </td>

                  <td className="p-4">
                    {employee.time}
                  </td>

                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        employee.status === "Present"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {employee.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function HealthRow({ icon, title, status }) {
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-3">
        {icon}
        <span>{title}</span>
      </div>

      <span className="text-green-600 font-semibold">
        {status}
      </span>
    </div>
  );
}