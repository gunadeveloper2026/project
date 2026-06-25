"use client";

import { useState } from "react";
import axios from "axios";
import {
  User,
  Building2,
  Briefcase,
  Phone,
  Camera,
  Save,
} from "lucide-react";

export default function AddEmployee() {
  const [loading, setLoading] = useState(false);

  const [preview, setPreview] = useState(null);

  const [employee, setEmployee] = useState({
    employee_id: "",
    full_name: "",
    department: "",
    designation: "",
    phone: "",
  });

  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append(
        "employee_id",
        employee.employee_id
      );

      formData.append(
        "full_name",
        employee.full_name
      );

      formData.append(
        "department",
        employee.department
      );

      formData.append(
        "designation",
        employee.designation
      );

      formData.append(
        "phone",
        employee.phone
      );

      formData.append(
        "image",
        image
      );

await axios.post(
  "http://127.0.0.1:8000/employees/register",
  formData,
  {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  }
);

      alert("Employee Registered Successfully");

      setEmployee({
        employee_id: "",
        full_name: "",
        department: "",
        designation: "",
        phone: "",
      });

      setImage(null);
      setPreview(null);
    } catch (error) {
      console.error(error);

      alert("Registration Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="max-w-6xl mx-auto">

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900">
            Employee Registration
          </h1>

          <p className="text-gray-600 mt-2">
            Register employee and save
            face image for recognition
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">

          {/* Form */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-md p-6">

            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >

              <div>
                <label className="font-medium text-slate-800">
                  Employee ID
                </label>

                <div className="relative mt-2">
                  <User
                    className="absolute left-3 top-3 text-gray-400"
                    size={18}
                  />

                  <input
                    type="text"
                    value={employee.employee_id}
                    onChange={(e) =>
                      setEmployee({
                        ...employee,
                        employee_id:
                          e.target.value,
                      })
                    }
                    className="w-full border border-gray-300 rounded-lg p-3 bg-white text-slate-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="EMP001"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="font-medium text-slate-800">
                  Full Name
                </label>

                <input
                  type="text"
                  value={employee.full_name}
                  onChange={(e) =>
                    setEmployee({
                      ...employee,
                      full_name:
                        e.target.value,
                    })
                  }
                  className="w-full border border-gray-300 rounded-lg p-3 bg-white text-slate-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Employee Name"
                  required
                />
              </div>

              <div>
                <label className="font-medium text-slate-800">
                  Department
                </label>

                <select
                  value={employee.department}
                  onChange={(e) =>
                    setEmployee({
                      ...employee,
                      department:
                        e.target.value,
                    })
                  }
                  className="w-full border border-gray-300 rounded-lg p-3 bg-white text-slate-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">
                    Select Department
                  </option>

                  <option>IT</option>
                  <option>HR</option>
                  <option>Finance</option>
                  <option>Admin</option>
                  <option>Operations</option>
                </select>
              </div>

              <div>
                <label className="font-medium text-slate-800">
                  Designation
                </label>

                <input
                  type="text"
                  value={employee.designation}
                  onChange={(e) =>
                    setEmployee({
                      ...employee,
                      designation:
                        e.target.value,
                    })
                  }
                  className="w-full border border-gray-300 rounded-lg p-3 bg-white text-slate-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Software Engineer"
                />
              </div>

              <div>
                <label className="font-medium text-slate-800">
                  Phone Number
                </label>

                <input
                  type="text"
                  value={employee.phone}
                  onChange={(e) =>
                    setEmployee({
                      ...employee,
                      phone:
                        e.target.value,
                    })
                  }
                  className="w-full border border-gray-300 rounded-lg p-3 bg-white text-slate-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="font-medium text-slate-800">
                  Face Image
                </label>

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                    className="w-full border border-gray-300 rounded-lg p-3 bg-white text-slate-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center gap-2"
              >
                <Save size={18} />

                {loading
                  ? "Saving..."
                  : "Register Employee"}
              </button>

            </form>
          </div>

          {/* Preview */}
          <div className="bg-white rounded-2xl shadow-md p-6">

            <h2 className="text-xl font-bold text-slate-900 mb-4">
              Face Preview
            </h2>

            {preview ? (
              <img
                src={preview}
                alt="preview"
                className="w-full h-80 object-cover rounded-xl"
              />
            ) : (
              <div className="h-80 flex items-center justify-center bg-slate-100 rounded-xl">
                <Camera
                  size={70}
                  className="text-gray-400"
                />
              </div>
            )}

            <div className="mt-4 bg-blue-50 border border-blue-200 p-4 rounded-lg text-slate-900">
              <p className="font-semibold">
                Employee ID:
              </p>
              <p>{employee.employee_id}</p>

              <p className="font-semibold mt-3">
                Name:
              </p>
              <p>{employee.full_name}</p>

              <p className="font-semibold mt-3">
                Department:
              </p>
              <p>{employee.department}</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}