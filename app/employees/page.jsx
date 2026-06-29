"use client";

import { useRef, useState } from "react";
import Webcam from "react-webcam";
import axios from "axios";

export default function EmployeesPage() {
  const webcamRef = useRef(null);

  const [loading, setLoading] = useState(false);
  const [employee, setEmployee] = useState(null);
  const [message, setMessage] = useState("");

  const recognizeFace = async () => {
    if (!webcamRef.current) {
      alert("Camera not available");
      return;
    }

    const image = webcamRef.current.getScreenshot();

    if (!image) {
      alert("Unable to capture image.");
      return;
    }

    try {
      setLoading(true);
      setEmployee(null);
      setMessage("");

      const res = await axios.post(
        "http://127.0.0.1:8000/employees/recognize",
        {
          image: image,
        }
      );

      if (res.data.success) {
        setEmployee(res.data.employee);
        setMessage("✅ Employee Recognized");
      } else {
        setMessage("❌ Unknown Face");
      }
    } catch (error) {
      console.error(error);
      setMessage("Recognition Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex justify-center items-center p-8">

      <div className="w-full max-w-6xl bg-slate-800 rounded-2xl shadow-2xl p-8">

        <h1 className="text-4xl font-bold text-center text-cyan-400 mb-8">
          Face Recognition System
        </h1>

        <div className="grid lg:grid-cols-2 gap-8">

          {/* Webcam */}

          <div>

            <Webcam
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              mirrored
              className="rounded-xl border border-slate-600 w-full"
              videoConstraints={{
                width: 640,
                height: 480,
                facingMode: "user",
              }}
            />

            <button
              onClick={recognizeFace}
              disabled={loading}
              className={`mt-5 w-full py-3 rounded-lg text-lg font-semibold transition ${
                loading
                  ? "bg-gray-600 cursor-not-allowed"
                  : "bg-cyan-500 hover:bg-cyan-600"
              } text-white`}
            >
              {loading ? "Recognizing..." : "Recognize Face"}
            </button>

          </div>

          {/* Result */}

          <div className="bg-slate-900 rounded-xl p-6 border border-slate-700">

            <h2 className="text-2xl font-semibold text-cyan-300 mb-5">
              Recognition Result
            </h2>

            {message && (
              <div className="mb-5 p-3 rounded-lg bg-slate-800 text-white">
                {message}
              </div>
            )}

            {!employee && !loading && (
              <div className="text-gray-400 text-center mt-20">
                Capture a face to recognize an employee.
              </div>
            )}

            {employee && (
              <div className="space-y-4">

                <div className="flex justify-center">

                  <img
                    src={
                      employee.photo_url
                        ? employee.photo_url
                        : "https://via.placeholder.com/180"
                    }
                    alt={employee.full_name}
                    className="w-44 h-44 rounded-full object-cover border-4 border-cyan-500"
                  />

                </div>

                <div className="space-y-3 text-white">

                  <div className="flex justify-between">
                    <span className="font-semibold">Employee ID</span>
                    <span>{employee.employee_id}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="font-semibold">Name</span>
                    <span>{employee.full_name}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="font-semibold">Department</span>
                    <span>{employee.department}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="font-semibold">Designation</span>
                    <span>{employee.designation}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="font-semibold">Email</span>
                    <span>{employee.email}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="font-semibold">Phone</span>
                    <span>{employee.phone}</span>
                  </div>

                </div>

              </div>
            )}

          </div>

        </div>

      </div>

    </div>
  );
}