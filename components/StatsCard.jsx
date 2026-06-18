export default function StatsCard({ title, value }) {
  return (
    <div className="bg-white shadow-lg rounded-lg p-5">
      <h2 className="text-lg font-semibold">
        {title}
      </h2>

      <p className="text-3xl font-bold mt-2">
        {value}
      </p>
    </div>
  );
}