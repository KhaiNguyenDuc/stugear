import { axiosPrivate } from "api/axios";
import { BASE_URL } from "utils/Constant";

const PRODUCT_URL = BASE_URL + "/products";

class ProductService {
  getAllProducts(currentPage) {
    let url = PRODUCT_URL;
    if (currentPage !== undefined) {
      url += `?page=${currentPage}&limit=6`;
    } else {
      url += `?page=1&limit=100`;
    }
    return axiosPrivate
      .get(url)
      .then((response) => response?.data)
      .catch((error) => error?.response);
  }
  updateStatus(id, statusId) {
    axiosPrivate.patch(PRODUCT_URL + `/status/${id}`, {
      status: statusId,
    });
  }

  adminUpdateStatus(id, statusId) {
    axiosPrivate.patch(PRODUCT_URL + `/admin/status/${id}`, {
      status: statusId,
    });
  }

  

  getGeneralStatus() {
    return axiosPrivate
      .get(PRODUCT_URL + "/general-status")
      .then((response) => response?.data?.data)
      .catch((error) => error?.response);
  }
}

export default new ProductService();
