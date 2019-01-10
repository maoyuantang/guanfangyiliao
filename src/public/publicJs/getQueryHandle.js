"use strict"
import md5 from 'js-md5'
// import store from '../../vuex/index.js'
import jsonSort from './jsonSort.js'
// const sign = store.state.user.userInfo.sign;//签名

/**
 * get 参数处理
 * 1：json重新排序
 * 2：循环递归取出json值,拼成string
 * 3：将上面字符串拼接上sign签名
 * 4：md5加密
 */
export default (data={}) => {
    if(Object.prototype.toString.call(data)!=="[object Object]")return{ok:false,msg:'参数类型必须为json'};
    const store = require('../../vuex/index.js');
    const sign = store.default.state.user.userInfo.sign;//签名
    const token = store.default.state.user.userInfo.token;//token
    data = jsonSort(data);
    function getData(data){//循环递归取出json值
        let str = '';
        for(let i in data){
            if(Object.prototype.toString.call(data[i])==="[object Object]"){
                let childStr = getData(data[i]);
                str += childStr;
            }else if(Object.prototype.toString.call(data[i])==="[object Array]"){
                for(let j of data[i]){
                    const reData = getData(j)
                    str += reData;
                }
            }else{
                str += data[i];
            }
        }
        return str;
    }
    data = getData(data);
    const newArr = [data,token];
    newArr.sort();
    data = newArr[0]+newArr[1];
    data += sign;
    data = md5(data);
    data = data.toUpperCase();//转大写
    return data;
}