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
                <div class="new-content-content-item" 
                v-for="(item,index) in userInfo.list" 
                :key="index" @click="selectModule(item,index)" 
                :class="nowNav===index?'new-content-content-item-select':''">
                    <!-- <p class="new-content-content-item-title">门诊记录</p> -->
                    <p class="new-content-content-item-info">入住医院:{{item.name}}</p>
                    <p class="new-content-content-item-info">入院时间{{item.time}}</p>
                    <p class="new-content-content-item-info">入住科室:{{item.department}}</p>
                    <p class="new-content-content-item-info">床    号:{{item.bedNum}}</p>
                </div>
            </div>
        </div>
        <div class="new-content-body">
            <div class="new-content-body-nav">
                <div class="new-content-body-nav-item" 
                @click="selectChildModule(item,index)" 
                v-for="(item,index) in userInfo.list[nowNav]?userInfo.list[nowNav].childModules:[]" 
                :class="userInfo.list[nowNav]?(userInfo.list[nowNav].showChildModuleIndex===index?'new-content-body-nav-item-select':''):''"
                :key="index">
                <!-- {{userInfo.list[nowNav]?(userInfo.list[nowNav].showChildModuleIndex===index?'new-content-body-nav-item-select':''):''}} -->
                    <div class="new-content-body-nav-item-name">{{item.name}}</div>
                    <div class="new-content-body-nav-item-time">{{item.time}}</div>
                </div>
            </div>
            <div class="new-content-body-content">
                <!-- {{userInfo.list[nowNav].childModules[userInfo.list[nowNav].showChildModuleIndex].code}} -->
                <!-- {{userInfo.list[nowNav].showChildModuleIndex}} -->
                <div 
                :is="userInfo.list[nowNav].childModules[userInfo.list[nowNav].showChildModuleIndex].code"
                :inData="userInfo.list[nowNav].childModules[userInfo.list[nowNav].showChildModuleIndex].data"></div>
            </div>
        </div>
    </div>
</template>

