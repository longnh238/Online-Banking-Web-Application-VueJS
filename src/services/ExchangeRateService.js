import http from "../http-common.js";

class ExchangeRateService {
  getExchangeRates() {
    return http.get("/exchange-rates");
  }
}

export default new ExchangeRateService();
