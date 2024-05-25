
import { axiosPrivate } from "api/axios";
import { BASE_URL } from "utils/Constant";

const ASK_URL = BASE_URL + '/asks';

class WithdrawService {
 
  getListReport(currentPage) {
    let url = ASK_URL + '/reports';
    if (currentPage !== undefined) {
      url += `?limit=4&page=${currentPage}`;
    }else{
      url += `?page=1&limit=100`;
    }
  
    return axiosPrivate
      .get(url)
      .then((response) => response?.data)
      .catch((error) => error)
  }  
  getListWithdraws(currentPage){
    let url = ASK_URL + '/withdraws';
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
  updateWithdrawStatus(withdrawId, status){
    return axiosPrivate
    .post(ASK_URL + `/handle-withdraw/${withdrawId}`, {
      status : status
    })
    .then((response) => response?.data)
    .catch((error) => error?.response);
  }
  getListReports(currentPage) {
    let url = ASK_URL + '/reports';
    if (currentPage !== undefined) {
      url += `?limit=4&page=${currentPage}`;
    }else{
      url += `?page=1&limit=100`;
    }
  
    return axiosPrivate
      .get(url)
      .then((response) => response?.data)
      .catch((error) => error)
  }  
  updateReportStatus(reportId, status){
    return axiosPrivate
    .post(ASK_URL + `/handle-report/${reportId}`, {
      status : status
    })
    .then((response) => response?.data)
    .catch((error) => error?.response);
  }

}

export default new WithdrawService();
