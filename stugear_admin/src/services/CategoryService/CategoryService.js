import { axiosPrivate } from "api/axios";
import { BASE_URL } from "utils/Constant";

const CATEGORY_URL = BASE_URL + "/categories";

class CategoryService {
  getAllCategories() {
    return axiosPrivate
      .get(CATEGORY_URL)
      .then((response) => response?.data)
      .catch((error) => error?.response);
  }
  uploadImage(id, formData) {
    return axiosPrivate
      .post(CATEGORY_URL + `/${id}/upload-image`, formData)
      .then((response) => response?.data?.data)
      .catch((error) => error?.response);
  }
  updateById(id, category){
    return axiosPrivate.patch(CATEGORY_URL + `/${id}`, {
      name : category?.name,
      description: category?.description
  })
    .then(response => response?.data?.data)
    .catch(error => error?.response)
  }
}

export default new CategoryService();
