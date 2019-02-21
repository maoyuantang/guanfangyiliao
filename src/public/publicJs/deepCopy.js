export const deepCopy = obj => {
    let result;
    if(Object.prototype.toString.call(obj) === "[object Array]"){//是数组
        result = [];
        obj.forEach(item => result.push( deepCopy(item) ) );
    }else if(Object.prototype.toString.call(obj) === "[object Object]"){//是json
        result = {};
        for(const i in obj){
            result[i] = deepCopy(obj[i]);
        }
    }else{
        result = obj;
    }
    return result;
}
/**
 * 作用：传入一个参数（任意类型），对其进行拷贝并返回 
 * 
 * 用法：
 *      1、 import { deepCopy } from './../xxx/deepCopy.js' // 请注意路径
 *      2、 code：
 *          const test obj = {//测试数据
 *              a:123,
 *              b:'456',
 *              c:null,
 *              e:undefined,
 *              f:true,
 *              g:[
 *                  666,
 *                  '555',
 *                   {
 *                      aa:'have a test',
 *                      bb:['sad','wrwe']   
 *                   }
 *              ]
 *          };
 *          const copyTest = deepCopy(test);
 * 
 */