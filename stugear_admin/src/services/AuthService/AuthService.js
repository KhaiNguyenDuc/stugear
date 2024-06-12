import axios from 'axios'
import {BASE_URL} from "../../utils/Constant"

const AUTH_URL = BASE_URL + '/auth';

class AuthService {

  login (user, rememberMe) {
    return axios.post(AUTH_URL + '/login', {
      email: user.email,
      password: user.password,
      remember_me: rememberMe
    })
      .then(response => response?.data?.data)
      .catch(error => error?.response)
  }


}


export default new AuthService()
