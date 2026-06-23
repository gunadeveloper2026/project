import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-black text-white">

      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/90 backdrop-blur-lg border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 h-20 flex items-center justify-between">

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-cyan-500 flex items-center justify-center">
              <span className="font-bold text-black text-lg">
                CI
              </span>
            </div>

            <div>
              <h1 className="font-bold text-cyan-400 text-xl">
                GI Infotech
              </h1>

              <p className="text-xs text-slate-400">
                Attendance System
              </p>
            </div>
          </div>

          <div className="hidden md:flex gap-8 font-medium">
            <Link href="/" className="hover:text-cyan-400 transition">
              Home
            </Link>

            <Link href="/dashboard" className="hover:text-cyan-400 transition">
              Dashboard
            </Link>

            <Link href="/employees" className="hover:text-cyan-400 transition">
              Employees
            </Link>

            <Link href="/camera" className="hover:text-cyan-400 transition">
              Camera
            </Link>
          </div>

          <Link
            href="/dashboard"
            className="hidden md:block bg-cyan-500 hover:bg-cyan-600 px-5 py-2 rounded-xl font-semibold transition"
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-36 pb-24">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">

          <div className="text-center">

            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20">

              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>

              <span className="text-cyan-400 font-medium">
                AI Detection System Online
              </span>

            </div>

            <h1 className="mt-8 text-5xl md:text-7xl font-black leading-tight">
              Smart Face
              <span className="block text-cyan-400">
                Attendance System
              </span>
            </h1>

            <p className="mt-8 max-w-3xl mx-auto text-lg text-slate-400">
              Modern attendance management powered by Artificial Intelligence.
              Detect employees instantly, monitor attendance in real-time,
              manage records and generate reports with high accuracy.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-5 mt-10">

              <Link
                href="/dashboard"
                className="bg-cyan-500 hover:bg-cyan-600 px-8 py-4 rounded-xl font-semibold transition"
              >
                Open Dashboard
              </Link>

              <Link
                href="/camera"
                className="border border-cyan-500 hover:bg-cyan-500/10 px-8 py-4 rounded-xl transition"
              >
                Live Camera Feed
              </Link>

            </div>

          </div>

        </div>
      </section>

      {/* Stats Section */}
      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

            <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl">
              <h3 className="text-slate-400">
                Employees
              </h3>

              <p className="text-5xl font-bold text-cyan-400 mt-3">
                1250
              </p>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl">
              <h3 className="text-slate-400">
                Present Today
              </h3>

              <p className="text-5xl font-bold text-green-400 mt-3">
                1180
              </p>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl">
              <h3 className="text-slate-400">
                Cameras
              </h3>

              <p className="text-5xl font-bold text-yellow-400 mt-3">
                24
              </p>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl">
              <h3 className="text-slate-400">
                Accuracy
              </h3>

              <p className="text-5xl font-bold text-purple-400 mt-3">
                99.8%
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* Live Preview Section */}
      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">

          <div className="grid lg:grid-cols-2 gap-10">

            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">

              <div className="flex justify-between items-center mb-6">

                <h2 className="text-2xl font-bold">
                  Live Camera Status
                </h2>

                <span className="bg-green-500/20 text-green-400 px-4 py-1 rounded-full">
                  Active
                </span>

              </div>

              <div className="h-72 bg-slate-800 rounded-2xl flex items-center justify-center text-slate-400">
                Camera Preview
              </div>

            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">

              <h2 className="text-2xl font-bold mb-6">
                Face Recognition Status
              </h2>

              <div className="space-y-6">

                <div>
                  <p className="text-slate-400 mb-2">
                    Detection Accuracy
                  </p>

                  <div className="w-full h-4 bg-slate-700 rounded-full">
                    <div className="w-[99%] h-4 bg-cyan-500 rounded-full"></div>
                  </div>
                </div>

                <div>
                  <p className="text-slate-400 mb-2">
                    System Health
                  </p>

                  <div className="w-full h-4 bg-slate-700 rounded-full">
                    <div className="w-full h-4 bg-green-500 rounded-full"></div>
                  </div>
                </div>

                <div>
                  <p className="text-slate-400">
                    Last Detection
                  </p>

                  <h3 className="text-xl font-bold mt-2 text-cyan-400">
                    EMP001 - John Doe
                  </h3>
                </div>

              </div>

            </div>

          </div>

        </div>
      </section>

      {/* Features */}
      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">

          <h2 className="text-5xl font-bold text-center mb-16">
            Enterprise Features
          </h2>

          <div className="grid md:grid-cols-3 gap-8">

            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 hover:border-cyan-500 transition">
              <h3 className="text-2xl font-bold text-cyan-400 mb-4">
                Face Recognition
              </h3>

              <p className="text-slate-400">
                AI-powered employee recognition with real-time detection.
              </p>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 hover:border-green-500 transition">
              <h3 className="text-2xl font-bold text-green-400 mb-4">
                Live Monitoring
              </h3>

              <p className="text-slate-400">
                Monitor camera feeds and attendance records instantly.
              </p>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 hover:border-purple-500 transition">
              <h3 className="text-2xl font-bold text-purple-400 mb-4">
                Reports & Analytics
              </h3>

              <p className="text-slate-400">
                Generate attendance reports and employee analytics.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-950">

        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-12">

          <div className="grid md:grid-cols-3 gap-10">

            <div>
              <h2 className="text-cyan-400 font-bold text-2xl">
                FaceTrack AI
              </h2>

              <p className="text-slate-400 mt-4">
                AI Powered Face Detection Attendance System
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">
                Quick Links
              </h3>

              <div className="flex flex-col gap-2 text-slate-400">
                <Link href="/">Home</Link>
                <Link href="/dashboard">Dashboard</Link>
                <Link href="/employees">Employees</Link>
                <Link href="/camera">Camera</Link>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">
                Technology Stack
              </h3>

              <div className="flex flex-col gap-2 text-slate-400">
                <span>Next.js</span>
                <span>Python FastAPI</span>
                <span>MySQL</span>
                <span>AI Face Recognition</span>
              </div>
            </div>

          </div>

          <div className="border-t border-slate-800 mt-10 pt-6 text-center text-slate-500">
            © 2026 FaceTrack AI • Powered by Next.js, FastAPI & AI Recognition
          </div>

        </div>

      </footer>

    </main>
  );
}
