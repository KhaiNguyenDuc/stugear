import axios from 'axios'
import { axiosPrivate } from '../api/axios';
import {BASE_API_URL} from "../utils/Constant.js"

const PAYMENT_URL = BASE_API_URL + '/payments'

class PaymentService {
    VNPay(amount) {
        return axiosPrivate
          .post(PAYMENT_URL + "/vnpay-payment",{
            amount: amount
          })
          .then(response => response?.data?.data)
          .catch(error => error?.response);
      }
    MomoPay(amount) {
        return axiosPrivate
          .post(PAYMENT_URL + "/momo-payment",{
            amount: amount
          })
          .then(response => response?.data)
          .catch(error => error?.response);
      }


}

export default new PaymentService()
