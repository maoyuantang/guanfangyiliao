/**
 * 作用：检查字符串中是否有关键字，多用于input输入框，防止xxl
 * 使用：
 *      *引入
 *      *传入字符串
 *      *返回值 => {//格式json
 *          ok:Boolean,//是否通过检测，布尔值，true表示通过检测，key和msg（作用下面说）将为空字符串,false为不通过，key和msg将对错误说明
 *          key:String,//未通过的敏感字符串（注意：如果是空，ok也是false，但此时key是空字符串）
 *          msg:String//具体说明
 *      
 *  */
export default str => {
    "use strict";
    if(!str){
        return {
            ok:false,
            key:'',
            msg:'输入不能为空'
        }
    }
    if(Object.prototype.toString.call(str)!== "[object String]" ){
        return {
            ok:false,
            key:'',
            msg:'请传入字符串格式数据' 
        }
    }
    const words = ['&','<','>','"',"'",'/','javascript','http','https',' ','null'];
    for(const i of words){
        if(str.indexOf(i) != -1 ){
            return {
                ok:false,
                key:i,
                msg:`字符串${i}为关键字`
            }
        }
    }
    return {
        ok:true,
        key:'',
        msg:''
    }
}
