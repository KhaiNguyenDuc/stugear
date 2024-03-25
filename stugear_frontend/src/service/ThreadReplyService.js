import axios from 'axios'
import {BASE_API_URL} from "../utils/Constant.js"
import { axiosPrivate } from '../api/axios.js';

const THREAD_REPLY_URL = BASE_API_URL + '/thread'
const REPLY_URL = BASE_API_URL + '/replies'
class ThreadReplyService {

  createReply(threadId, reply){
    return axiosPrivate
    .post(THREAD_REPLY_URL + `/${threadId}/replies`, reply)
    .then(response => response?.data)
    .catch(error => error?.response)
  }

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
    return axiosPrivate.get(url)
      .then(response => response?.data)
      .catch(error => error?.response)
  }

  getAIReplyByThreadId(id) {
    let url = THREAD_REPLY_URL + `/${id}/auto/replies`;
    return axios.get(url)
      .then(response => response?.data?.data)
      .catch(error => error?.response)
  }

  reactReply(replyId, react){
    axiosPrivate
    .patch(REPLY_URL + `/${replyId}/react`, react)
    .catch(error => error?.response)
  }
  

}

export default new ThreadReplyService()
