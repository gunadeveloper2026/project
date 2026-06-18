import Link from "next/link";

export default function Sidebar() {
  return (
    <div className="w-64 bg-gray-800 text-white min-h-screen p-4">
      <ul className="space-y-4">
        <li>
          <Link href="/dashboard">Dashboard</Link>
        </li>

        <li>
          <Link href="/employees">Employees</Link>
        </li>

        <li>
          <Link href="/attendance">Attendance</Link>
        </li>

        <li>
          <Link href="/camera">Camera</Link>
        </li>
      </ul>
    </div>
  );
}