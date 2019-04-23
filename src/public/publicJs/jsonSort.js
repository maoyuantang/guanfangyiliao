"use strict"
export default jsonData => {
    function objKeySort(arys) { 
        //先用Object内置类的keys方法获取要排序对象的属性名，再利用Array原型上的sort方法对获取的属性名进行排序，newkey是一个数组
        let newkey = Object.keys(arys).sort();　　 
        //console.log('newkey='+newkey);
        let newObj = {}; //创建一个新的对象，用于存放排好序的键值对
        for(let i = 0; i < newkey.length; i++) {
          let value =   arys[newkey[i]];
          if(value instanceof Object && !(value instanceof Array)){
             let res =  objKeySort(value);
             newObj[newkey[i]] = res;
          }else{
            //遍历newkey数组
            newObj[newkey[i]] = arys[newkey[i]]; 
            //向新创建的对象中按照排好的顺序依次增加键值对
          }
        }
        return newObj; //返回排好序的新对象
    }
    return objKeySort(jsonData);
} 
/**
 * 后端要求对json排序，但是json是无序的，是不能排序的，但是后端坚持，只好使用先写入先读取的特性重新写一遍json，变相实现，但是注意json不能排序
 */