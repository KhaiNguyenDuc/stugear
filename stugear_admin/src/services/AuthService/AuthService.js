import axios from 'axios'
import {BASE_URL} from "../../utils/Constant"

const AUTH_URL = BASE_URL + '/auth';

class AuthService {

  login (user) {
    return axios.post(AUTH_URL + '/login', {
      email: user.email,
      password: user.password
    })
      .then(response => response?.data?.data)
      .catch(error => error?.response)
  }


}


export default new AuthService()
