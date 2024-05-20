import axios from "axios";
import { axiosPrivate } from "../api/axios";
import {BASE_API_URL} from "../utils/Constant.js"

const NOTIFICATION_URL = BASE_API_URL + '/notifications';

class NotificationService {

    getCurrentUserNotifications(currentPage){
        let url = NOTIFICATION_URL + '/current';
        if (currentPage !== undefined) {
          url += `?page=${currentPage}&limit=8`;
        }else{
          url += `?page=1&limit=100`;
        }
        return axiosPrivate
        .get(url)
        .then((response) => response?.data)
        .catch((error) => error?.response);
      }
 
}

export default new NotificationService();
