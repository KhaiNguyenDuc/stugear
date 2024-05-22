import { axiosPrivate } from "api/axios";
import { BASE_URL } from "utils/Constant";

const USER_URL = BASE_URL + "/users";

class UserService {
  getAllUsers(currentPage) {
    let url = USER_URL;
    if (currentPage !== undefined) {
      url += `?page=${currentPage}&limit=6`;
    } else {
      url += `?page=1&limit=100`;
    }
    return axiosPrivate
      .get(url)
      .then((response) => response?.data)
      .catch((error) => error?.response);
  }

  getUserById(userId) {
    return axiosPrivate
      .get(USER_URL + `/${userId}`)
      .then((response) => response?.data?.data)
      .catch((error) => error?.response);
  }

  updateUserStatus(userId, status) {
    return axiosPrivate
      .patch(USER_URL + `/status/${userId}`, {
        user_id: status,
        status: status,
      })
      .then((response) => response?.data?.data)
      .catch((error) => error?.response);
  }
}

export default new UserService();
