import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { adminApi } from "../../api/admin.api";
import DashboardLayout from "../../components/DashboardLayout";
import StatusBadge from "../../components/StatusBadge";
import Loader from "../../components/Loader";

export default function AdminCustomerDetail() {
  const { customerId } = useParams();
  const [customer, setCustomer] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = () => {
    setLoading(true);
    setError("");
    adminApi
      .getCustomerDetail(customerId)
      .then((c) => {
        setCustomer(c);
        setOrders(c?.orders || c?.recent_orders || []);
      })
      .catch((err) => {
        setError(err?.response?.data?.error || "Failed to load customer");
      })
      .finally(() => setLoading(false));
  };

  useEffect(load, [customerId]);

  if (loading) {
    return (
      <DashboardLayout>
        <Loader />
      </DashboardLayout>
    );
  }

  if (error || !customer) {
    return (
      <DashboardLayout>
        <Link to="/admin/customers" className="text-brand-600 hover:text-brand-700 text-sm font-medium">
          ← Back to Customers
        </Link>
        <p className="text-sm text-red-600 mt-4">{error || "Customer not found"}</p>
      </DashboardLayout>
    );
  }

  const issueCount = Number(customer.problem_jobs || 0) + Number(customer.stuck_jobs || 0);

  return (
    <DashboardLayout>
      <div className="mb-6">
        <Link to="/admin/customers" className="text-brand-600 hover:text-brand-700 text-sm font-medium">
          ← Back to Customers
        </Link>
      </div>

      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold text-gray-800">{customer.name}</h1>
          <p className="text-sm text-gray-500">{customer.phone}</p>
        </div>
        {issueCount > 0 && (
          <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-700">
            {issueCount} to review
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="card p-5">
          <p className="text-xs font-medium text-gray-500 mb-1">Total Orders</p>
          <p className="text-2xl font-semibold text-gray-800">{customer.total_orders || 0}</p>
        </div>
        <div className="card p-5">
          <p className="text-xs font-medium text-gray-500 mb-1">Total Spent</p>
          <p className="text-2xl font-semibold text-gray-800">
            ₹{Number(customer.total_spent || 0).toLocaleString("en-IN")}
          </p>
        </div>
        <div className="card p-5">
          <p className="text-xs font-medium text-gray-500 mb-1">Joined</p>
          <p className="text-2xl font-semibold text-gray-800">
            {customer.created_at ? new Date(customer.created_at).toLocaleDateString("en-IN") : "—"}
          </p>
        </div>
      </div>

      <div className="card overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="text-sm font-semibold text-gray-700">Order History</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="table-th">Order ID</th>
                <th className="table-th">Status</th>
                <th className="table-th">Pages</th>
                <th className="table-th">Amount</th>
                <th className="table-th">Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.length === 0 ? (
                <tr>
                  <td className="table-td text-gray-400" colSpan={5}>
                    No orders yet
                  </td>
                </tr>
              ) : (
                orders.map((o) => (
                  <tr key={o.id || o.order_id}>
                    <td className="table-td font-medium">{o.order_id || o.id}</td>
                    <td className="table-td">
                      <StatusBadge status={o.status} />
                    </td>
                    <td className="table-td">{o.pages || "—"}</td>
                    <td className="table-td">₹{Number(o.amount || 0).toLocaleString("en-IN")}</td>
                    <td className="table-td text-gray-500">
                      {o.created_at ? new Date(o.created_at).toLocaleString("en-IN") : "—"}
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