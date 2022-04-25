/**
 * 项目业务请求接口
 */
import request from "./request";
export function LoginApi(data) {
  return request({
    url: "/login",
    method: "POST",
    data,
  });
}
export function getMenus() {
  return request({
    url: "/menus",
    method: "GET",
  });
}
export function getUsers(obj) {
  return request({
    url: "/users",
    method: "get",
    params: obj,
  });
}
export function getAdd(from) {
  return request({
    url: "/users",
    method: "post",
    data: from,
  });
}
export function getDel(id) {
  return request({
    url: "/users/" + id,
    method: "delete",
    id,
  });
}
export function getBj(id, data) {
  return request({
    url: "/users/" + id,
    method: "put",
    data: data,
  });
}
