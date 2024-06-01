import { axiosPrivate } from "api/axios";
import { BASE_URL } from "utils/Constant";

const CONFIG_URL = BASE_URL + "/config";

class ConfigService {
  getStatus() {
    return axiosPrivate
      .get(CONFIG_URL + "/status")
      .then((response) => response?.data)
      .catch((error) => error?.response);
  }

  updateConfigStatus(status) {
    return axiosPrivate
      .patch(CONFIG_URL + "/status", status)
      .then((response) => response?.data)
      .catch((error) => error?.response);
  }
}
export default new ConfigService();
