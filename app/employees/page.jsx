"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import {
  Users,
  Search,
  UserCheck,
  UserX,
} from "lucide-react";

export default function EmployeesPage() {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      console.log("Calling API...");

      const res = await axios.get(
        "http://127.0.0.1:8000/employees/"
      );

      console.log("API Response:", res.data);

      // Ensure employees is always an array
      if (Array.isArray(res.data)) {
        setEmployees(res.data);
      } else if (Array.isArray(res.data.employees)) {
        setEmployees(res.data.employees);
      } else {
        console.error("API did not return an array");
        setEmployees([]);
      }
    } catch (error) {
      console.error("Employee API Error:", error);
      setEmployees([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredEmployees = employees.filter((emp) =>
    (emp.full_name || emp.name || "")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const activeEmployees = employees.filter(
    (emp) => emp.status === "Active"
  ).length;

  const inactiveEmployees = employees.filter(
    (emp) => emp.status === "Inactive"
  ).length;

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0B1120] flex items-center justify-center text-white text-2xl">
        Loading Employees...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B1120] text-white p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold">
          Employee Management
        </h1>

        <p className="text-slate-400 mt-2">
          Employees fetched from MySQL database
        </p>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">

        <div className="bg-slate-900 p-6 rounded-xl">
          <div className="flex justify-between">
            <div>
              <p>Total Employees</p>
              <h2 className="text-3xl font-bold">
                {employees.length}
              </h2>
            </div>
            <Users className="text-blue-500" />
          </div>
        </div>

        <div className="bg-slate-900 p-6 rounded-xl">
          <div className="flex justify-between">
            <div>
              <p>Active Employees</p>
              <h2 className="text-3xl font-bold text-green-500">
                {activeEmployees}
              </h2>
            </div>
            <UserCheck className="text-green-500" />
          </div>
        </div>

        <div className="bg-slate-900 p-6 rounded-xl">
          <div className="flex justify-between">
            <div>
              <p>Inactive Employees</p>
              <h2 className="text-3xl font-bold text-red-500">
                {inactiveEmployees}
              </h2>
            </div>
            <UserX className="text-red-500" />
          </div>
        </div>

      </div>

      {/* Search */}
      <div className="mb-6 relative">
        <Search
          size={18}
          className="absolute left-3 top-3 text-gray-400"
        />

        <input
          type="text"
          placeholder="Search employee..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-10 py-3 px-4"
        />
      </div>

      {/* Table */}
      <div className="bg-slate-900 rounded-xl overflow-hidden">

        <table className="w-full">

          <thead className="bg-slate-800">
            <tr>
              <th className="p-4 text-left">ID</th>
              <th className="p-4 text-left">Employee ID</th>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Department</th>
              <th className="p-4 text-left">Status</th>
            </tr>
          </thead>

          <tbody>

            {filteredEmployees.length > 0 ? (
              filteredEmployees.map((emp) => (
                <tr
                  key={emp.id}
                  className="border-t border-slate-800"
                >
                  <td className="p-4">{emp.id}</td>

                  <td className="p-4">
                    {emp.employee_id}
                  </td>

                  <td className="p-4">
                    {emp.full_name || emp.name}
                  </td>

                  <td className="p-4">
                    {emp.department}
                  </td>

                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        emp.status === "Active"
                          ? "bg-green-500/20 text-green-400"
                          : "bg-red-500/20 text-red-400"
                      }`}
                    >
                      {emp.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="text-center py-8 text-slate-400"
                >
                  No Employees Found
                </td>
              </tr>
            )}

          </tbody>

        </table>

      </div>
    </div>
  );
}