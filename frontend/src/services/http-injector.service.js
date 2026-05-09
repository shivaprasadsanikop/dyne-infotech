// import getapiService from './http-Get.service';
import { DATA_API_CONSTANT } from './constant/api.constant';
import httpGetService from './http-Get.service';
import httpPutService from './http-put.service';
import httpDeleteService from './http-delete.service';
import httpPostService from './http.Post.service';


const listProducts = (userId) => {
   const url = `${DATA_API_CONSTANT.LIST_PRODUCTS}`;
   return httpGetService.getDataFromAPI(url);
}

const getDashboardData = (userId) => {
   const url = `${DATA_API_CONSTANT.DASHBOARD_DATA}`;
   return httpGetService.getDataFromAPI(url);
}

const addProducts = (data) => {
  return httpPostService.postTOAPI(
    DATA_API_CONSTANT.ADD_PRODUCTS,
    data,
  )
}


const httpInjectorService = {
 listProducts,
  getDashboardData,
  addProducts,
};

export default httpInjectorService;