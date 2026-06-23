"use client";

import { useState, useEffect } from "react";
import axios from "axios";

import {
  Users,
  UserCheck,
  UserX,
  Camera,
  Database,
  ShieldCheck,
} from "lucide-react";

import StatsCard from "@/components/StatsCard";

export default function Dashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/dashboard"
      );

      setDashboardData(response.data);
    } catch (error) {
      console.error(
        "Dashboard API Error:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-xl font-semibold">
        Loading Dashboard...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold text-slate-800">
            Face Detection Dashboard
          </h1>

          <p className="text-slate-500 mt-2">
            Monitor employee attendance and system performance in real time.
          </p>
        </div>

        <div className="mt-4 md:mt-0 bg-green-100 text-green-700 px-4 py-2 rounded-lg font-medium">
          System Online
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Total Employees"
          value={dashboardData.totalEmployees}
          icon={<Users size={26} />}
          color="blue"
        />

        <StatsCard
          title="Present Today"
          value={dashboardData.presentToday}
          icon={<UserCheck size={26} />}
          color="green"
        />

        <StatsCard
          title="Absent Today"
          value={dashboardData.absentToday}
          icon={<UserX size={26} />}
          color="red"
        />

        <StatsCard
          title="Faces Detected"
          value={dashboardData.facesDetected}
          icon={<Camera size={26} />}
          color="purple"
        />
      </div>

      {/* Main Content */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Attendance Overview */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-6">
            Attendance Overview
          </h2>

          <div className="mb-4 flex justify-between">
            <span className="text-gray-600">
              Employee Attendance Rate
            </span>

            <span className="font-bold text-green-600">
              {dashboardData.attendancePercentage}%
            </span>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-4">
            <div
              className="bg-green-500 h-4 rounded-full transition-all duration-500"
              style={{
                width: `${dashboardData.attendancePercentage}%`,
              }}
            />
          </div>

          <div className="grid md:grid-cols-3 gap-4 mt-8">
            <div className="bg-blue-50 p-4 rounded-xl">
              <h3 className="font-semibold text-blue-700">
                Check-ins
              </h3>

              <p className="text-3xl font-bold mt-2">
                {dashboardData.presentToday}
              </p>
            </div>

            <div className="bg-green-50 p-4 rounded-xl">
              <h3 className="font-semibold text-green-700">
                Recognized Faces
              </h3>

              <p className="text-3xl font-bold mt-2">
                {dashboardData.facesDetected}
              </p>
            </div>

            <div className="bg-purple-50 p-4 rounded-xl">
              <h3 className="font-semibold text-purple-700">
                Accuracy
              </h3>

              <p className="text-3xl font-bold mt-2">
                {dashboardData.accuracy}%
              </p>
            </div>
          </div>
        </div>

        {/* System Status */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-6">
            System Status
          </h2>

          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Camera className="text-green-500" />
                <span>Camera Feed</span>
              </div>

              <span className="text-green-600 font-semibold">
                Active
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Database className="text-blue-500" />
                <span>Database</span>
              </div>

              <span className="text-green-600 font-semibold">
                Connected
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <ShieldCheck className="text-purple-500" />
                <span>Recognition Engine</span>
              </div>

              <span className="text-green-600 font-semibold">
                Running
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Attendance Logs */}
      <div className="bg-white rounded-2xl shadow-md mt-8 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">
            Recent Attendance Logs
          </h2>

          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
            View All
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-slate-50">
                <th className="p-4 text-left">
                  Employee ID
                </th>
                <th className="p-4 text-left">
                  Name
                </th>
                <th className="p-4 text-left">
                  Department
                </th>
                <th className="p-4 text-left">
                  Check-In Time
                </th>
                <th className="p-4 text-left">
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
              {dashboardData.logs.map(
                (employee) => (
                  <tr
                    key={employee.id}
                    className="border-b hover:bg-slate-50"
                  >
                    <td className="p-4">
                      {employee.id}
                    </td>

                    <td className="p-4">
                      {employee.name}
                    </td>

                    <td className="p-4">
                      {employee.dept}
                    </td>

                    <td className="p-4">
                      {employee.time}
                    </td>

                    <td className="p-4">
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                        {employee.status}
                      </span>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}