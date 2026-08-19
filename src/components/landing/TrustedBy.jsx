import { GraduationCap, Building2, Hospital, Library, ShoppingBag, Train } from "lucide-react";

const industries = [
  { icon: GraduationCap, title: "Colleges" },
  { icon: Building2, title: "Corporate" },
  { icon: Hospital, title: "Hospitals" },
  { icon: Library, title: "Libraries" },
  { icon: ShoppingBag, title: "Shopping Malls" },
  { icon: Train, title: "Railway Stations" },
];

export default function TrustedBy() {
  return (
    <section className="bg-gradient-to-b from-slate-950 to-slate-900 py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-sky-400 uppercase tracking-[0.3em] font-semibold">Ideal For</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-4">Designed for Every Modern Workspace</h2>
          <p className="text-slate-400 max-w-2xl mx-auto mt-6 text-lg">
            SnapPrint is built for institutions and businesses that need fast, secure and self-service document
            printing.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {industries.map((industry) => {
            const Icon = industry.icon;
            return (
              <div
                key={industry.title}
                className="group rounded-2xl border border-slate-800 bg-slate-900/70 p-8 text-center transition-all duration-300 hover:-translate-y-2 hover:border-sky-500 hover:shadow-xl hover:shadow-sky-500/10"
              >
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-sky-500/10 transition-colors group-hover:bg-sky-500/20">
                  <Icon className="h-8 w-8 text-sky-400" />
                </div>
                <h3 className="mt-6 text-lg font-semibold text-white">{industry.title}</h3>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
