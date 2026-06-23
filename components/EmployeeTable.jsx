"use client";

import { Eye, Pencil, Trash2 } from "lucide-react";

const employees = [
  {
    id: "EMP001",
    name: "John Doe",
    department: "IT",
    email: "john@company.com",
    status: "Active",
  },
  {
    id: "EMP002",
    name: "Jane Smith",
    department: "HR",
    email: "jane@company.com",
    status: "Active",
  },
];

export default function EmployeeTable({ search }) {
  const filteredEmployees = employees.filter(
    (employee) =>
      employee.name
        .toLowerCase()
        .includes((search || "").toLowerCase()) ||
      employee.id
        .toLowerCase()
        .includes((search || "").toLowerCase())
  );

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        {/* your table code */}
      </table>
    </div>
  );
}