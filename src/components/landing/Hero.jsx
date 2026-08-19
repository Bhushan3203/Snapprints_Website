export default function Hero({ onDemoClick }) {
  return (
    <section className="relative min-h-screen bg-slate-950 text-white overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-sky-500/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[150px]" />

      <div className="relative max-w-7xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-16 items-center">
        {/* Left Content */}
        <div>
          <span className="inline-block bg-sky-500/10 border border-sky-500/30 text-sky-300 px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-wider">
            India&apos;s Smart Self-Service Printing Machine
          </span>

          <h1 className="text-5xl md:text-7xl font-extrabold mt-8 leading-tight">
            Print
            <span className="text-sky-400"> Smarter</span>
            <br />
            Anytime.
            <br />
            Anywhere.
          </h1>

          <p className="mt-8 text-lg text-slate-300 leading-8 max-w-xl">
            Upload documents from your phone, pay securely using UPI, and collect your prints instantly from the
            SnapPrint kiosk.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <button
              onClick={onDemoClick}
              className="bg-sky-500 hover:bg-sky-400 transition px-8 py-4 rounded-xl font-semibold shadow-lg shadow-sky-500/30"
            >
              Request Demo
            </button>

            <button className="border border-slate-700 hover:border-sky-400 transition px-8 py-4 rounded-xl font-semibold">
              Learn More
            </button>
          </div>

          {/* Stats */}
          <div className="mt-14 grid grid-cols-3 gap-8">
            <div>
              <h3 className="text-3xl font-bold text-sky-400">24×7</h3>
              <p className="text-slate-400 mt-2">Available</p>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-sky-400">100%</h3>
              <p className="text-slate-400 mt-2">Contactless</p>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-sky-400">60 Sec</h3>
              <p className="text-slate-400 mt-2">Average Print</p>
            </div>
          </div>
        </div>

        {/* Right Image */}
        <div className="flex justify-center relative">
          <div className="absolute w-80 h-80 bg-sky-500/20 rounded-full blur-[120px]" />
          <img
            src="/images/machine.png"
            alt="SnapPrint Machine"
            width={430}
            height={700}
            className="relative drop-shadow-[0_0_40px_rgba(14,165,233,0.5)] hover:scale-105 transition duration-500"
          />
        </div>
      </div>

      {/* Bottom Feature Strip */}
      <div className="border-t border-slate-800 bg-slate-900/60 backdrop-blur">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8 px-6 py-8">
          <div className="text-center">
            <h4 className="font-semibold text-sky-400">Secure Printing</h4>
            <p className="text-slate-400 text-sm mt-2">Files are deleted automatically after printing.</p>
          </div>
          <div className="text-center">
            <h4 className="font-semibold text-sky-400">Instant Printing</h4>
            <p className="text-slate-400 text-sm mt-2">Print documents in under one minute.</p>
          </div>
          <div className="text-center">
            <h4 className="font-semibold text-sky-400">UPI Payments</h4>
            <p className="text-slate-400 text-sm mt-2">Fast and secure digital payments.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
