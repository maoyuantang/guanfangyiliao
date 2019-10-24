"use strict"
/**
 * 字符串检测
 */
export default class Check{
    constructor(str,...args){
        this.str = str;
        this.words = ['&','<','>','"',"'",'/','javascript','http','https',' ','null'];
    }
    /**
     * 检查是否有关键字
     * 返回值{
     *  ok:Boolean,//是否有关键字，true表示没有，false表示有
     *  msg:string,//当ok为false时提示信息，true时为空
     *  key:string//包含哪一个关键字，ok为true时为空
     * }
     */
     wordsCheck(){
        if(Object.prototype.toString.call(this.str)!== "[object String]" )return{ok:false,msg:'请输入字符串',key:''};
        // if(!this.str)return{ok:false,msg:'输入为空',key:''};
        for(const i of this.words){
            if(this.str.indexOf(i) != -1 ){
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
    };

    /**
     * 检测手机号格式是否正确
     * 返回值{
     *  ok:Boolean,//格式是否正确，true为正确
     *  msg:string//错误信息
     * }
     */
    phone(){
        if(!this.str)return{ok:false,msg:'输入为空',};
        const testPhone = /^1[34578]\d{9}$/;
        if(!testPhone.test(this.str)){
            return{ok:false,msg:'手机号格式错误',}
        }
        return{ok:true,msg:'手机号格式正确',}
    };

    /**
     * 翻转字符串
     * 返回值{
     *  ok:Boolean,//是否有错误
     *  msg:string,//错误信息
     *  data:string//翻转后的字符串
     * }
     */
    reverseStr(){
        if(!this.str)return{ok:false,msg:'输入为空',data:''};
        return {ok:true,data:this.str.split("").reverse().join(""),msg:''}
    };
}

