import http from "../http-common.js";

class CustomerService {
  getCustomerById(id) {
    return http.get(`/customers/${id}`);
  }

  getAllAccountsByCustomerId(id) {
    return http.get(`/customers/${id}/accounts`);
  }

  createNewAccount(id, data) {
    return http.post(`/customers/${id}/accounts`, data);
  }
}

export default new CustomerService();
