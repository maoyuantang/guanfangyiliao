<template>
	<div class="login">
        <div class="login-content">
            <p class="login-title">账号登录</p>
            <div class="login-input-div">
                <span class="login-input-name">账号</span>
                <input type="text" name="" placeholder="请输入手机号/账号" class="login-input" v-model="account.text" @blur="checkAccount"> 
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
                <input type="password" name="" placeholder="请输入手机号/账号" class="login-input" v-model="passwd.text" @blur="checkPasswd">
                <span class="get-code" v-if="!way" @click="getCode">发送验证码</span>
            </div>
            <div class="login-btn-div">
                <span class="login-btn" @click="loginMethod">登录</span>
            </div>
        </div>
	</div>
</template>

<script>
import websocket from "../common/websocket.js"
     import sensitiveWordCheck from '../public/publicJs/sensitiveWordCheck.js'
    import { mapState } from 'vuex'
    import {testA} from '../api/test.js'
    import {testC} from '../api/test.js'
    import {getLoginCode,login} from '../api/apiAll.js'//api
    import createUUID from '../public/publicJs/createUUID.js'
	export default {
        watch:{
            way(n){console.log(n)}
        },
		data () {
			return {
                way:true,//登录方式，true为密码登录，false为验证码登录，默认true
                account:{
                    text:'',
                    ok:false
                },//账号
                passwd:{
                    text:'',
                    ok:false
                },//密码
                checkBoxStatus:[true,false]
			}
        },
        computed:{
            	...mapState({
                    userState: state => state.user.userInfo,
                }),

        },
		methods:{
			setUserInfo(data){
                // const options = {
                //     isLogin:false,//是否登录，true是，false否.默认未登录
				// 	account:'',//账号
				// 	passwd:'',//密码
				// 	token:'',//免密登录标识
				// 	rooter:false,//是否超级管理员；true是，false否,默认false
				// 	manager:false,//是否医院管理员；true是，false否,默认false
				// 	completion:false,//是否已经完善信息；true是，false否 ,默认false
				// 	sign:'',//接口签名串的加密串 
				// 	hasAuth:[//拥有的权限 
				// 		/**
				// 		 * 
				// 		 * hasAuth.type => 权限类型,类型String，1,科室管理权限.2,医生业务
				// 		 * hasAuth.authorityId => 权限标识符,类型String
				// 		 * 
				// 		 *  */
				// 		// {"type": "1","authorityId": "10000"}
				// 	],
				// 	hospitalCode:'',//医院代码
                // };
                const testData = this.$store.commit("user/SETUSERINFO",data)
               
              },
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
                console.log(this.account)
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
                console.log(reData)
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
                };
                const res = await userInfo(options);
                console.log(res);
                if(res.data.errCode === 0){//登录成功
                    this.$store.commit("user/SETUSERSELFINFO",res.data.body);
                    this.$router.push({path:'/'})
                }else{
                    this.$message({
                        showClose: true,
                        message: res.errMsg,
                        type: 'error'
                    });
                }
            },

            /**
             * 登录
             */
            async loginMethod(){
                console.log('enter')
                console.log(this.account.ok)
                console.log(this.passwd.ok)
                if(!this.account.ok || !this.passwd.ok)return;
                const options = {
                    account:this.account.text,
                    agreement:true,
                    appDevice:"WEB"
                };
                this.way?options.passwd=this.passwd.text:options.captcha=this.passwd.text;
                const res = await login(options);
                console.log(res);
                if(res.data&&res.data.errCode===0){//成功
                    res.data.body.isLogin = true;
                    this.$store.commit("user/SETUSERINFO",res.data.body);
                    sessionStorage.setItem('userInfo',JSON.stringify(res.data.body))
                  
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
                    res.data.body.sign = Base64.decode(res.data.body.sign)
                    this.$store.commit("user/SETUSERINFO",res.data.body);
                    console.log(res.data.body.sign);
                    sessionStorage.setItem('userInfo',JSON.stringify(res.data.body));
                    this.getUserInfo();
                    websocket.initWebSocket(this.userState.token)
                }else{//失败
                    this.$notify.error({
                        title: '登录失败',
                        message: res.data.errMsg
                    });
                }
            },

            /**
             *通过登录信息，计算用户权限，存入vuex 
             */
            setViewRoot(data){
                let reData = {//计算后的数据
                    now:{},//当前显示权限，有三个权限，超级管理员rooter, 医院管理员manager，医生doctors
                    rooter:[],//超级管理员
                    manager:[//医院管理员
                        {
                            name:'首页',
                            select:true,
                            path:'/',
                            code:'1'//这个code有空写个不重复的，虽然暂时还用不到，以后怕是有点用
                        }
                    ],
                    doctors:[//医生
                        {
                            name:'首页',
                            select:true,
                            path:'/',
                            code:'1'
                        }
                    ]
                };
                if(data.rooter){//如果是超级管理员，直接赋值，这个是固定的，直接写，并且直接返回，是超级管理员就不能是医院管理员或者医生身份
                    reData.rooter = [
                        {
                            name:'医院管理',
                            select:true,
                            path:'/',
                            code:'2'
                        },
                        {
                            name:'云存储管理',
                            select:false,
                            path:'/cloudManagement',
                            code:'3'
                        }
                    ];
                    reData.now = {
                        name:'rooter',
                        type:'0'
                    }	
                    this.$store.commit("user/SETVIEWROOT",reData);
                    sessionStorage.setItem('viewRoot',JSON.stringify(reData));//缓存将权限下来
                    return;
                }
                for(let i of this.allPages){
                    for(let j of data.hasAuth){
                        if(j.authorityId === i.code){
                            j.type==='1'?reData.manager.push(i):reData.doctors.push(i)
                        }
                    }
                }
                if(reData.manager.length>1){//为什么是大于1？因为我一开始就在里面放了个元素，还有为什么我不用用户的身份判断？因为那东西是真的水，根据产品设计，用户不是管理员也有可能操作管理员页面~~~！
                    reData.now = {
                        name:'manager',
                        type:'1'
                    }	
                }else if(reData.doctors.length>1){
                    reData.now = {
                        name:'doctors',
                        type:'2'
                    }
                }
                this.$store.commit("user/SETVIEWROOT",reData);
                sessionStorage.setItem('viewRoot',JSON.stringify(reData));//缓存将权限下来
            }
		},
		async created(){
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
        background: url(../assets/img/login_background.png) no-repeat;
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