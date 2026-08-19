import { ShieldCheck, Smartphone, CreditCard, Clock3, Cloud, Printer } from "lucide-react";

const features = [
  { icon: ShieldCheck, title: "Secure Printing", description: "Your files are encrypted during upload and automatically deleted after printing." },
  { icon: Smartphone, title: "Mobile Upload", description: "Simply scan the QR code and upload documents directly from your smartphone." },
  { icon: CreditCard, title: "Digital Payments", description: "Pay instantly using UPI, Debit Card, Credit Card or Wallets." },
  { icon: Printer, title: "Instant Printing", description: "Get high-quality prints within seconds without waiting in queues." },
  { icon: Clock3, title: "24×7 Availability", description: "Print whenever you need, even outside regular shop working hours." },
  { icon: Cloud, title: "Cloud Connected", description: "Machines stay connected for remote monitoring, updates and maintenance." },
];

export default function Features() {
  return (
    <section id="features" className="bg-slate-950 py-28 text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <p className="text-sky-400 uppercase tracking-[0.35em] font-semibold">Features</p>
          <h2 className="text-4xl md:text-5xl font-bold mt-5">Everything You Need in One Smart Kiosk</h2>
          <p className="text-slate-400 max-w-3xl mx-auto mt-6 text-lg">
            SnapPrint combines secure document handling, instant printing, digital payments and cloud connectivity
            into one intelligent self-service solution.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="group rounded-3xl border border-slate-800 bg-slate-900/70 p-8 transition-all duration-300 hover:-translate-y-2 hover:border-sky-500 hover:shadow-xl hover:shadow-sky-500/10"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-sky-500/10 group-hover:bg-sky-500/20 transition">
                  <Icon className="h-8 w-8 text-sky-400" />
                </div>
                <h3 className="mt-6 text-2xl font-semibold">{feature.title}</h3>
                <p className="mt-4 leading-7 text-slate-400">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
