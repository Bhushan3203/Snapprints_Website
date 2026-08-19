import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { adminApi } from "../../api/admin.api";
import DashboardLayout from "../../components/DashboardLayout";
import StatusBadge from "../../components/StatusBadge";
import Loader from "../../components/Loader";

const EMPTY_FORM = {
  name: "",
  locationName: "",
  address: "",
  city: "",
  state: "",
  pincode: "",
};

export default function AdminMachines() {
  const [machines, setMachines] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState("");
  const [credentials, setCredentials] = useState(null);

  const load = () => {
    setLoading(true);
    Promise.all([adminApi.getMachineInfo(), adminApi.getVendors()])
      .then(([m, v]) => {
        setMachines(m);
        setVendors(v);
      })
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const handleChange = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleCreate = async (e) => {
    e.preventDefault();
    setError("");
    setCreating(true);
    try {
      const res = await adminApi.createMachine(form);
      setCredentials(res.credentials);
      setForm(EMPTY_FORM);
      load();
    } catch (err) {
      setError(err?.response?.data?.error || "Failed to create machine");
    } finally {
      setCreating(false);
    }
  };

  const handleAssign = async (machineId, vendorId) => {
    try {
      if (vendorId) {
        await adminApi.assignMachine(machineId, vendorId);
      } else {
        await adminApi.unassignMachine(machineId);
      }
      load();
    } catch (err) {
      alert(err?.response?.data?.error || "Failed to update assignment");
    }
  };

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-semibold text-gray-800">Machines</h1>
        <button className="btn-primary" onClick={() => setShowForm((s) => !s)}>
          {showForm ? "Cancel" : "+ Create Machine"}
        </button>
      </div>

      {showForm && (
        <div className="card p-6 mb-6 max-w-xl">
          <form onSubmit={handleCreate} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Machine name</label>
                <input className="input" value={form.name} onChange={handleChange("name")} />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Location name</label>
                <input required className="input" value={form.locationName} onChange={handleChange("locationName")} />
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Address</label>
              <input className="input" value={form.address} onChange={handleChange("address")} />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">City</label>
                <input className="input" value={form.city} onChange={handleChange("city")} />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">State</label>
                <input className="input" value={form.state} onChange={handleChange("state")} />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Pincode</label>
                <input className="input" value={form.pincode} onChange={handleChange("pincode")} />
              </div>
            </div>
            {error && <p className="text-sm text-red-600">{error}</p>}
            <button type="submit" disabled={creating} className="btn-primary">
              {creating ? "Creating..." : "Create machine"}
            </button>
          </form>
        </div>
      )}

      {credentials && (
        <div className="card p-5 mb-6 bg-amber-50 border-amber-200 max-w-xl">
          <p className="text-sm font-semibold text-amber-800 mb-2">
            Machine created — save these credentials now, they won't be shown again:
          </p>
          <pre className="text-xs bg-white p-3 rounded-lg overflow-x-auto">
{`MACHINE_ID=${credentials.MACHINE_ID}
API_KEY=${credentials.API_KEY}
API_BASE=${credentials.API_BASE}`}
          </pre>
          <button className="text-xs text-amber-700 mt-2 underline" onClick={() => setCredentials(null)}>
            Dismiss
          </button>
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
                <th className="table-th">Machine</th>
                <th className="table-th">Location</th>
                <th className="table-th">Status</th>
                <th className="table-th">Prints</th>
                <th className="table-th">Revenue</th>
                <th className="table-th">Vendor</th>
                <th className="table-th"></th>
              </tr>
            </thead>
            <tbody>
              {machines.map((m) => (
                <tr key={m.machine_id}>
                  <td className="table-td font-medium">{m.name || m.machine_id}</td>
                  <td className="table-td text-gray-500">{m.city || "—"}</td>
                  <td className="table-td">
                    <StatusBadge status={m.is_online ? "ONLINE" : "OFFLINE"} />
                  </td>
                  <td className="table-td">{m.total_jobs || 0}</td>
                  <td className="table-td">₹{Number(m.revenue || 0).toLocaleString("en-IN")}</td>
                  <td className="table-td">
                    <select
                      className="input py-1 text-xs"
                      defaultValue={m.owner_vendor_id || ""}
                      onChange={(e) => handleAssign(m.machine_id, e.target.value || null)}
                    >
                      <option value="">Unassigned</option>
                      {vendors.map((v) => (
                        <option key={v.id} value={v.id}>{v.full_name}</option>
                      ))}
                    </select>
                  </td>
                  <td className="table-td text-right">
                    <Link
                      to={`/admin/machines/${m.machine_id}`}
                      className="text-brand-600 hover:text-brand-700 text-sm font-medium"
                    >
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
