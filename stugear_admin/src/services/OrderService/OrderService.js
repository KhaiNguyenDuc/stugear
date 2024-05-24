
import { axiosPrivate } from "api/axios";
import { BASE_URL } from "utils/Constant";

const ORDER_URL = BASE_URL + '/orders';

class OrderService {
 
    getAllOrders(currentPage){
        let url = ORDER_URL;
        if (currentPage !== undefined) {
          url += `?limit=4&page=${currentPage}`;
        }else{
          url += `?page=1&limit=100`;
        }
    
        return axiosPrivate
          .get(url)
          .then((response) => response?.data)
          .catch((error) => error?.response);
      }
      updateStatusByAdmin(orderId, status){
        return axiosPrivate
        .patch(ORDER_URL + `/${orderId}/admin`, {
          status: status
        })
        .then((response) => response?.data?.data)
        .catch((error) => error?.response);
      }
}

export default new OrderService();
