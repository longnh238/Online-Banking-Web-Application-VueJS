import http from "../http-common.js";

class LoginService {
  login(data) {
    return http.post("/login", data);
  }

  isLoggedIn(cid) {
    if (cid == null || cid == undefined || cid == 0) {
      return false;
    } else {
      return true;
    }
  }
}

export default new LoginService();
