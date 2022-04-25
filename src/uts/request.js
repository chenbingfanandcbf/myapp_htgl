import Axios from 'axios'
import {Message} from 'element-ui'
//用const
const service = Axios.create({
  // 链接请求基地址
  baseURL: "http://www.ysqorz.top:8888/api/private/v1",
  // 超时时间
  timeout: 50000
})
//创建请求拦截器
service.interceptors.request.use(
  (config) => {
    const token=sessionStorage.getItem("token")
    config.headers[`Authorization`]=token
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)
//创建响应拦截器
service.interceptors.response.use(
  (res) => {
    const {
      meta: {
        msg,
        status: code
      },
      data: result
    } = res.data
    //请求成功code码
    console.log( msg)

    const successCode = [200, 201, 201]
    console.log(successCode.includes(code));
    if (successCode.includes(code)) {
      Message({
        message: msg,
        type: 'success'
      })
      if (res.config.url === '/login') {
        sessionStorage.setItem("token", result.token)
      }
      return result
    }
      Message({
        message: msg,
        type: 'error'
      })
      return Promise.reject(msg)
  },
  (error) => {
    return Promise.reject(error)
  }
)
export default service
