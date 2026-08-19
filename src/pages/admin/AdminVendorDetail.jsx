import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { adminApi } from "../../api/admin.api";
import DashboardLayout from "../../components/DashboardLayout";
import StatusBadge from "../../components/StatusBadge";
import Loader from "../../components/Loader";

export default function AdminVendorDetail() {
  const { vendorId } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminApi.getVendorDetail(vendorId).then(setData).finally(() => setLoading(false));
  }, [vendorId]);

  if (loading) return <DashboardLayout><Loader /></DashboardLayout>;
  if (!data) return <DashboardLayout><p className="text-sm text-gray-400">Vendor not found</p></DashboardLayout>;

  const { vendor, machines, bank } = data;
  const totalRevenue = machines.reduce((s, m) => s + Number(m.revenue || 0), 0);

  return (
    <DashboardLayout>
      <Link to="/admin/vendors" className="text-sm text-gray-500 hover:text-gray-700">
        ← Back to vendors
      </Link>

      <div className="flex items-start justify-between mt-2 mb-6">
        <div>
          <h1 className="text-xl font-semibold text-gray-800">{vendor.full_name}</h1>
          <p className="text-sm text-gray-500">{vendor.email} {vendor.phone ? `· ${vendor.phone}` : ""}</p>
          {vendor.business_name && <p className="text-sm text-gray-500">{vendor.business_name}</p>}
        </div>
        <StatusBadge status={vendor.status} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="card p-5">
          <p className="text-sm text-gray-500">Machines owned</p>
          <p className="mt-2 text-2xl font-semibold text-brand-700">{machines.length}</p>
        </div>
        <div className="card p-5">
          <p className="text-sm text-gray-500">Lifetime revenue</p>
          <p className="mt-2 text-2xl font-semibold text-green-700">₹{totalRevenue.toLocaleString("en-IN")}</p>
        </div>
        <div className="card p-5">
          <p className="text-sm text-gray-500">Bank account</p>
          <p className="mt-2 text-sm font-medium">
            {bank ? (
              <>
                {bank.bank_name} · {bank.account_number}
                {bank.verified ? (
                  <span className="ml-2 text-xs text-green-600">Verified</span>
                ) : (
                  <span className="ml-2 text-xs text-amber-600">Unverified</span>
                )}
              </>
            ) : (
              <span className="text-gray-400">Not added yet</span>
            )}
          </p>
        </div>
      </div>

      <div className="card overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100">
          <h2 className="text-sm font-semibold text-gray-700">Machines</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="table-th">Machine</th>
              <th className="table-th">Status</th>
              <th className="table-th">Prints</th>
              <th className="table-th">Revenue</th>
            </tr>
          </thead>
          <tbody>
            {machines.length === 0 ? (
              <tr>
                <td colSpan={4} className="table-td text-center text-gray-400 py-8">
                  No machines assigned yet
                </td>
              </tr>
            ) : (
              machines.map((m) => (
                <tr key={m.machine_id}>
                  <td className="table-td font-medium">{m.name || m.machine_id}</td>
                  <td className="table-td"><StatusBadge status={m.status} /></td>
                  <td className="table-td">{m.total_prints}</td>
                  <td className="table-td">₹{Number(m.revenue).toLocaleString("en-IN")}</td>
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
