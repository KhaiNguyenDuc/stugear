import { axiosPrivate } from "api/axios";
import { BASE_URL } from "utils/Constant";

const VALIDATION_URL = BASE_URL + "/validations";

class ValidationService {
  getAllValidations(currentPage) {
    let url = VALIDATION_URL;
    if (currentPage !== undefined) {
      url += `?page=${currentPage}&limit=6`;
    } else {
      url += `?page=1&limit=200`;
    }
    return axiosPrivate
      .get(url)
      .then((response) => response?.data)
      .catch((error) => error?.response);
  }

  updateStatus(id, status, type){
    return axiosPrivate
    .patch(VALIDATION_URL, {
      id: id,
      status: status,
      type: type
    })
    .then((response) => response?.data)
    .catch((error) => error?.response);
  }
}

export default new ValidationService();
