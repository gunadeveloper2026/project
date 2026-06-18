export default function Attendance() {
  const data = [
    {
      id: 1,
      name: "John",
      status: "Present",
      date: "18-06-2026"
    },
    {
      id: 2,
      name: "David",
      status: "Absent",
      date: "18-06-2026"
    }
  ];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">
        Attendance Records
      </h1>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th>ID</th>
            <th>Name</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.status}</td>
              <td>{item.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}