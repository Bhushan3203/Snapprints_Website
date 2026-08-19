import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { vendorApi } from "../../api/vendor.api";
import DashboardLayout from "../../components/DashboardLayout";
import RangeTabs from "../../components/RangeTabs";
import RevenueChart from "../../components/RevenueChart";
import StatCard from "../../components/StatCard";
import Loader from "../../components/Loader";

export default function VendorMachineDetail() {
  const { machineId } = useParams();
  const [range, setRange] = useState("week");
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    setError("");
    vendorApi
      .getMachineRevenue(machineId, range)
      .then(setRows)
      .catch((err) => setError(err?.response?.data?.error || "Failed to load revenue"))
      .finally(() => setLoading(false));
  }, [machineId, range]);

  const totalRevenue = rows.reduce((sum, r) => sum + Number(r.revenue || 0), 0);
  const totalPrints = rows.reduce((sum, r) => sum + Number(r.prints || 0), 0);

  return (
    <DashboardLayout>
      <Link to="/vendor/machines" className="text-sm text-gray-500 hover:text-gray-700">
        ← Back to machines
      </Link>
      <h1 className="text-xl font-semibold text-gray-800 mt-2 mb-6">{machineId}</h1>

      {error && <p className="text-sm text-red-600 mb-4">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <StatCard label={`Revenue (${range})`} value={`₹${totalRevenue.toLocaleString("en-IN")}`} />
        <StatCard label={`Prints (${range})`} value={totalPrints} />
      </div>

      <div className="card p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-gray-700">Revenue trend</h2>
          <RangeTabs value={range} onChange={setRange} />
        </div>
        {loading ? <Loader /> : <RevenueChart data={rows} />}
      </div>
    </DashboardLayout>
  );
}
