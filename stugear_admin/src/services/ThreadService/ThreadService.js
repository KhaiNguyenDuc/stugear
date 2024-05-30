import axios from 'axios'
import { BASE_URL } from 'utils/Constant';
import { axiosPrivate } from 'api/axios.js';

const THREAD_URL = BASE_URL + '/threads'
class ThreadService {

  getAllThreads(currentPage, criteria) {
   
    let url = THREAD_URL + "/filter";
    if (currentPage !== undefined) {
      url += `?page=${currentPage}&limit=8`;
    }else{
      url += `?page=1&limit=100`;
    }
    
    return axiosPrivate.post(url, criteria)
      .then(response => response?.data)
      .catch(error => error?.response)
  }

}

export default new ThreadService()
