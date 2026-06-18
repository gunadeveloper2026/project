import CameraFeed from "@/components/CameraFeed";

export default function CameraPage() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">
        Live Camera
      </h1>

      <CameraFeed />
    </div>
  );
}