<template>
	<div class="login">
		login
        <div>
            {{userCount}}
        </div>
	</div>
</template>

<script>
    import { mapState } from 'vuex'
    import {testA} from '../api/test.js'
    import {testC} from '../api/test.js'
    import {getLoginCode,login} from '../api/apiAll.js'//api
    import createUUID from '../public/publicJs/createUUID.js'
	export default {
		data () {
			return {
				
			}
        },
        computed:{
            	...mapState({
                    userCount: state => state.user.userInfo,
                })
        },
		methods:{
			setUserInfo(){
                const options = {
                    isLogin:false,//是否登录，true是，false否.默认未登录
					account:'',//账号
					passwd:'',//密码
					token:'',//免密登录标识
					rooter:false,//是否超级管理员；true是，false否,默认false
					manager:false,//是否医院管理员；true是，false否,默认false
					completion:false,//是否已经完善信息；true是，false否 ,默认false
					sign:'',//接口签名串的加密串 
					hasAuth:[//拥有的权限 
						/**
						 * 
						 * hasAuth.type => 权限类型,类型String，1,科室管理权限.2,医生业务
						 * hasAuth.authorityId => 权限标识符,类型String
						 * 
						 *  */
						// {"type": "1","authorityId": "10000"}
					],
					hospitalCode:'',//医院代码
                };
                const testData = this.$store.commit("user/SETUSERINFO", 5)
                console.log("testData")
                console.log(testData)  
		  	},
		},
		async created(){
            // getLoginCode()
            // .then(res=>console.log(res))
           const user = await login({
                "account":"gftechadmin",
                "passwd":"111111",
                "captcha":"",
                "agreement":true,
                "appDevice":"WEB"
            });
            console.log(user) 

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
</style>