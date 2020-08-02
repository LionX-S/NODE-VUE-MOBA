import axios from 'axios'
import Vue from 'vue'
import router from './router/index'
const http=axios.create({
  // 设置环境变量 便于上线 VUE_APP_API_URL这个变量为开发环境用的url，打包时没有这个，则会用后面个这个admin
  baseURL:process.env.VUE_APP_API_URL||'/admin/api'
  // baseURL:'http://localhost:3000/admin/api'
});
http.interceptors.request.use(function (config) {
  // Do something before request is sent
  //请求头加token 加bearer为行业规范
  if(sessionStorage.token){
    config.headers.Authorization='Bearer '+(sessionStorage.token||'');
  }
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});
http.interceptors.response.use(res=>{
  return res;
},err=>{
  //错误通用处理方案，当服务端返回的状态码大于400时启用
  if(err.response.data.message){
    Vue.prototype.$message.error({
      type:'error',
      message:err.response.data.message
    })
  }
  if(err.response.status==401){
    router.push('/login')
  }
  return Promise.reject(err);
});

export default http