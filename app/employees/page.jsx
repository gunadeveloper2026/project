"use client";

import { useState, useEffect, useRef } from "react";
import Webcam from "react-webcam";
import axios from "axios";

export default function EmployeesPage() {
  const webcamRef = useRef(null);

  const [employees, setEmployees] = useState([]);
  const [imageSrc, setImageSrc] = useState(null);

  const [employee, setEmployee] = useState({
    employee_id: "",
    full_name: "",
    department: "",
    designation: "",
    phone: "",
  });

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/employees/");
      setEmployees(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const captureFace = () => {
    const image = webcamRef.current.getScreenshot();
    setImageSrc(image);
  };

  const saveEmployee = async () => {
    try {
      await axios.post("http://127.0.0.1:8000/employees/register", {
        ...employee,
        image: imageSrc,
      });

      alert("Employee Registered Successfully");

      fetchEmployees();

      setEmployee({
        employee_id: "",
        full_name: "",
        department: "",
        designation: "",
        phone: "",
      });

      setImageSrc(null);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-6">

      {/* Header */}
      <h1 className="text-4xl font-bold mb-8 text-center text-cyan-300">
        Employee Face Recognition System
      </h1>

      <div className="grid lg:grid-cols-2 gap-8">

        {/* ================= FORM ================= */}
        <div className="bg-slate-800/60 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-slate-700">

          <h2 className="text-2xl font-semibold mb-5 text-cyan-400">
            Register Employee
          </h2>

          {["employee_id", "full_name", "department", "designation", "phone"].map((field) => (
            <input
              key={field}
              placeholder={field.replace("_", " ").toUpperCase()}
              className="w-full border border-slate-600 bg-slate-900 text-white p-3 rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              value={employee[field]}
              onChange={(e) =>
                setEmployee({ ...employee, [field]: e.target.value })
              }
            />
          ))}

          <button
            onClick={saveEmployee}
            className="w-full bg-cyan-500 hover:bg-cyan-600 transition-all text-white px-5 py-3 rounded-lg font-semibold mt-2"
          >
            Register Employee
          </button>
        </div>

        {/* ================= CAMERA ================= */}
        <div className="bg-slate-800/60 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-slate-700">

          <h2 className="text-2xl font-semibold mb-5 text-green-400">
            Face Capture
          </h2>

          <Webcam
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            className="rounded-xl w-full border border-slate-600"
          />

          <button
            onClick={captureFace}
            className="w-full bg-green-500 hover:bg-green-600 transition-all text-white px-5 py-3 rounded-lg font-semibold mt-4"
          >
            Capture Face
          </button>

          {imageSrc && (
            <div className="mt-4">
              <p className="text-sm text-gray-300 mb-2">Preview:</p>
              <img
                src={imageSrc}
                alt="preview"
                className="rounded-xl border border-slate-600"
              />
            </div>
          )}
        </div>
      </div>

      {/* ================= TABLE ================= */}
      <div className="mt-10 bg-slate-800/60 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-slate-700">

        <h2 className="text-2xl font-semibold mb-5 text-yellow-300">
          Employees List
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-600 text-slate-300">
                <th className="p-3">Employee ID</th>
                <th className="p-3">Name</th>
                <th className="p-3">Department</th>
                <th className="p-3">Designation</th>
                <th className="p-3">Phone</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>

            <tbody>
              {employees.map((emp) => (
                <tr
                  key={emp.id}
                  className="border-b border-slate-700 hover:bg-slate-700/40 transition"
                >
                  <td className="p-3">{emp.employee_id}</td>
                  <td className="p-3 font-medium text-cyan-300">{emp.full_name}</td>
                  <td className="p-3">{emp.department}</td>
                  <td className="p-3">{emp.designation}</td>
                  <td className="p-3">{emp.phone}</td>

                  <td className="p-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        emp.status === "Active"
                          ? "bg-green-500/20 text-green-400"
                          : "bg-red-500/20 text-red-400"
                      }`}
                    >
                      {emp.status || "Active"}
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