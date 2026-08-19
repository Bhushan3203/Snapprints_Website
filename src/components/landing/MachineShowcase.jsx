import { CheckCircle, Smartphone, ShieldCheck, Wifi, CreditCard, Printer } from "lucide-react";

export default function MachineShowcase() {
  return (
    <section className="bg-gradient-to-b from-slate-950 to-slate-900 py-28 text-white">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
        {/* Machine Image */}
        <div className="relative flex justify-center">
          <div className="absolute w-96 h-96 rounded-full bg-sky-500/20 blur-[120px]" />
          <img
            src="/images/machine.png"
            alt="SnapPrint Machine"
            width={420}
            height={720}
            className="relative hover:scale-105 transition duration-500 drop-shadow-[0_0_40px_rgba(14,165,233,0.35)]"
          />
        </div>

        {/* Content */}
        <div>
          <p className="text-sky-400 uppercase tracking-[0.35em] font-semibold">Smart Printing Kiosk</p>
          <h2 className="text-5xl font-bold mt-5 leading-tight">
            Built for the
            <span className="text-sky-400"> Future of Printing</span>
          </h2>
          <p className="mt-8 text-slate-400 text-lg leading-8">
            SnapPrint is an intelligent self-service printing kiosk that enables users to upload documents, pay
            digitally and print instantly without any human assistance.
          </p>

          {/* Features */}
          <div className="grid grid-cols-2 gap-5 mt-10">
            <div className="flex items-center gap-3">
              <CheckCircle className="text-sky-400" size={20} />
              <span>QR Code Printing</span>
            </div>
            <div className="flex items-center gap-3">
              <Smartphone className="text-sky-400" size={20} />
              <span>Mobile Upload</span>
            </div>
            <div className="flex items-center gap-3">
              <CreditCard className="text-sky-400" size={20} />
              <span>UPI Payments</span>
            </div>
            <div className="flex items-center gap-3">
              <Printer className="text-sky-400" size={20} />
              <span>Instant Printing</span>
            </div>
            <div className="flex items-center gap-3">
              <ShieldCheck className="text-sky-400" size={20} />
              <span>Secure Documents</span>
            </div>
            <div className="flex items-center gap-3">
              <Wifi className="text-sky-400" size={20} />
              <span>Cloud Connected</span>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-5 mt-14">
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 text-center">
              <h3 className="text-3xl font-bold text-sky-400">24×7</h3>
              <p className="text-slate-400 mt-2 text-sm">Available</p>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 text-center">
              <h3 className="text-3xl font-bold text-sky-400">100%</h3>
              <p className="text-slate-400 mt-2 text-sm">Contactless</p>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 text-center">
              <h3 className="text-3xl font-bold text-sky-400">UPI</h3>
              <p className="text-slate-400 mt-2 text-sm">Enabled</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
