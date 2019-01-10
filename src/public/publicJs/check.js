"use strict"
export default class Check{
    constructor(str,...args){
        this.str = str;
        this.words = ['&','<','>','"',"'",'/','javascript','http','https',' '];
    }
    say(){
        console.log('test')
        console.log(this.str)
    };
    /**
     * 检查是否有关键字
     * 返回值{
     *  ok:Boolean,//是否有关键字，true表示没有，false表示有
     *  msg:string,//当ok为false时提示信息，true时为空
     *  key:string//包含哪一个关键字，ok为true时为空
     * }
     */
    wordsCheck(){
        if(!this.str)return{ok:false,msg:'输入为空',key:''};
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
     * 检测是否是手机号
     */
    phone(){
        if(!this.str)return{ok:false,msg:'输入为空',};

    };

    /**
     * 翻转字符串
     * 返回值{
     *  ok:Boolean,//是否
     *  msg:string,//
     *  data:string//
     * }
     */
    reverseStr(){
        if(!this.str)return{ok:false,msg:'输入为空',data:''};
        return {ok:true,data:this.str.split("").reverse().join(""),msg:''}
    };
}