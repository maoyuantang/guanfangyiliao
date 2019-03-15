<!-- 电子病历 -->
<template>
	<div class="new-content">
        <div class="new-content-nav">
            <div class="new-content-userinfo">
                <div class="new-content-headimg">
                    <img src="../../../static/assets/img/a-6.png" alt="">
                </div>
                <p class="new-content-username">kition</p>
                <div class="new-content-msg">
                    <p class="new-content--msg-item">性别：男</p>
                    <p class="new-content--msg-item">年龄：20</p>
                    <p class="new-content--msg-item">省份证：500222111111111111</p>
                </div>
            </div>
            <div class="new-content-content">
                <div class="new-content-content-item" v-for="(item,index) in 9" :key="index">
                    <p class="new-content-content-item-title">门诊记录</p>
                    <p class="new-content-content-item-info">就诊医院：xxx医院</p>
                    <p class="new-content-content-item-info">就诊时间：2018-12-12</p>
                    <p class="new-content-content-item-info">就诊医院：xxx科室</p>
                    <p class="new-content-content-item-info">接诊医生：xxx</p>
                </div>
            </div>
        </div>
        <div class="new-content-body">
            <div class="new-content-body-nav">
                <div class="new-content-body-nav-item">
                    <div class="new-content-body-nav-item-name">首次入院记录</div>
                    <div class="new-content-body-nav-item-time">2018-12-12</div>
                </div>
            </div>
            <div class="new-content-body-content">
                record
            </div>
        </div>
    </div>
</template>

<script>
	export default {
        props: ['inData'],
		components:{
			
		},
		watch:{
			
		},
		computed:{
			
		},
		
		data () {
			return {
                /**
                 * 用户信息
                 */
                userInfo:{
                    // headImg:'',//头像
                    // name:'',//姓名
                    // sex:'',//性别
                    // age:30,//年龄
                    // IDCard:'',//省份证号
                    // hospitalizationInfo:[//住院信息
                    //     {}
                    // ]
                }	
			}
		},
		
		methods:{
			/**
             * 获取用户信息
             */
            async getUserInfo(){

            },
			
		},
		async created(){
			console.log(this.inData)
		}
	}
</script>

<style scoped>
	.new-content{
        display: flex;
    }
    .new-content-nav{
        width: 3.4rem;
        min-height: 100%;
        border: 1px solid #E5E7E9;
        padding-left: 6px;
        padding-right: 22px;
        margin-right: .3rem;
    }
    .new-content-userinfo{
        padding-left: .15rem;
    }
    .new-content-headimg{
        padding-top: .18rem;
    }
    .new-content-headimg>img{
        display: block;
        width: 0.98rem;
        height: 0.98rem;
        border-radius: 50%;
        margin: 0 auto;
    }
    .new-content-username{
        font-family: PingFangSC-Regular;
        font-size: 13px;
        color: #97A3B4;
        line-height: 22px;
        text-align: center;
        padding-top: .18rem;
        margin-bottom: 0.43rem;
    }
    .new-content--msg-item{
        font-family: PingFangSC-Regular;
        font-size: 13px;
        color: #97A3B4;
        line-height: 22px;
        padding-bottom: .18rem;
    }
    .new-content-content-item{
        border-top: 1px solid;
        padding-bottom: .35rem;
        padding-left: .15rem;
        cursor: pointer;
    }
    .new-content-content-item:hover{
        background-color: #e3f5ff;
    }
    .new-content-content-item:nth-child(3n+0){
        border-color: #0064FF;
    }
    .new-content-content-item:nth-child(3n+1){
        border-color: #00d983;
    }
    .new-content-content-item:nth-child(3n+2){
        border-color: #FFDB00;
    }
    .new-content-content-item-title{
        font-family: PingFangSC-Semibold;
        font-size: 13px;
        color: #002257;
        line-height: 22px;
        font-weight: bold;
    }
    .new-content-content-item-info{
        font-family: PingFangSC-Regular;
        font-size: 13px;
        color: #97A3B4;
        line-height: 22px;
    }
    .new-content-body{
        border: 1px solid #E5E7E9;
        flex: 1;
        display: flex;
    }

    .new-content-body-nav{
        width: 1.9rem;
        border-right: 1px solid #E5E7E9;
    }
    .new-content-body-content{
        /* background-color: grey; */
        flex: 1;
    }
    .new-content-body-nav-item{
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        height: 1.5rem;
        border-bottom: 1px solid #E5E7E9;
    }
    .new-content-body-nav-item:last-child{
        /* border: none; */
    }
    .new-content-body-nav-item-name{
        font-family: PingFangSC-Semibold;
        font-size: 13px;
        color: #002257;
        line-height: 22px;
    }
    .new-content-body-nav-item-time{
        font-family: PingFangSC-Regular;
        font-size: 13px;
        color: #97A3B4;
        line-height: 22px;
    }
</style>