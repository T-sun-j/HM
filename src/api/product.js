import http from "@/request/http"
//url: "http://h5.diatal.com/home/wxfx",
/*
产品资料库获取页
1、请求链接：/api.php?action=material
2、请求参数：brand_secret //品牌对应的secret，如果不传，默认为第一个品牌
3、返回json：brand为品牌json数组，typeList对应当前品牌分类json，其中child为下级分类。
productList为当前产品list
*/
export function getMaterial(params) {
  return http.get("/api.php", {
    params
  });
}
/*
产品资料库点击分类后，请求对应产品
1、请求链接：/api.php?action=materialproductlist
2、请求参数：type_secret //分类对应的secret
3、返回json：productList为当前产品list
*/
export function getMaterialproductlist(params) {
  return http.get("/api.php", {
    params
  });
}
/*
产品资料库详情
1、请求链接：/api.php?action=productDetails
2、请求参数：secret 
3、返回json：senes为当前产品关联场景。feature为特色，docfile为下载文档
*/
export function getProductDetails(params) {
  return http.get("/api.php", {
    params
  });
}
/*
画册下载列表接口
1、请求链接：/api.php?action=getPictureList
2、请求参数：
3、返回json：pic为右侧图标，docfile为下载文档
*/
export function getPictureList(params) {
  return http.get("/api.php", {
    params
  });
}
