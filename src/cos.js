import COS from 'cos-js-sdk-v5'
// 配置API接口地址
import {root} from './config'

// 初始化实例
export const cos = new COS({
    // getAuthorization 必选参数
    getAuthorization: function (options, callback) {
        var url = `${root}/api/tx/v1/cos/sts`; // url替换成您自己的后端服务
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.onload = function (e) {
            try {
                var {data} = JSON.parse(e.target.responseText);
                data = JSON.parse(data)
                var credentials = data.credentials;
            } catch (e) {
              console.log(e)
            }
            if (!data || !credentials) {
              return console.error('credentials invalid:\n' + JSON.stringify(data, null, 2))
            };
            let obj = {
              TmpSecretId: credentials.tmpSecretId,
              TmpSecretKey: credentials.tmpSecretKey,
              SecurityToken: credentials.sessionToken,
              // 建议返回服务器时间作为签名的开始时间，避免用户浏览器本地时间偏差过大导致签名错误
              StartTime: data.startTime, // 时间戳，单位秒，如：1580000000
              ExpiredTime: data.expiredTime, // 时间戳，单位秒，如：1580000000
            }
            callback(obj);
        };
        xhr.send();
    }
});