export default function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 text-white">
      <div className="max-w-7xl mx-auto px-6 py-14 grid md:grid-cols-4 gap-10">
        {/* Logo */}
        <div>
          <div className="flex items-center gap-3">
            <img src="/images/logo.png" alt="SnapPrint" width={45} height={45} />
            <div>
              <h3 className="text-2xl font-bold">
                Snap<span className="text-sky-400">Print</span>
              </h3>
              <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Smart Printing</p>
            </div>
          </div>
          <p className="text-slate-400 mt-6 leading-7">
            India&apos;s next-generation self-service printing solution designed for colleges, offices, hospitals and
            public spaces.
          </p>
        </div>

        {/* Company */}
        <div>
          <h4 className="font-semibold text-lg mb-5">Company</h4>
          <ul className="space-y-3 text-slate-400">
            <li><a href="#">Home</a></li>
            <li><a href="#features">Features</a></li>
            <li><a href="#how">How It Works</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>

        {/* Solutions */}
        <div>
          <h4 className="font-semibold text-lg mb-5">Solutions</h4>
          <ul className="space-y-3 text-slate-400">
            <li>Colleges</li>
            <li>Corporate Offices</li>
            <li>Hospitals</li>
            <li>Libraries</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-semibold text-lg mb-5">Contact</h4>
          <ul className="space-y-3 text-slate-400">
            <li>📧 hello@snapprint.in</li>
            <li>📞 +91 XXXXX XXXXX</li>
            <li>📍 Navi Mumbai</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-slate-800 py-6 text-center text-slate-500 text-sm">
        © 2026 SnapPrint. All Rights Reserved.
      </div>
    </footer>
  );
}
