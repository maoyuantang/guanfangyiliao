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
                v-for="(item,index) in navList"
                :key="index"
                :class="nowNav===index?'new-content-content-item-select':''"
                @click="setNowNav(item,index)">
                    <p class="new-content-content-item-title">{{item.name}}</p>
                    <p class="new-content-content-item-info" v-for="(value,key) in item.infoList" :key="key">{{value}}</p>
                </div>
            </div>
        </div>
        <div class="new-content-body">
            <div class="new-content-body-nav">
                <!-- <div class="new-content-body-nav-item" 
                :class="navList[nowNav]?(navList[nowNav].childModuleIndex===index?'new-content-body-nav-item-select':''):''"
                v-for="(item,index) in navList[nowNav]?navList[nowNav].childModule:[]" 
                :key="index" 
                @click="selectChildItem(item,index)">
                    <div class="new-content-body-nav-item-name">{{item.name}}</div>
                    <div class="new-content-body-nav-item-time">{{item.time}}</div>
                </div> -->
                <div class="new-content-body-nav-item" 
                :class="showModules.index===index?'new-content-body-nav-item-select':''"
                v-for="(item,index) in showModules.list" 
                :key="index" 
                @click="selectChildItem(item,index)">
                    <div class="new-content-body-nav-item-name">{{item.name}}</div>
                    <div class="new-content-body-nav-item-time">{{item.time}}</div>
                </div>
            </div>
            <div class="new-content-body-content">
                {{navList[nowNav].childModule[navList[nowNav].childModuleIndex].code}}
                
                <div 
                :is="showModules.list[showModules.index]?showModules.list[showModules.index].code:''"
                :in-data="showModules.list[showModules.index]?showModules.list[showModules.index].data:{}"></div>
                <!-- <div 
                :is="navList[nowNav]?navList[nowNav].childModule[navList[nowNav].childModuleIndex].code:''"
                :in-data="navList[nowNav].childModule[navList[nowNav].childModuleIndex].data"></div> -->
            </div>
        </div>
    </div>
</template>

<script>
    import visitingRecord from './inSide/visitingRecord.vue'//就诊记录
    import prescription from './inSide/prescription.vue'//处方
    import check from './inSide/check.vue'//检验
    import oimage from './inSide/image.vue'//影像检查
    import admissionRecord from './inSide/admissionRecord.vue'//入院记录
    import medicalOrder from './inSide/medicalOrder.vue'//医嘱
    import anaesthesia from './inSide/anaesthesia.vue'//手术麻醉
    import nursing from './inSide/nursing.vue'//护理记录
    import examinationRecord from './inSide/examinationRecord.vue'//体检记录
    import allItems from './inSide/allItems.vue'//所有项目
    import hospitalizationOrder from './inSide/hospitalizationOrder.vue'//住院医嘱
    import comprehensive from './inSide/comprehensive.vue'//综合影像
    
	export default {
        props: ['inData'],
		components:{
            visitingRecord,
            prescription,
            check,
            oimage,
            admissionRecord,
            medicalOrder,
            anaesthesia,
            nursing,
            examinationRecord,
            allItems,
            hospitalizationOrder,
            comprehensive
		},
		watch:{
			
		},
		computed:{
			
		},
		
		data () {
			return {	
                nowNav:0,//当前模块索引
                showModules:{//显示子模块索列表，，，心烦  
                    index:0,
                    list:[]
                },
                navList:[
                    {
                        name:'门诊记录',//模块名称  navList[nowNav]?        
                        infoList:[//名称下边 信息
                            '就诊医院：XXXX医院',
                            '就诊时间：2018-12-25',
                            '就诊医院： XXXX科室',
                            '接诊医生：XXX'
                        ],
                        childModuleIndex:0,//显示子模块索引
                        childModule:[//子模块
                            {
                                name:'就诊记录',
                                code:'visitingRecord',
                                time:'2018-12-25',
                                data:{
                                    a:111
                                }
                            },
                            {
                                name:'处方',
                                code:'prescription',
                                time:'2018-12-25',
                                data:{
                                    b:22
                                }
                            },
                            {
                                name:'检验',
                                code:'check',
                                time:'2018-12-25',
                                data:{
                                    c:333
                                }
                            },
                            {
                                name:'影像检查',
                                code:'oimage',
                                time:'2018-12-25',
                                data:{
                                    d:444
                                }
                            },
                            {
                                name:'住院医嘱',
                                code:'hospitalizationOrder',
                                time:'2018-12-25',
                                data:{
                                    d:444
                                }
                            }
                        ]
                    },
                    {
                        name:'住院记录',//模块名称
                        infoList:[//名称下边 信息
                            '入住医院: 住院记录',
                            '入院时间: 2018-12-25',
                            '入住科室: XXXX科室',
                            '床 号:外科大楼5楼504'
                        ],
                        childModuleIndex:0,//显示子模块索引
                        childModule:[//子模块
                            {
                                name:'入院记录',
                                code:'admissionRecord',
                                time:'2018-12-25',
                                data:{
                                    e:555
                                }
                            },
                            {
                                name:'医嘱',
                                code:'medicalOrder',
                                time:'2018-12-25',
                                data:{
                                    f:666
                                }
                            },
                            {
                                name:'检验',
                                code:'check',
                                time:'2018-12-25',
                                data:{
                                    g:777
                                }
                            },
                            {
                                name:'影像检查',
                                code:'oimage',
                                time:'2018-12-25',
                                data:{
                                    h:888
                                }
                            },
                            {
                                name:'手术麻醉',
                                code:'anaesthesia',
                                time:'2018-12-25',
                                data:{
                                    i:999
                                }
                            },
                            {
                                name:'护理记录',
                                code:'nursing',
                                time:'2018-12-25',
                                data:{
                                    j:10
                                }
                            },
                            {
                                name:'体检记录',
                                code:'examinationRecord',
                                time:'2018-12-25',
                                data:{
                                    k:11-11
                                }
                            },
                            {
                                name:'所有项目',
                                code:'allItems',
                                time:'2018-12-25',
                                data:{
                                    l:12-12
                                }
                            },
                            {
                                name:'综合影像',
                                code:'comprehensive',
                                time:'2018-12-25',
                                data:{
                                    m:13-13
                                }
                            }
                        ]
                    },
                ],
                
			}
		},
		
		methods:{
			setNowNav(item,index){
                this.nowNav = index;
                this.showModules.list = item.childModule;
                // this.showModules.list = this.navList[this.nowNav].childModule
            },
            selectChildItem(item,index){
                // console.log(item)
                // console.log(index)
                // item.index = index;
                // this.navList[this.nowNav].childModuleIndex = index;
                this.showModules.index = index;
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
        cursor:pointer;
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
    .new-content-content-item-select{
        background-color: #e3f5ff;
    }
    .new-content-body-nav-item-select{
        border-left: #00A3FF 2px solid !important;
    }
</style>