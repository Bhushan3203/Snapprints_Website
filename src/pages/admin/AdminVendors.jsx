import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { adminApi } from "../../api/admin.api";
import DashboardLayout from "../../components/DashboardLayout";
import Loader from "../../components/Loader";

const EMPTY_FORM = {
  fullName: "",
  email: "",
  phone: "",
  businessName: "",
  gstNumber: "",
  password: "",
};

export default function AdminVendors() {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState("");

  const load = () => {
    setLoading(true);
    adminApi.getVendors().then(setVendors).finally(() => setLoading(false));
  };

  useEffect(load, []);

  const handleChange = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleCreate = async (e) => {
    e.preventDefault();
    setError("");
    setCreating(true);
    try {
      await adminApi.createVendor(form);
      setForm(EMPTY_FORM);
      setShowForm(false);
      load();
    } catch (err) {
      setError(err?.response?.data?.error || "Failed to create vendor");
    } finally {
      setCreating(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-semibold text-gray-800">Vendors</h1>
        <button className="btn-primary" onClick={() => setShowForm((s) => !s)}>
          {showForm ? "Cancel" : "+ Create Vendor"}
        </button>
      </div>

      {showForm && (
        <div className="card p-6 mb-6 max-w-xl">
          <form onSubmit={handleCreate} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Full name</label>
                <input required className="input" value={form.fullName} onChange={handleChange("fullName")} />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Email</label>
                <input required type="email" className="input" value={form.email} onChange={handleChange("email")} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Phone</label>
                <input className="input" value={form.phone} onChange={handleChange("phone")} />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Initial password</label>
                <input required className="input" value={form.password} onChange={handleChange("password")} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Business name</label>
                <input className="input" value={form.businessName} onChange={handleChange("businessName")} />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">GST number</label>
                <input className="input" value={form.gstNumber} onChange={handleChange("gstNumber")} />
              </div>
            </div>
            {error && <p className="text-sm text-red-600">{error}</p>}
            <button type="submit" disabled={creating} className="btn-primary">
              {creating ? "Creating..." : "Create vendor"}
            </button>
            <p className="text-xs text-gray-400">
              Share the email + password with the vendor so they can log in — there's no self-signup.
            </p>
          </form>
        </div>
      )}

      {loading ? (
        <Loader />
      ) : (
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="table-th">Vendor</th>
                <th className="table-th">Email</th>
                <th className="table-th">Machines</th>
                <th className="table-th">Revenue</th>
                <th className="table-th"></th>
              </tr>
            </thead>
            <tbody>
              {vendors.map((v) => (
                <tr key={v.id}>
                  <td className="table-td font-medium">{v.full_name}</td>
                  <td className="table-td text-gray-500">{v.email}</td>
                  <td className="table-td">{v.machine_count}</td>
                  <td className="table-td">₹{Number(v.total_revenue).toLocaleString("en-IN")}</td>
                  <td className="table-td text-right">
                    <Link to={`/admin/vendors/${v.id}`} className="text-brand-600 hover:text-brand-700 text-sm font-medium">
                      View →
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        </div>
      )}
    </DashboardLayout>
  );
}
