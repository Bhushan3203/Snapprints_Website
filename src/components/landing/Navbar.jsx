import { Link } from "react-router-dom";

export default function Navbar({ onDemoClick }) {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 border-b border-white/10 bg-slate-950/70 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto flex h-20 items-center justify-between px-6">
        {/* Logo */}
        <div className="flex items-center gap-3 cursor-pointer">
          <img src="/images/logo.png" alt="SnapPrint Logo" width={50} height={50} className="rounded-lg" />
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white">
              Snap<span className="text-sky-400">Print</span>
            </h1>
            <p className="text-[11px] uppercase tracking-[0.25em] text-slate-400">Smart Printing</p>
          </div>
        </div>

        {/* Navigation */}
        <div className="hidden lg:flex items-center gap-10">
          <a href="#" className="relative text-white font-medium transition hover:text-sky-400">
            Home
            <span className="absolute -bottom-2 left-0 h-[2px] w-full bg-sky-400"></span>
          </a>
          <a href="#features" className="font-medium text-slate-300 transition hover:text-sky-400">
            Features
          </a>
          <a href="#how" className="font-medium text-slate-300 transition hover:text-sky-400">
            How It Works
          </a>
          <a href="#contact" className="font-medium text-slate-300 transition hover:text-sky-400">
            Contact
          </a>
        </div>

        {/* CTA Buttons */}
        <div className="hidden lg:flex items-center gap-3">
          <Link
            to="/login"
            className="flex items-center rounded-xl border border-slate-700 px-5 py-3 font-semibold text-slate-200 transition hover:border-sky-400 hover:text-sky-400"
          >
            Login
          </Link>
          <button
            onClick={onDemoClick}
            className="flex items-center rounded-xl bg-sky-500 px-6 py-3 font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-sky-400 hover:shadow-lg hover:shadow-sky-500/40"
          >
            Request Demo
          </button>
        </div>
      </div>
    </nav>
  );
}
