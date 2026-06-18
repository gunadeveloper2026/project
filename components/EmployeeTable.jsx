export default function EmployeeTable() {
  const employees = [
    {
      id: 1,
      name: "John",
      department: "IT"
    },
    {
      id: 2,
      name: "David",
      department: "HR"
    }
  ];

  return (
    <table className="w-full border">
      <thead>
        <tr className="bg-gray-200">
          <th>ID</th>
          <th>Name</th>
          <th>Department</th>
        </tr>
      </thead>

      <tbody>
        {employees.map((emp) => (
          <tr key={emp.id}>
            <td>{emp.id}</td>
            <td>{emp.name}</td>
            <td>{emp.department}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}