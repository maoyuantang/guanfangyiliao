<template>
	<div class="login">
        <div class="login-content">
            <p class="login-title">账号登录</p>
            <div class="login-input-div">
                <span class="login-input-name">账号</span>
                <input type="text" name="" placeholder="请输入手机号/账号" class="login-input" v-model="account.text"> 
            </div>
            <div class="login-check-box-div">
                <el-radio-group v-model="way">
                    <el-radio :label="true">密码登录</el-radio>
                    <el-radio :label="false">验证码登录</el-radio>
                </el-radio-group>


                <!-- <el-radio v-model="way" @click="setWayTrue">密码登录</el-radio>
                <el-radio v-model="checkBoxStatus[1]" @click="setWayFalse">验证码登录</el-radio> -->
                    <!-- <Checkbox >密码登录</Checkbox>
                    <Checkbox v-model="checkBoxStatus[1]" @click="setWayFalse">验证码登录</Checkbox> -->
            </div>
            <div class="login-input-div">
                <span class="login-input-name">{{way?"密码":"验证码"}}</span>
                <input type="password" name="" placeholder="请输入手机号/账号" class="login-input" v-model="passwd.text">
                <span class="get-code" v-if="!way" @click="getCode">发送验证码</span>
            </div>
            <div class="login-btn-div">
                <span class="login-btn" @click="loginMethod">登录</span>
            </div>
        </div>
	</div>
</template>

<script>

    import sensitiveWordCheck from '../public/publicJs/sensitiveWordCheck.js'
    import { Base64 } from 'js-base64'
    import jsonSort from '../public/publicJs/jsonSort.js'
    import countRoot from '../public/publicJs/countRoot.js'
    import websocket from "../common/websocket.js"
    import { mapState } from 'vuex'
    import {testA} from '../api/test.js'
    import {testC} from '../api/test.js'
    import {getLoginCode,login,userInfo} from '../api/apiAll.js'//api
    import createUUID from '../public/publicJs/createUUID.js'
    /****************** */
    import selectTree from '../public/publicComponents/selectTree.vue'
import { setTimeout } from 'timers';
	export default {
        components:{
            selectTree
        },
        watch:{
            way(n){console.log(n)},
        },
		data () {
			return {
                way:true,//登录方式，true为密码登录，false为验证码登录，默认true
                account:{
                    text:'admin',//gftechadmin
                    ok:true
                },//账号
                passwd:{
                    text:'111111',
                    ok:true
                },//密码
                checkBoxStatus:[true,false],
            } 
        },
        computed:{
            ...mapState({
                userState: state => state.user.userInfo,
            }),
        },
		methods:{
            setWayTrue(){
                this.checkBoxStatus[0] = true;
                this.checkBoxStatus[1] = false;
                this.way = true;
            },
            setWayFalse(){
                this.checkBoxStatus[0] = false;
                this.checkBoxStatus[1] = true;
                this.way = false;
            },

           /**
            * 传入 字符串
            * 输出 json 
            * {
            *   ok:boolean,//是否成功
            *   msg:str//若成功，msg代指翻转后的字符串，；若失败则是失败信息
            * }
            */
            reverseStr(str){

                if(Object.prototype.toString.call(str)!=="[object String]")return{ok:false,msg:'参数类型必须是字符串'};
                return {
                    ok:true,
                    msg:str.split("").reverse().join("") 
                }
            },


            /**
             * 检查帐号是否正确
             */
            checkAccount(){
                let str = this.account.text;
                const isOk = sensitiveWordCheck(str);
                if(!isOk.ok){
                    this.$notify.error({
                        title: '验证失败',
                        message: isOk.msg
                    });
                    this.account.ok = false;
                    return false;
                }
                const testAccount = /^[a-zA-Z].*/;//检查首位是否有字母（有说明是帐号，没有说明是手机号）
                if(testAccount.test(str)){
                    
                }else{
                    const testPhone = /^1[34578]\d{9}$/;
                    if(!testPhone.test(str)){
                        this.$notify.error({
                            title: '验证失败',
                            message: '帐号格式有误'
                        });
                        this.account.ok = false;
                        return false;
                    }
                    
                }
                this.account.ok = true;
                // console.log(this.account)
            },

            /**
             * 检查密码
             */
            checkPasswd(){
            
                let str = this.passwd.text;
                const isOk = sensitiveWordCheck(str);
                if(!isOk.ok){
                    this.$notify.error({
                        title: '验证失败',
                        message: isOk.msg
                    });
                    this.passwd.ok = false;
                    return false;
                }
                this.passwd.ok = true;
            },

            /**
             * 获取验证码
             */
            async getCode(){
                if(!this.account.ok)return;
                const reData = await getLoginCode({phone:this.account});
                // console.log(reData)
                if(reData.data&&reData.data.errCode===0){//成功
                }else{//失败
                    this.$notify.error({
                        title: '获取验证码失败',
                        message: reData.data.errMsg
                    });
                }
            },

            /**
             * 获取用户信息(注意：这里用户登录和获取用户信息在后台是分开的，也就是说，登录成功不会返回某些用户信息，需要再调用这个接口)
             */
            async getUserInfo(){
                if(!this.account.ok || !this.passwd.ok)return;
                const options = {
                   token:this.userState.token,
                   oneself:true
                //    userId:'',//等后台怎么说
                };
                let res;
                try{
                    res = await userInfo(options);
                }catch(e){e=>console.log(e)}
                // console.log(res);
                if(res.data.errCode === 0){//登录成功
                    this.$store.commit("user/SETUSERSELFINFO",res.data.body);
                    sessionStorage.setItem('userSelfInfo',JSON.stringify(res.data.body));
                    // this.$router.push({path:'/'})
                }else{
                    this.$message({
                        showClose: true,
                        message: res.errMsg,
                        type: 'error'
                    });
                }
                this.$router.push({path:'/'})
            },

           

            /**
             * 登录
             */
            async loginMethod(){
                if(!this.account.ok || !this.passwd.ok)return;//账号信息是否有误
                const options = {
                    account:this.account.text,
                    agreement:true,
                    appDevice:"WEB"
                };
                this.way?options.passwd=this.passwd.text:options.captcha=this.passwd.text;
                const res = await login(options);
                // console.log(res.data);
                if(res.data&&res.data.errCode===0){//成功
                    res.data.body.isLogin = true;//添加个字段，方便前端操作
                    const sign = this.reverseStr(res.data.body.sign);//翻转sign
                    if(sign.ok){
                        res.data.body.sign = sign.msg
                    }else{
                        this.$alert('sign翻转失败', 'sign翻转失败', {
                            confirmButtonText: '确定',
                            callback: action => {
                                this.$message({
                                type: 'info',
                                message: `action: ${ action }`
                                });
                            }
                        });
                    }
                    // console.log(res.data.body.sign);
                    res.data.body.sign = Base64.decode(res.data.body.sign)
                    this.$store.commit("user/SETUSERINFO",res.data.body);
                    const root = countRoot({//计算用户的权限，f**k
                        rooter:res.data.body.rooter,
                        manager:res.data.body.manager,
                        hasAuth:res.data.body.hasAuth
                    });
                    console.log(root);
                    this.$store.commit("user/SETROOT",root);
                    // console.log(res.data.body.sign);
                    sessionStorage.setItem('userInfo',JSON.stringify(res.data.body));
                    // console.log(sessionStorage.getItem('userInfo'))
                    // this.$router.push({path:'/'})
                    this.getUserInfo();
                    websocket.initWebSocket(this.userState.token)
                }else{//失败
                    this.$notify.error({
                        title: '登录失败',
                        message: res.data.errMsg
                    });
                }
            },
            conRedata(data){console.log(data)}
		},
		async created(){
        //    setTimeout(()=>console.log(this.$refs.tree.getCheckedKeys()),10000)
            return;


            let json = {
                "adc":"123",
                "ccc":"234",
                "mm":{
                    "aa":"33333",
                    "vv":"dd",
                    "cc":{
                        "ttt":'44',
                        "nnn":"66"
                    }
                },
                "bb":"444",
                "zz":[
                    '1','2','3'
                ]
                
            }
            const newJson = jsonSort(json)
            // console.log(newJson)

            // getLoginCode()
            // .then(res=>console.log(res))
        //    const user = await login({
        //         "account":"gftechadmin",
        //         "passwd":"111111",
        //         "captcha":"",
        //         "agreement":true,
        //         "appDevice":"WEB"
        //     });
        //     console.log(user) 

            console.log(createUUID())//生成uuid
           
		}
	}
