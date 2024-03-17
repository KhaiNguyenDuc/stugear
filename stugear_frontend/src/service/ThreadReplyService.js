import axios from 'axios'
import {BASE_API_URL} from "../utils/Constant.js"

const THREAD_REPLY_URL = BASE_API_URL + '/thread'
class ThreadReplyService {


  getByThreadId(id, currentPage, filter) {
    let url = THREAD_REPLY_URL + `/${id}/replies`;
    if (currentPage !== undefined) {
      url += `?page=${currentPage}&limit=4`;
    }else{
      url += `?page=1&limit=100`;
    }

    if(filter != undefined && filter != ""){
      url += `&filter=${filter}`;
    }
    return axios.get(url)
      .then(response => response?.data)
      .catch(error => error?.response)
  }

}

export default new ThreadReplyService()
