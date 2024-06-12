import { axiosPrivate } from "api/axios";
import { BASE_URL } from "utils/Constant";

const CHART_URL = BASE_URL + "/charts";

class ChartService {
  getReportData() {
    return axiosPrivate
      .get(CHART_URL + "/report-bar")
      .then((response) => response?.data)
      .catch((error) => error?.response);
  }
  getLinearData() {
    return axiosPrivate
      .get(CHART_URL + "/gradient-line")
      .then((response) => response?.data)
      .catch((error) => error?.response);
  }
  getRecentEvent() {
    return axiosPrivate
      .get(CHART_URL + "/recent-event")
      .then((response) => response?.data)
      .catch((error) => error?.response);
  }
}
export default new ChartService();
