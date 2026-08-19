import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { adminApi } from "../../api/admin.api";
import DashboardLayout from "../../components/DashboardLayout";
import StatusBadge from "../../components/StatusBadge";
import Loader from "../../components/Loader";

export default function AdminMachineDetail() {
  const { machineId } = useParams();
  const [machine, setMachine] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = () => {
    setLoading(true);
    setError("");
    Promise.all([
      adminApi.getMachineDetail(machineId),
      adminApi.getVendors(),
    ])
      .then(([m, v]) => {
        setMachine(m);
        setJobs(m?.jobs || m?.recent_jobs || []);
        setVendors(v);
      })
      .catch((err) => {
        setError(err?.response?.data?.error || "Failed to load machine");
      })
      .finally(() => setLoading(false));
  };

  useEffect(load, [machineId]);

  const handleAssign = async (vendorId) => {
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

  if (loading) {
    return (
      <DashboardLayout>
        <Loader />
      </DashboardLayout>
    );
  }

  if (error || !machine) {
    return (
      <DashboardLayout>
        <Link to="/admin/machines" className="text-brand-600 hover:text-brand-700 text-sm font-medium">
          ← Back to Machines
        </Link>
        <p className="text-sm text-red-600 mt-4">{error || "Machine not found"}</p>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="mb-6">
        <Link to="/admin/machines" className="text-brand-600 hover:text-brand-700 text-sm font-medium">
          ← Back to Machines
        </Link>
      </div>

      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold text-gray-800">
            {machine.name || machine.machine_id}
          </h1>
          <p className="text-sm text-gray-500">{machine.machine_id}</p>
        </div>
        <StatusBadge status={machine.is_online ? "ONLINE" : "OFFLINE"} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="card p-5">
          <p className="text-xs font-medium text-gray-500 mb-1">Total Prints</p>
          <p className="text-2xl font-semibold text-gray-800">{machine.total_jobs || 0}</p>
        </div>
        <div className="card p-5">
          <p className="text-xs font-medium text-gray-500 mb-1">Revenue</p>
          <p className="text-2xl font-semibold text-gray-800">
            ₹{Number(machine.revenue || 0).toLocaleString("en-IN")}
          </p>
        </div>
        <div className="card p-5">
          <p className="text-xs font-medium text-gray-500 mb-1">Assigned Vendor</p>
          <select
            className="input py-1 text-sm mt-1"
            defaultValue={machine.owner_vendor_id || ""}
            onChange={(e) => handleAssign(e.target.value || null)}
          >
            <option value="">Unassigned</option>
            {vendors.map((v) => (
              <option key={v.id} value={v.id}>
                {v.full_name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="card p-6 mb-6">
        <h2 className="text-sm font-semibold text-gray-700 mb-4">Location</h2>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-xs text-gray-500">Location name</p>
            <p className="text-gray-800">{machine.location_name || "—"}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Address</p>
            <p className="text-gray-800">{machine.address || "—"}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">City</p>
            <p className="text-gray-800">{machine.city || "—"}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">State</p>
            <p className="text-gray-800">{machine.state || "—"}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Pincode</p>
            <p className="text-gray-800">{machine.pincode || "—"}</p>
          </div>
        </div>
      </div>

      <div className="card overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="text-sm font-semibold text-gray-700">Recent Jobs</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="table-th">Job ID</th>
                <th className="table-th">Status</th>
                <th className="table-th">Pages</th>
                <th className="table-th">Amount</th>
                <th className="table-th">Created</th>
              </tr>
            </thead>
            <tbody>
              {jobs.length === 0 ? (
                <tr>
                  <td className="table-td text-gray-400" colSpan={5}>
                    No jobs yet
                  </td>
                </tr>
              ) : (
                jobs.map((j) => (
                  <tr key={j.id || j.job_id}>
                    <td className="table-td font-medium">{j.job_id || j.id}</td>
                    <td className="table-td">
                      <StatusBadge status={j.status} />
                    </td>
                    <td className="table-td">{j.pages || "—"}</td>
                    <td className="table-td">₹{Number(j.amount || 0).toLocaleString("en-IN")}</td>
                    <td className="table-td text-gray-500">
                      {j.created_at ? new Date(j.created_at).toLocaleString("en-IN") : "—"}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}