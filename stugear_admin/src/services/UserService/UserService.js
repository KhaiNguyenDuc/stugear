
import { axiosPrivate } from "api/axios";
import { BASE_URL } from "utils/Constant";

const USER_URL = BASE_URL + '/api/users';

class UserService {
 
    getAllUsers() {
        return axiosPrivate
          .get(USER_URL)
          .then((response) => response?.data?.data)
          .catch((error) => error?.response);
      }
}

export default new UserService();
