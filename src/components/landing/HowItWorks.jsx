import { ScanLine, UploadCloud, CreditCard, Printer } from "lucide-react";

const steps = [
  { icon: ScanLine, title: "Scan QR Code", description: "Scan the QR code displayed on the SnapPrint kiosk using your mobile phone." },
  { icon: UploadCloud, title: "Upload Document", description: "Upload PDF, DOCX, PPT, images and other supported document formats." },
  { icon: CreditCard, title: "Make Payment", description: "Pay securely using UPI, Debit Card, Credit Card or Wallet." },
  { icon: Printer, title: "Collect Print", description: "Your document is printed instantly. Collect it directly from the machine." },
];

export default function HowItWorks() {
  return (
    <section id="how" className="bg-gradient-to-b from-slate-900 to-slate-950 py-28 text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <p className="text-sky-400 uppercase tracking-[0.35em] font-semibold">How It Works</p>
          <h2 className="text-4xl md:text-5xl font-bold mt-5">Print in Just 4 Simple Steps</h2>
          <p className="text-slate-400 mt-6 max-w-3xl mx-auto text-lg leading-8">
            SnapPrint makes document printing quick, secure and completely contactless. From scanning a QR code to
            collecting your print, everything takes less than a minute.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className="group relative rounded-3xl border border-slate-800 bg-slate-900/70 backdrop-blur-sm p-8 transition-all duration-300 hover:-translate-y-2 hover:border-sky-500 hover:shadow-xl hover:shadow-sky-500/10"
            >
              <div className="absolute -top-5 left-6 flex h-10 w-10 items-center justify-center rounded-full bg-sky-500 font-bold text-white shadow-lg shadow-sky-500/30">
                {index + 1}
              </div>
              <div className="mt-4 mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-sky-500/10 group-hover:bg-sky-500/20 transition">
                <step.icon size={34} className="text-sky-400" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">{step.title}</h3>
              <p className="leading-7 text-slate-400">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