<script>
    import beHospitalized from './record/beHospitalized.vue'//首次入院记录
    import diseaseCourse from './record/diseaseCourse.vue'//首次病程记录
    import dailyDiseaseCourse from './record/dailyDiseaseCourse.vue'//日常病程记录
    import leaveHospital from './record/leaveHospital.vue'//出院记录
    import clinicalThermometer from './record/clinicalThermometer.vue'//体温表
	export default {
        props: ['inData'],
		components:{
            beHospitalized,
            diseaseCourse,
            dailyDiseaseCourse,
            leaveHospital,
            clinicalThermometer
		},
		watch:{
		},
		computed:{
			
		},
		
		data () {
			return {
                nowNav:0,
                /**
                 * 用户信息
                 */
                userInfo:{
                    list:[//住院信息  userInfo.list             userInfo.list[nowNav].childModules  
                        {
                            name:'XXXX医院',//入住医院,
                            time:'208-12-25 10:00',//入院时间
                            department:'XXXX科室',//入住科室
                            bedNum:'外科大楼5楼504',//床    号
                            showChildModuleIndex:0,//展示子模块索引（展示第几个子模块）
                            childModules:[//子模块
                                {
                                    code:'beHospitalized',//子模块识别码
                                    name:'首次入院记录',//子模块名称
                                    time:'208-12-25 10:00',//子模块时间
                                    data:{
                                        a:55
                                    },//子模块显示数据
                                },
                                {
                                    code:'diseaseCourse',//子模块识别码
                                    name:'首次病程记录',//子模块名称
                                    time:'208-12-25 10:00',//子模块时间
                                    data:{
                                        b:111
                                    },//子模块显示数据
                                },
                                {
                                    code:'dailyDiseaseCourse',//子模块识别码
                                    name:'日常病程记录',//子模块名称
                                    time:'208-12-25 10:00',//子模块时间
                                    data:{
                                        c:222
                                    },//子模块显示数据
                                },
                                {
                                    code:'leaveHospital',//子模块识别码
                                    name:'出院记录',//子模块名称
                                    time:'208-12-25 10:00',//子模块时间
                                    data:{
                                        d:333
                                    },//子模块显示数据
                                },
                                {
                                    code:'clinicalThermometer',//子模块识别码
                                    name:'体温表',//子模块名称
                                    time:'208-12-25 10:00',//子模块时间
                                    data:{
                                        e:444
                                    },//子模块显示数据
                                },
                            ]
                        },
                        {
                            name:'XXXX医院',//入住医院,
                            time:'208-12-25 10:00',//入院时间
                            department:'XXXX科室',//入住科室
                            bedNum:'外科大楼5楼504',//床    号
                            showChildModuleIndex:0,//展示子模块索引（展示第几个子模块）
                            childModules:[//子模块
                                {
                                    code:'beHospitalized',//子模块识别码
                                    name:'首次入院记录',//子模块名称
                                    time:'208-12-25 10:00',//子模块时间
                                    data:{
                                        f:666
                                    },//子模块显示数据
                                },
                                {
                                    code:'diseaseCourse',//子模块识别码
                                    name:'首次病程记录',//子模块名称
                                    time:'208-12-25 10:00',//子模块时间
                                    data:{
                                        g:777
                                    },//子模块显示数据
                                },
                                {
                                    code:'dailyDiseaseCourse',//子模块识别码
                                    name:'日常病程记录',//子模块名称
                                    time:'208-12-25 10:00',//子模块时间
                                    data:{
                                        h:888
                                    },//子模块显示数据
                                }
                            ]
                        },
                        // {
                        //     name:'XXXX医院',//入住医院,
                        //     time:'208-12-25 10:00',//入院时间
                        //     department:'XXXX科室',//入住科室
                        //     bedNum:'外科大楼5楼504',//床    号
                        //     hospitalInfo:{//患者在该医院信息
                        //         showModule:'beHospitalized',
                        //         beHospitalized:{//首次入院记录
                        //             name:'首次入院记录2',
                        //             data:{
                        //                 name:'2nd 首次入院记录2'
                        //             }
                        //         },
                        //         diseaseCourse:{//首次病程记录
                        //             name:'首次病程记录2',
                        //             data:{
                        //                 name:'2nd 首次病程记录2'
                        //             }
                        //         },
                        //         dailyDiseaseCourse:{//日常病程记录
                        //             name:'日常病程记录2',
                        //             data:{
                        //                 name:'2nd 日常病程记录2'
                        //             }
                        //         },
                        //         leaveHospital:{//出院记录
                        //             name:'出院记录2',
                        //             data:{
                        //                 name:'2nd 出院记录2'
                        //             }
                        //         },
                        //         clinicalThermometer:{//体温表
                        //             name:'体温表2',
                        //             data:{
                        //                 name:'2nd 体温表2'
                        //             }
                        //         }
                        //     },
                        // },
                        // {
                        //     name:'XXXX医院',//入住医院,
                        //     time:'208-12-25 10:00',//入院时间
                        //     department:'XXXX科室',//入住科室
                        //     bedNum:'外科大楼5楼504',//床    号
                        //     hospitalInfo:{//患者在该医院信息
                        //         showModule:'beHospitalized',
                        //         beHospitalized:{//首次入院记录
                        //             name:'首次入院记录3',
                        //             data:{
                        //                 name:'3th 首次入院记录3'
                        //             }
                        //         },
                        //         diseaseCourse:{//首次病程记录
                        //             name:'首次病程记录3',
                        //             data:{
                        //                 name:'3th 首次病程记录3'
                        //             }
                        //         },
                        //         dailyDiseaseCourse:{//日常病程记录
                        //             name:'日常病程记录3',
                        //             data:{
                        //                 name:'3th 日常病程记录3'
                        //             }
                        //         },
                        //         leaveHospital:{//出院记录
                        //             name:'出院记录3',
                        //             data:{
                        //                 name:'3th 出院记录3'
                        //             }
                        //         },
                        //         clinicalThermometer:{//体温表
                        //             name:'体温表3',
                        //             data:{
                        //                 name:'3th 体温表3'
                        //             }
                        //         }
                        //     },
                        // },
                    ],
                },
                
                
                
			}
		},
		
		methods:{
			/**
             * 获取用户信息
             */
            async getUserInfo(){

            },
            selectModule(item,index){
                this.nowNav = index;
            },
			selectChildModule(item,index){
                // this.userInfo.list[this.nowNav].hospitalInfo.showModule = item;
                this.userInfo.list[this.nowNav].showChildModuleIndex = index;
            },
		},
		async created(){
			// console.log(this.inData)
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
    .new-content-content-item-select{
        background-color: #e3f5ff;
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
        line-height: 32px;
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
        cursor:pointer;
    }
    .new-content-body-nav-item-select{
        border-left: #00A3FF 2px solid !important;
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