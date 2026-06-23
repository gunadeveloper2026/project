"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import {
  Camera,
  Users,
  UserX,
  ScanFace,
  Database,
  ShieldCheck,
} from "lucide-react";

import CameraFeed from "@/components/CameraFeed";

export default function CameraPage() {
  const [cameraData, setCameraData] = useState({
    employeesPresent: 0,
    employeesAbsent: 0,
    facesDetected: 0,
    accuracy: 0,
    recognitionStatus: "Loading...",
    databaseStatus: "Checking...",
    lastDetected: "N/A",
    detectionTime: "N/A",
    logs: [],
    cameraActive: false,
  });

  const [loading, setLoading] = useState(true);
  const [isStreaming, setIsStreaming] = useState(false);

  useEffect(() => {
    fetchCameraData();

    const interval = setInterval(() => {
      fetchCameraData();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const fetchCameraData = async () => {
    try {
      const res = await axios.get(
        "http://127.0.0.1:8000/camera/"
      );

      console.log("Camera API:", res.data);

      if (res.data.success === false) {
        console.error(res.data.error);
        return;
      }

      setCameraData(res.data);
      setIsStreaming(res.data.cameraActive);
    } catch (error) {
      console.error("Camera API Error:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center text-2xl font-bold">
        Loading Camera Dashboard...
      </div>
    );
  }

  return (
  <div className="min-h-screen bg-[#0B1120] text-white p-6">

    {/* Header */}
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 mb-6">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">

        <div>
          <h1 className="text-3xl font-bold">
            Face Detection Dashboard
          </h1>

          <p className="text-slate-400 mt-1">
            Employee Attendance Monitoring System
          </p>
        </div>

        <div className="flex items-center gap-2 bg-green-500/10 border border-green-500/20 px-4 py-2 rounded-lg">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>

          <span className="text-green-400 font-medium">
            System Online
          </span>
        </div>

      </div>
    </div>

    {/* Status */}
    <div className="flex items-center gap-2 mb-6">
      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>

      <span className="text-green-400 text-sm font-medium">
        Live Monitoring Active
      </span>
    </div>

    {/* Stats */}
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-6">

      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-slate-400 text-sm">
              Present Today
            </p>

            <h2 className="text-3xl font-bold mt-2">
              {cameraData.employeesPresent}
            </h2>
          </div>

          <Users size={28} className="text-green-500" />
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-slate-400 text-sm">
              Absent Today
            </p>

            <h2 className="text-3xl font-bold mt-2">
              {cameraData.employeesAbsent}
            </h2>
          </div>

          <UserX size={28} className="text-red-500" />
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-slate-400 text-sm">
              Faces Detected
            </p>

            <h2 className="text-3xl font-bold mt-2">
              {cameraData.facesDetected}
            </h2>
          </div>

          <ScanFace size={28} className="text-blue-500" />
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-slate-400 text-sm">
              Accuracy
            </p>

            <h2 className="text-3xl font-bold mt-2">
              {cameraData.accuracy}%
            </h2>
          </div>

          <Camera size={28} className="text-purple-500" />
        </div>
      </div>

    </div>

    {/* Camera + Status */}
    <div className="grid lg:grid-cols-3 gap-6">

      {/* Camera */}
      <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">

        <div className="flex justify-between items-center p-5 border-b border-slate-800">

          <div>
            <h2 className="text-xl font-semibold">
              Live Camera Feed
            </h2>

            <p className="text-slate-400 text-sm">
              Real-Time Face Recognition
            </p>
          </div>

          <button
            onClick={() => setIsStreaming(!isStreaming)}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              isStreaming
                ? "bg-red-500 hover:bg-red-600"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {isStreaming ? "Stop Camera" : "Start Camera"}
          </button>

        </div>

        <div className="p-4">

          <div className="rounded-xl overflow-hidden border border-slate-700 bg-black">

            {isStreaming ? (
              <CameraFeed />
            ) : (
              <div className="h-[550px] flex items-center justify-center">
                <p className="text-slate-500 text-lg">
                  Camera Offline
                </p>
              </div>
            )}

          </div>

        </div>

      </div>

      {/* Status Panel */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">

        <h2 className="text-xl font-semibold mb-5">
          Detection Status
        </h2>

        <div className="space-y-4">

          <div className="bg-green-500/10 border border-green-500/20 p-4 rounded-xl">
            <div className="flex gap-3">
              <ShieldCheck className="text-green-400" />
              <div>
                <p className="font-medium">
                  Face Recognition
                </p>

                <p className="text-green-400 text-sm">
                  {cameraData.recognitionStatus}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-blue-500/10 border border-blue-500/20 p-4 rounded-xl">
            <div className="flex gap-3">
              <Database className="text-blue-400" />
              <div>
                <p className="font-medium">
                  Database
                </p>

                <p className="text-blue-400 text-sm">
                  {cameraData.databaseStatus}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-slate-800 rounded-xl p-4">
            <p className="text-slate-400 text-sm">
              Last Detected Employee
            </p>

            <h3 className="text-2xl font-bold mt-2">
              {cameraData.lastDetected}
            </h3>
          </div>

          <div className="bg-slate-800 rounded-xl p-4">
            <p className="text-slate-400 text-sm">
              Detection Time
            </p>

            <h3 className="text-xl font-semibold mt-2">
              {cameraData.detectionTime}
            </h3>
          </div>

        </div>

      </div>

    </div>

    {/* Attendance Logs */}
    <div className="bg-slate-900 border border-slate-800 rounded-xl mt-6 overflow-hidden">

      <div className="flex justify-between items-center p-5 border-b border-slate-800">

        <h2 className="text-xl font-semibold">
          Recent Attendance Logs
        </h2>

        <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg">
          View All
        </button>

      </div>

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead>
            <tr className="bg-slate-800">
              <th className="p-4 text-left">Employee ID</th>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Time</th>
              <th className="p-4 text-left">Status</th>
            </tr>
          </thead>

          <tbody>

            {cameraData.logs?.length > 0 ? (
              cameraData.logs.map((log, index) => (
                <tr
                  key={index}
                  className="border-b border-slate-800 hover:bg-slate-800/50"
                >
                  <td className="p-4">{log.employeeId}</td>
                  <td className="p-4">{log.name}</td>
                  <td className="p-4">{log.time}</td>

                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        log.status === "Present"
                          ? "bg-green-500/20 text-green-400"
                          : "bg-red-500/20 text-red-400"
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
                  colSpan={4}
                  className="text-center p-10 text-slate-500"
                >
                  No Attendance Records Found
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