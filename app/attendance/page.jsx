"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import {
  Search,
  Download,
  UserCheck,
  UserX,
  Clock,
} from "lucide-react";

export default function Attendance() {
  const [search, setSearch] = useState("");
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAttendance();
  }, []);

  const fetchAttendance = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/attendance"
      );

      setAttendanceData(response.data);
    } catch (error) {
      console.error(
        "Error fetching attendance:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  const filteredData = attendanceData.filter(
    (employee) =>
      employee.name
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      employee.id
        ?.toLowerCase()
        .includes(search.toLowerCase())
  );

  const presentCount = attendanceData.filter(
    (item) => item.status === "Present"
  ).length;

  const absentCount = attendanceData.filter(
    (item) => item.status === "Absent"
  ).length;

  const lateCount = attendanceData.filter(
    (item) => item.status === "Late"
  ).length;

  const attendanceRate =
    attendanceData.length > 0
      ? Math.round(
          (presentCount / attendanceData.length) * 100
        )
      : 0;

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-xl font-semibold">
        Loading Attendance...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold text-slate-800">
            Attendance Management
          </h1>

          <p className="text-slate-500 mt-2">
            Monitor employee attendance captured through face recognition.
          </p>
        </div>

        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl mt-4 lg:mt-0">
          <Download size={18} />
          Export Report
        </button>
      </div>

      {/* Statistics */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-2xl shadow-md p-6">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-500">Present</p>
              <h2 className="text-3xl font-bold text-green-600 mt-2">
                {presentCount}
              </h2>
            </div>

            <UserCheck
              size={40}
              className="text-green-600"
            />
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-500">Absent</p>
              <h2 className="text-3xl font-bold text-red-600 mt-2">
                {absentCount}
              </h2>
            </div>

            <UserX
              size={40}
              className="text-red-600"
            />
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-500">
                Late Arrivals
              </p>

              <h2 className="text-3xl font-bold text-yellow-600 mt-2">
                {lateCount}
              </h2>
            </div>

            <Clock
              size={40}
              className="text-yellow-600"
            />
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="relative flex-1">
            <Search
              size={18}
              className="absolute left-3 top-4 text-gray-400"
            />

            <input
              type="text"
              placeholder="Search employee..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <select className="border rounded-xl px-4 py-3">
            <option>All Status</option>
            <option>Present</option>
            <option>Absent</option>
            <option>Late</option>
          </select>

          <input
            type="date"
            className="border rounded-xl px-4 py-3"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-md overflow-hidden">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold">
            Attendance Records
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 border-b">
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
                  Status
                </th>
                <th className="p-4 text-left">
                  Check In
                </th>
                <th className="p-4 text-left">
                  Date
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredData.map((employee) => (
                <tr
                  key={employee.id}
                  className="border-b hover:bg-slate-50"
                >
                  <td className="p-4 font-medium">
                    {employee.id}
                  </td>

                  <td className="p-4">
                    {employee.name}
                  </td>

                  <td className="p-4">
                    {employee.department}
                  </td>

                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        employee.status === "Present"
                          ? "bg-green-100 text-green-700"
                          : employee.status === "Absent"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {employee.status}
                    </span>
                  </td>

                  <td className="p-4">
                    {employee.checkIn}
                  </td>

                  <td className="p-4">
                    {employee.date}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredData.length === 0 && (
            <div className="text-center py-10 text-gray-500">
              No attendance records found.
            </div>
          )}
        </div>
      </div>

      {/* Summary */}
      <div className="bg-white rounded-2xl shadow-md mt-8 p-6">
        <h2 className="text-xl font-semibold mb-4">
          Today's Attendance Summary
        </h2>

        <div className="mb-3 flex justify-between">
          <span>Attendance Rate</span>

          <span className="font-bold text-green-600">
            {attendanceRate}%
          </span>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-4">
          <div
            className="bg-green-500 h-4 rounded-full"
            style={{
              width: `${attendanceRate}%`,
            }}
          />
        </div>
      </div>
    </div>
  );
}