import http from "../http-common.js";

class AccountService {
  getAccountById(id) {
    return http.get(`/accounts/${id}`);
  }

  getDestinationAccountById(id) {
    return http.get(`/accounts/destination/${id}`);
  }

  transferBetweenAccounts(id, data) {
    return http.put(`/accounts/${id}/transfer`, data);
  }

  getTransactionByAccountId(id) {
    return http.get(`/accounts/${id}/transactions`);
  }

  updateAccount(id, data) {
    return http.put(`accounts/${id}`, data);
  }

  deleteAccount(id, customerId) {
    return http.delete(`accounts/${id}/customers/${customerId}`);
  }
}

export default new AccountService();
