import StatsCard from "@/components/StatsCard";

export default function Dashboard() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-3 gap-4">
        <StatsCard title="Employees" value="150" />
        <StatsCard title="Present" value="120" />
        <StatsCard title="Absent" value="30" />
      </div>
    </div>
  );
}