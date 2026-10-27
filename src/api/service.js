import http from "@/request/yxRequest";

/**
 * 获取网点列表
 * @param {Object} data - { page, pagesize, city }
 */
export function getNetList(data) {
  // 路径必须以 /harman 开头，才能命中 vue.config.js 中的代理规则
  return http.post("/harman/index.php/Mobile/MiniIOInterface/getNetList", data);
}
