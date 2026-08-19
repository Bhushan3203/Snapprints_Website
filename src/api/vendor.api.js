import axiosClient from "./axiosClient";

export const vendorApi = {
  getMe: () => axiosClient.get("/vendor/me").then((r) => r.data),

  getMachines: () => axiosClient.get("/vendor/machines").then((r) => r.data),
  getMachineRevenue: (machineId, range) =>
    axiosClient.get(`/vendor/machines/${machineId}/revenue?range=${range}`).then((r) => r.data),

  getRevenueSummary: (range) =>
    axiosClient.get(`/vendor/revenue-summary?range=${range}`).then((r) => r.data),
  getBalance: () => axiosClient.get("/vendor/balance").then((r) => r.data),

  getBankAccount: () => axiosClient.get("/vendor/bank-account").then((r) => r.data),
  upsertBankAccount: (payload) =>
    axiosClient.post("/vendor/bank-account", payload).then((r) => r.data),

  getWithdrawals: () => axiosClient.get("/vendor/withdrawals").then((r) => r.data),
  requestWithdrawal: (amount) =>
    axiosClient.post("/vendor/withdrawals", { amount }).then((r) => r.data),
};
