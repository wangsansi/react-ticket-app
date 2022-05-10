// 引用axios
import { history } from './router/history.js';
import axios from 'axios';
import { MessagePlugin,DialogPlugin } from 'tdesign-react';

// 配置API接口地址
import {root} from './config'

const alertDialog = (data) => {
  const alertDia = DialogPlugin.alert({
    header: data.title || '系统错误',
    body: data.msg,
    onConfirm: ({ e }) => {
      alertDia.hide();
      data.confirm && data.confirm()
    },
    onClose: ({ e, trigger }) => {
      alertDia.hide();
      data.confirm && data.confirm()
    },
  });
};
const confirmDialog = (data) =>{
  const mydialog = DialogPlugin({
    header: data.title || '系统消息',
    body: data.msg,
    onConfirm: ({ e }) => {
      if(data.confirm){
        let func = data.confirm[0]
        let parmas = data.confirm[1]
        func(parmas)
      }  
      mydialog.hide();
    },
    onClose: ({ e, trigger }) => {
      if(data.cancel) {
        let func = data.cancel[0]
        let parmas = data.cancel[1]
        func(parmas)
      }
      mydialog.hide();
    },
  })
}


// 参数过滤函数
function filterNull (o) {
  for (var key in o) {
    if (o[key] === null || o[key] === undefined || o[key] === '') {
      delete o[key]
    }
    if (typeof o[key] === 'string') {
      o[key] = o[key].trim()
    } else if (typeof o[key] === 'object') {
      o[key] = filterNull(o[key])
    } else if (typeof o[key] === 'array') {
      o[key] = filterNull(o[key])
    }
  }
  return o
}

function apiAxios (method, url, params) {
    const token = window.localStorage.getItem("token");
    // const navigate = useNavigate();
    if (params) {
        params = filterNull(params)
    }
    let options = {
        method: method,
        url: `/api${url}`,
        data: method === 'POST' || method === 'PUT' ? params : null,
        params: method === 'GET' || method === 'DELETE' ? params : null,
        baseURL: `${root}`,
        headers: {'Authorization':token},
        withCredentials: false
    };
    options = filterNull(options)
    return new Promise((resolve, reject)=>{
        axios(options).then(function (res) {
        if (res.data.code === 0) {
            resolve(res.data)         
        } else {
            console.log(`api-err:[${root}${url}]`,res.data)
            if (res.data.code === '10003' || res.data.code === '10002' || res.data.code === '10001') {
              alertDialog({msg: '登录过期，请重新登录', confirm:()=>{history.push('/login')}})    
              reject(res.data)
            } else {
              reject(res.data)
            }
        }
        }).catch(function (err) {
            console.log(`axios-err:[${root}${url}]`,err)
            if(err.message === 'Network Error') {
              MessagePlugin.info('网络错误', 2 * 1000);
              reject()
            } else {
              reject(err)
            }
            
        })
    })
}

export default {
  get: function (url, params) {
    return apiAxios('GET', url, params)
  },
  post: function (url, params) {
    return apiAxios('POST', url, params)
  },
  put: function (url, params) {
    return apiAxios('PUT', url, params)
  },
  delete: function (url, params) {
    return apiAxios('DELETE', url, params)
  },
  dialog: {
    confirm: (data) => {
      return confirmDialog(data)
    },
    alert: (data)=>{
      return alertDialog(data)
    }
  },
  message: {
    success: (message,duration)=>{
      return MessagePlugin.success(message,duration)
    },
    info: (message,duration)=>{
      return MessagePlugin.info(message,duration)
    },
    warning: (message,duration)=>{
      return MessagePlugin.warning(message,duration)
    },
    error: (message,duration)=>{
      return MessagePlugin.error(message,duration)
    }
  }
}