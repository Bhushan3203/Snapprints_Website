import { useState } from "react";
import { X } from "lucide-react";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000/api";

export default function DemoModal({ open, onClose }) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    city: "",
    organization: "",
    message: "",
  });

  if (!open) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${API_BASE}/request-demo`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!response.ok) throw new Error("Unable to send request.");

      setSuccess(true);
      setForm({ name: "", company: "", email: "", phone: "", city: "", organization: "", message: "" });
    } catch {
      setError("Something went wrong. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm flex items-center justify-center p-6">
      <div className="bg-slate-900 rounded-3xl border border-slate-700 max-w-xl w-full p-8 relative">
        <button onClick={onClose} className="absolute right-5 top-5 text-slate-400 hover:text-white">
          <X />
        </button>

        <h2 className="text-3xl font-bold text-white">Request Demo</h2>
        <p className="text-slate-400 mt-3 mb-8">Fill the details below and our team will contact you.</p>

        {success ? (
          <div className="text-center py-10">
            <div className="w-24 h-24 rounded-full bg-green-500/20 flex items-center justify-center mx-auto">
              <span className="text-5xl">✅</span>
            </div>
            <h2 className="text-3xl font-bold mt-8 text-white">Thank You!</h2>
            <p className="text-slate-400 mt-5 leading-8">
              Your demo request has been submitted successfully.
              <br />
              Our team will contact you shortly.
            </p>
            <button
              onClick={onClose}
              className="mt-10 bg-sky-500 px-8 py-4 rounded-xl font-semibold hover:bg-sky-400"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              required
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              className="w-full rounded-xl bg-slate-800 p-4 text-white"
            />

            <input
              required
              name="company"
              placeholder="Company / College"
              value={form.company}
              onChange={handleChange}
              className="w-full rounded-xl bg-slate-800 p-4 text-white"
            />

            <input
              required
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="w-full rounded-xl bg-slate-800 p-4 text-white"
            />

            <input
              required
              type="tel"
              name="phone"
              pattern="[0-9]{10}"
              maxLength={10}
              placeholder="Phone Number"
              value={form.phone}
              onChange={handleChange}
              className="w-full rounded-xl bg-slate-800 p-4 text-white"
            />

            <input
              required
              name="city"
              placeholder="City"
              value={form.city}
              onChange={handleChange}
              className="w-full rounded-xl bg-slate-800 p-4 text-white"
            />

            <select
              required
              name="organization"
              value={form.organization}
              onChange={handleChange}
              className="w-full rounded-xl bg-slate-800 p-4 text-white"
            >
              <option value="">Organization Type</option>
              <option>College</option>
              <option>Corporate</option>
              <option>Hospital</option>
              <option>Library</option>
              <option>Government</option>
              <option>Other</option>
            </select>

            <textarea
              rows={4}
              name="message"
              placeholder="Message"
              value={form.message}
              onChange={handleChange}
              className="w-full rounded-xl bg-slate-800 p-4 text-white"
            />

            {error && (
              <div className="rounded-lg bg-red-500/10 border border-red-500/30 p-3 text-red-400 text-sm">
                {error}
              </div>
            )}

            <button
              disabled={loading}
              className="w-full rounded-xl bg-sky-500 py-4 font-semibold transition hover:bg-sky-400 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Submitting..." : "Request Demo"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
