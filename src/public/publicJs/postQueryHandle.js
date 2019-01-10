"use strict"
import md5 from 'js-md5'
// import store from '../../vuex/index.js'
import jsonSort from './jsonSort.js'
// const sign = store.state.user.userInfo.sign;//签名

/**
 * post hearder sign处理（data是需要发送的数据，但是处理完后的只是header的sign，传参任然是原来的data）
 * 1：json重新排序
 * 2：json转string
 * 3: 将传入参数和上面字符串排序，然后拼接
 * 4：将上面字符串拼接上sign签名
 * 5：md5加密
 * 6：转大写
 */
export default (data={}) => {
    if(Object.prototype.toString.call(data)!=="[object Object]")return{ok:false,msg:'参数类型必须为json'};
    const store = require('../../vuex/index.js');
    // console.log(store)
    const sign = store.default.state.user.userInfo.sign;//签名
    const token = store.default.state.user.userInfo.token;//token
    data = jsonSort(data);
    data = JSON.stringify(data);
    const newArr = [data,token];
    newArr.sort();
    data = newArr[0]+newArr[1];
    data += sign;
    data = md5(data);
    data = data.toUpperCase();//转大写
    return data;
}