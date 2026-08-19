import { Mail, Phone, MapPin, ArrowRight } from "lucide-react";

export default function Contact({ onDemoClick }) {
  return (
    <section id="contact" className="bg-slate-950 py-28 text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 to-slate-950 p-12 lg:p-16">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left */}
            <div>
              <p className="text-sky-400 uppercase tracking-[0.35em] font-semibold">Contact Us</p>
              <h2 className="text-5xl font-bold mt-5 leading-tight">
                Ready to Modernize
                <span className="text-sky-400"> Printing?</span>
              </h2>
              <p className="mt-8 text-slate-400 text-lg leading-8">
                Whether you&apos;re a college, office, hospital or public organization, SnapPrint can provide a fast
                and secure self-service printing solution.
              </p>
              <button
                onClick={onDemoClick}
                className="mt-10 flex items-center gap-3 rounded-xl bg-sky-500 px-8 py-4 font-semibold transition hover:bg-sky-400"
              >
                Request Demo
                <ArrowRight size={18} />
              </button>
            </div>

            {/* Right */}
            <div className="space-y-8">
              <div className="flex items-center gap-5 rounded-2xl border border-slate-800 bg-slate-900 p-6">
                <Mail className="text-sky-400" />
                <div>
                  <h4 className="font-semibold">Email</h4>
                  <p className="text-slate-400">hello@snapprint.in</p>
                </div>
              </div>

              <div className="flex items-center gap-5 rounded-2xl border border-slate-800 bg-slate-900 p-6">
                <Phone className="text-sky-400" />
                <div>
                  <h4 className="font-semibold">Phone</h4>
                  <p className="text-slate-400">+91 XXXXX XXXXX</p>
                </div>
              </div>

              <div className="flex items-center gap-5 rounded-2xl border border-slate-800 bg-slate-900 p-6">
                <MapPin className="text-sky-400" />
                <div>
                  <h4 className="font-semibold">Location</h4>
                  <p className="text-slate-400">Navi Mumbai, Maharashtra, India</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
