import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-950 text-white">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-6 border-b border-slate-800">
        <h1 className="text-2xl font-bold text-cyan-400">
          FaceTrack AI
        </h1>

        <div className="flex gap-4">
          <Link
            href="/dashboard"
            className="px-5 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-600 transition"
          >
            Dashboard
          </Link>

          <Link
            href="/camera"
            className="px-5 py-2 rounded-lg border border-cyan-500 hover:bg-cyan-500 transition"
          >
            Live Camera
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Content */}
          <div>
            <span className="bg-cyan-500/20 text-cyan-400 px-4 py-2 rounded-full text-sm">
              AI Powered Attendance Management
            </span>

            <h1 className="text-6xl font-extrabold mt-6 leading-tight">
              Smart Face Detection
              <span className="block text-cyan-400">
                Attendance System
              </span>
            </h1>

            <p className="text-slate-300 mt-6 text-lg leading-relaxed">
              Automate employee attendance using real-time facial
              recognition. Track attendance, manage employees,
              monitor live camera feeds, and generate reports
              instantly.
            </p>

            <div className="flex gap-4 mt-8">
              <Link
                href="/dashboard"
                className="bg-cyan-500 hover:bg-cyan-600 px-8 py-4 rounded-xl font-semibold"
              >
                Get Started
              </Link>

              <Link
                href="/employees"
                className="border border-slate-600 hover:border-cyan-500 px-8 py-4 rounded-xl"
              >
                View Employees
              </Link>
            </div>
          </div>

          {/* Right Side Card */}
          <div className="relative">
            <div className="bg-slate-800/60 backdrop-blur-lg border border-slate-700 rounded-3xl p-8 shadow-2xl">
              
              <div className="flex justify-between mb-6">
                <h3 className="text-xl font-bold">
                  System Overview
                </h3>

                <span className="bg-green-500 px-3 py-1 rounded-full text-sm">
                  Active
                </span>
              </div>

              <div className="grid grid-cols-2 gap-5">
                <div className="bg-slate-900 p-5 rounded-xl">
                  <h4 className="text-slate-400">
                    Employees
                  </h4>
                  <p className="text-3xl font-bold text-cyan-400">
                    1,250
                  </p>
                </div>

                <div className="bg-slate-900 p-5 rounded-xl">
                  <h4 className="text-slate-400">
                    Present Today
                  </h4>
                  <p className="text-3xl font-bold text-green-400">
                    1,180
                  </p>
                </div>

                <div className="bg-slate-900 p-5 rounded-xl">
                  <h4 className="text-slate-400">
                    Cameras
                  </h4>
                  <p className="text-3xl font-bold text-yellow-400">
                    24
                  </p>
                </div>

                <div className="bg-slate-900 p-5 rounded-xl">
                  <h4 className="text-slate-400">
                    Accuracy
                  </h4>
                  <p className="text-3xl font-bold text-purple-400">
                    99.8%
                  </p>
                </div>
              </div>

              <div className="mt-8 bg-slate-900 p-5 rounded-xl">
                <h4 className="mb-4 text-lg font-semibold">
                  Face Recognition Status
                </h4>

                <div className="w-full bg-slate-700 rounded-full h-4">
                  <div className="bg-cyan-500 h-4 rounded-full w-[99%]"></div>
                </div>

                <p className="mt-3 text-slate-400">
                  AI Detection Running Successfully
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-8 pb-20">
        <h2 className="text-4xl font-bold text-center mb-12">
          Features
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700">
            <h3 className="text-xl font-bold mb-4 text-cyan-400">
              Face Recognition
            </h3>
            <p className="text-slate-300">
              Detect and identify employees using advanced AI models.
            </p>
          </div>

          <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700">
            <h3 className="text-xl font-bold mb-4 text-green-400">
              Live Monitoring
            </h3>
            <p className="text-slate-300">
              View real-time camera feeds and attendance updates.
            </p>
          </div>

          <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700">
            <h3 className="text-xl font-bold mb-4 text-purple-400">
              Attendance Reports
            </h3>
            <p className="text-slate-300">
              Generate daily, weekly, and monthly attendance reports.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-6 text-center text-slate-400">
        © 2026 FaceTrack AI Attendance System. All Rights Reserved.
      </footer>
    </main>
  );
}
