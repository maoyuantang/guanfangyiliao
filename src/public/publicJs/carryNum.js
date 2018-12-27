/**
 * 功能：将数字最高位进1，其余位置0
 * 使用：直接引入，传入一个数字即可
 * 返回值：{
            ok:Boolean,  //是否有错误，true表示有
            msg:String,  //错误信息
            data:null/number  //返回数据，若有错误返回null，正确返回一个数字
        }
 * 
 *  */
export default num => {
    "use strict";
    if(Object.prototype.toString.call(num)!=="[object Number]"){//验证参数类型
        return {
            ok:false,
            msg:'数据类型错误',
            data:null
        }
    }
    num = Math.ceil(num);//向上取整，主要为了解决小数
    num = num.toString();
    if(num.length === 1){//个位数
        return {
            data:parseInt(num),
            ok:true,
            msg:'',
        }
    }
    let bs = parseInt(num[0]) + 1;
    return {
        data:bs * Math.pow(10,num.length-1),
        ok:true,
        msg:'',
    }
}    