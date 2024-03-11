import axios from 'axios'
import {BASE_API_URL} from "../utils/Constant.js"

const THREAD_URL = BASE_API_URL + '/threads'
class ThreadService {

  getAllThreads (currentPage) {
   
    let url = THREAD_URL;
    if (currentPage !== undefined) {
      url += `?page=${currentPage}&limit=3`;
    }else{
      url += `?page=1&limit=100`;
    }
    
    return axios.get(url)
      .then(response => response?.data)
      .catch(error => error?.response)
  }

  getById (id) {
   
    
    return axios.get(THREAD_URL+`/${id}`)
      .then(response => response?.data?.data)
      .catch(error => error?.response)
  }

}

export default new ThreadService()
