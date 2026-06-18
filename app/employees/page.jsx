import EmployeeTable from "@/components/EmployeeTable";

export default function Employees() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">
        Employees
      </h1>

      <EmployeeTable />
    </div>
  );
}