</script>

<style scoped>
	.login{
        width: 100%;
        height: 100%;
        background: url(../assets/login_background.png) no-repeat;
        background-size: cover;
    }
    .login-content{
        width: 3.8rem;
        /* border: 1px solid red; */
        position: absolute;
        right: 10vw;
        top: 36vh;
    }
    .login-input-div{
        display: flex;
        align-items: center;
    }
    .login-input-name{
        display: flex;
        width: 0.5rem;
    }
    .login-input{
        flex: 1;
    }
    .login-title{
        font-size: 0.36rem;
        color: var(--color4);
        letter-spacing: 0;
        padding: 0;
        margin-bottom: 0.72rem;
    }
    .login-input-div{
        position: relative;
        width: 100%;
        height: 0.4rem;
        border: 1px solid #D4DEE7;
        border-radius: 2px;
    }
    .login-input-div input{
        border: none;
        background: transparent;
        outline: none;
    }
    .get-code{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 1.15rem;
        height: 100%;
        background-color: var(--color4);
        color: #fff;
        cursor: pointer;
    }
    .login-check-box-div{
        text-align: right;
    }
    .login-btn-div{
        height: 0.4rem;
        margin-top: 0.46rem;
    }
    .login-btn{
        display: flex;
        width: 100%;
        height: 100%;
        justify-content: center;
        align-items: center;
        background-color: var(--color4);
        color: #fff;
        cursor: pointer;
    }
    .login-check-box-div{
        margin-top: 0.21rem;
        margin-bottom: 0.32rem;
    }
</style>


// const test = {
//     z:45456,
//     y:56564654,
//     a:454545,
//     w:4545454,
//     wed:45415,
//     aw:45,
//     cg:45,
//     jsh:{
//         hdsj:5445,
//         dush:797
//     }
// }
// const cf = obj => {//json转数组
//     const arr = [];
//     const toarr = data =>{
//         for(const i in data){
//             const sjson = {};
//             if(Object.prototype.toString.call(i) === "[object Object]"){
//                 sjson.name = i;
//                 sjson.value = toarr(data[i])
//             }else{
               
//                 sjson.name = i;
//                 sjson.value = obj[i]
//             }
//             return sjson
//         }
        
//     }
//     return toarr(arr)
// }
// const px = prop => {//数组排序
//     return (a,b)=>{
//         return a[prop] > b[prop] ? 1 : -1 
//     }
// }
// const toJson = arr => {
//     const newJson = {};
//     for(let i of arr){
//         newJson[i.name] = i.value
//     }
//     return newJson
// }