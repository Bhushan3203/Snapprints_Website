import axiosClient from "./axiosClient";

export const adminApi = {
  // Overview
  getStats: () => axiosClient.get("/admin/stats").then((r) => r.data),
  getRevenue: (period) => axiosClient.get(`/admin/revenue?period=${period}`).then((r) => r.data),
  getRevenueOverview: () => axiosClient.get("/admin/revenue-overview").then((r) => r.data),
  getAlerts: () => axiosClient.get("/admin/alerts").then((r) => r.data),
  getLiveJobs: () => axiosClient.get("/admin/live-jobs").then((r) => r.data),

  // Machines
  getMachineInfo: () => axiosClient.get("/admin/machineinfo").then((r) => r.data),
  createMachine: (payload) => axiosClient.post("/admin/createmachine", payload).then((r) => r.data),
  updateMachine: (machineId, payload) =>
    axiosClient.put(`/admin/machines/${machineId}`, payload).then((r) => r.data),
  deleteMachine: (machineId) =>
    axiosClient.delete(`/admin/machines/${machineId}`).then((r) => r.data),
  machineReport: (machineId, period) =>
    axiosClient.get(`/admin/machine-report/${machineId}?period=${period}`).then((r) => r.data),
  assignMachine: (machineId, vendorId) =>
    axiosClient.patch(`/admin/machines/${machineId}/assign`, { vendorId }).then((r) => r.data),
  unassignMachine: (machineId) =>
    axiosClient.patch(`/admin/machines/${machineId}/unassign`).then((r) => r.data),
  getMachineJobs: (machineId) => axiosClient.get(`/admin/machines/${machineId}/jobs`).then((r) => r.data),

  // Refunds
  refundJob: (jobId) => axiosClient.post(`/admin/jobs/${jobId}/refund`).then((r) => r.data),

  // Vendors
  getVendors: () => axiosClient.get("/admin/vendors").then((r) => r.data),
  getVendorDetail: (vendorId) => axiosClient.get(`/admin/vendors/${vendorId}`).then((r) => r.data),
  createVendor: (payload) => axiosClient.post("/admin/vendors", payload).then((r) => r.data),

  // Customers
  getCustomers: () => axiosClient.get("/admin/customers").then((r) => r.data),
  getCustomerDetail: (customerId) => axiosClient.get(`/admin/customers/${customerId}`).then((r) => r.data),

  // Withdrawals
  getWithdrawals: (status) =>
    axiosClient
      .get(`/admin/withdrawals${status ? `?status=${status}` : ""}`)
      .then((r) => r.data),
  updateWithdrawalStatus: (withdrawalId, status, remarks) =>
    axiosClient
      .patch(`/admin/withdrawals/${withdrawalId}`, { status, remarks })
      .then((r) => r.data),
};
