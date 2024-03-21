import axios from 'axios'
import {BASE_API_URL} from "../utils/Constant.js"
import { axiosPrivate } from '../api/axios.js';

const THREAD_URL = BASE_API_URL + '/threads'
class ThreadService {

  getAllThreads (currentPage, criteria) {
   
    let url = THREAD_URL + "/filter";
    if (currentPage !== undefined) {
      url += `?page=${currentPage}&limit=6`;
    }else{
      url += `?page=1&limit=100`;
    }
    
    return axios.post(url, criteria)
      .then(response => response?.data)
      .catch(error => error?.response)
  }

  getById (id) {
   
    
    return axiosPrivate.get(THREAD_URL+`/${id}`)
      .then(response => response?.data?.data)
      .catch(error => error?.response)
  }

  createThread(thread){
    return axiosPrivate.post(THREAD_URL,thread)
      .then(response => response?.data?.data)
      .catch(error => error?.response)
  }

  attachTag(threadId, tags) {
    return axiosPrivate.patch(THREAD_URL + `/${threadId}/attach-tag`, {
      tags: tags,
    });
  }

  reactThread(threadId, react){
    axiosPrivate
    .patch(THREAD_URL + `/${threadId}/react`, react)
    .catch(error => error?.response)
  }


}

export default new ThreadService()
