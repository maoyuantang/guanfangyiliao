<!-- 电子病历 -->
<template>
	<div class="new-content">
        <div class="new-content-nav">
            <div class="new-content-userinfo">
                <div class="new-content-headimg">
                    <img :src="patientInfo.sex?'../../../static/assets/img/bingNan.png':'../../../static/assets/img/bingNv.png'" alt="">
                </div>
                <p class="new-content-username">{{patientInfo.name}}</p>
                <div class="new-content-msg">
                    <p class="new-content--msg-item">性别：{{patientInfo.sex ? '男' : '女'}}</p>
                    <p class="new-content--msg-item">年龄：{{patientInfo.age}}</p>
                    <p class="new-content--msg-item">身份证：{{patientInfo.idNo}}</p>
                </div>
            </div>
            <div class="new-content-content">
                <div class="new-content-content-item" 
                v-for="(item,index) in patientListInfo.list" 
                :key="index" @click="selectModule(item,index)" 
                :class="nowNav===index?'new-content-content-item-select':''">
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
                v-for="(item,index) in patientListInfo.list[nowNav]?patientListInfo.list[nowNav].childModules:[]" 
                :class="patientListInfo.list[nowNav]?(patientListInfo.list[nowNav].showChildModuleIndex===index?'new-content-body-nav-item-select':''):''"
                :key="index">
                    <div class="new-content-body-nav-item-name">{{item.name}}</div>
                    <div class="new-content-body-nav-item-time">{{item.time}}</div>
                </div>
            </div>
            <div class="new-content-body-content">
                <!-- {{showChildItem}} -->
                <!-- {{patientListInfo.list[nowNav].childModules[patientListInfo.list[nowNav].showChildModuleIndex].data}} -->
                <div 
                :is="showChildItem"
                :inData="showChildItemData"></div>
                <!-- <div class="new-content-body-content-botton">
                    <p>记录医生：{{showChildItemData.recordName}}</p>
                    <p>诊断时间{{showChildItemData.time}}</p>
                    <p>门诊流水：{{showChildItemData.inSno}}</p>
                </div> -->
            </div>
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    import {eMRList, getDoctorMessage1, eMRInRecord, eMRFirstCourse, eMREverydayCourse, eMRLeaveHospital} from '../../api/apiAll.js'
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
            inData(n){
                this.getUserInfo();
                this.getEMRList();
            }
		},
		computed:{
			...mapState({
				userInfo:state => state.user.userInfo,
                userSelfInfo:state => state.user.userSelfInfo,   
                global: state => state.global 
            }),
            showChildItem(){
                return this.patientListInfo.list[this.nowNav]?this.patientListInfo.list[this.nowNav].childModules[this.patientListInfo.list[this.nowNav].showChildModuleIndex].code:''
            },
            showChildItemData(){
                return this.patientListInfo.list[this.nowNav]?this.patientListInfo.list[this.nowNav].childModules[this.patientListInfo.list[this.nowNav].showChildModuleIndex]:null
            },
		},
		
		data () {
			return {
                nowNav:0,
                /**
                 * 患者信息
                 */
                patientInfo:{
                    name:'',//姓名
                    sex:'',//性别
                    age:'',//年龄
                    idNo:''//身份证
                },
                
                /**
                 * 用户信息
                 */
                patientListInfo:{
                    list:[//住院信息 
                        // {
                        //     name:'XXXX医院',//入住医院,
                        //     time:'208-12-25 10:00',//入院时间
                        //     department:'XXXX科室',//入住科室
                        //     bedNum:'外科大楼5楼504',//床    号
                        //     showChildModuleIndex:0,//展示子模块索引（展示第几个子模块）
                        //     childModules:[//子模块
                        //         {
                        //             code:'beHospitalized',//子模块识别码
                        //             name:'首次入院记录',//子模块名称
                        //             time:'208-12-25 10:00',//子模块时间
                        //             data:{
                        //                 a:55
                        //             },//子模块显示数据
                        //         },
                        //         {
                        //             code:'diseaseCourse',//子模块识别码
                        //             name:'首次病程记录',//子模块名称
                        //             time:'208-12-25 10:00',//子模块时间
                        //             data:{
                        //                 b:111
                        //             },//子模块显示数据
                        //         },
                        //         {
                        //             code:'dailyDiseaseCourse',//子模块识别码
                        //             name:'日常病程记录',//子模块名称
                        //             time:'208-12-25 10:00',//子模块时间
                        //             data:{
                        //                 c:222
                        //             },//子模块显示数据
                        //         },
                        //         {
                        //             code:'leaveHospital',//子模块识别码
                        //             name:'出院记录',//子模块名称
                        //             time:'208-12-25 10:00',//子模块时间
                        //             data:{
                        //                 d:333
                        //             },//子模块显示数据
                        //         },
                        //         {
                        //             code:'clinicalThermometer',//子模块识别码
                        //             name:'体温表',//子模块名称
                        //             time:'208-12-25 10:00',//子模块时间
                        //             data:{
                        //                 e:444
                        //             },//子模块显示数据
                        //         },
                        //     ]
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
                if(!this.inData)return;
                if(sessionStorage.getItem('showPatientList') === 'false')return;//新加功能
                const res = await getDoctorMessage1({
                    token:this.userInfo.token,
                    familyMemberId:this.inData.id
                });
                if(res.data && res.data.errCode === 0){
                    this.patientInfo = {
                        userId:res.data.body.userId,
                        id:res.data.body.id,
                        name:res.data.body.name,
                        sex:res.data.body.sex,//性别
                        age:res.data.body.age,//年龄
                        birthday:res.data.body.birthday,
                        phone:res.data.body.phone,
                        address:res.data.body.address,
                        isVisible:res.data.body.isVisible,
                        papersType:res.data.body.papersType,
                        idNo:res.data.body.identityCard//身份证
                    }
				}else{
					this.$notify({
						title: '患者信息获取失败',
						message: res.data.errMsg,  
						type: 'error'
					});
				}
            },
            /**
             * 2.电子病历列表 获取
             */
            async getEMRList(){
                // console.error(this.inData)
                // if(!this.inData)return;
                const ajaxOption = {
                    token:this.userInfo.token,
                    // familyMemberId:this.inData.id,
                    orgCode:this.userSelfInfo.orgCode,
                };
                sessionStorage.getItem('showPatientList') === 'false'?ajaxOption.familyMemberId=this.$route.query.id:ajaxOption.familyMemberId=this.inData.id;
                // if(sessionStorage.getItem('showPatientList') === 'false')return;//新加功能   
                const res = await eMRList(ajaxOption);
                if(res.data && res.data.errCode === 0){
                    this.patientListInfo.list = [];
                    res.data.body.forEach((item,index)=>{
                        this.patientListInfo.list.push({
                            name:item.hospitalName,
                            time:item.visitDtime,
                            department:item.deptName,
                            bedNum:item.bedNo,
                            showChildModuleIndex:0,
                            childModules:[
                                {
                                    code:'beHospitalized',//子模块识别码
                                    name:'首次入院记录',//子模块名称
                                    time:'',//子模块时间
                                    data:{
                                        a:55
                                    },//子模块显示数据
                                },
                                {
                                    code:'diseaseCourse',//子模块识别码
                                    name:'首次病程记录',//子模块名称
                                    time:'',//子模块时间
                                    data:{
                                        b:111
                                    },//子模块显示数据
                                },
                                {
                                    code:'dailyDiseaseCourse',//子模块识别码
                                    name:'日常病程记录',//子模块名称
                                    time:'',//子模块时间
                                    data:{
                                        c:222
                                    },//子模块显示数据
                                },
                                {
                                    code:'leaveHospital',//子模块识别码
                                    name:'出院记录',//子模块名称
                                    time:'',//子模块时间
                                    data:{
                                        d:333
                                    },//子模块显示数据
                                },
                                {
                                    code:'clinicalThermometer',//子模块识别码
                                    name:'体温表',//子模块名称
                                    time:'',//子模块时间
                                    data:{
                                        e:444
                                    },//子模块显示数据
                                },
                            ]
                        });
                        this.getAllChildrenModulesList(item.visitNo,index);
                    });
                    
                    
				}else{
					this.$notify({
						title: '患者信息获取失败',
						message: res.data.errMsg,  
						type: 'error'
					});
				}
            },
            /**
             * 获取 单个模块所有子模块列表数据
             */
            getAllChildrenModulesList(id,index){
                return Promise.all([
                    this.getEMRInRecord(id,index),
                    this.getEMRFirstCourse(id,index),
                    this.getEMREverydayCourse(id,index),
                    this.getEMRLeaveHospital(id,index),
                ])
                .then(resList => {
                    console.log(this.patientListInfo)
                })
                .catch(err => {
                    this.$notify({
						title: 'error',
						message: err,  
						type: 'error'
					});
                });
            },
            /**
             * 3.根据电子病历ID获取首次入院记录
             */
            async getEMRInRecord(id,index){
                if(!this.inData)return;
                const res = await eMRInRecord({
                    token:this.userInfo.token,
                    familyMemberId:this.inData.id,
                    orgCode:this.userSelfInfo.orgCode,
                    id
                });
                if(res.data && res.data.errCode === 0){
                    this.patientListInfo.list[index].childModules[0].time = res.data.body.recordDtime;
                    this.patientListInfo.list[index].childModules[0].data = res.data.body.contents;
                    this.patientListInfo.list[index].childModules[0].recordName = res.data.body.recordName;//记录医生
                    this.patientListInfo.list[index].childModules[0].inSno = res.data.body.inSno;//住院流水号
                    this.patientListInfo = Object.assign({},this.patientListInfo);
				}else{
					this.$notify({
						title: '首次入院记录获取失败',
						message: res.data.errMsg,  
						type: 'error'
					});
				}
            },
            /**
             * 12.根据电子病历ID获取首次病程记录
             */
            async getEMRFirstCourse(id,index){
                if(!this.inData)return;
                const res = await eMRFirstCourse({
                    token:this.userInfo.token,
                    familyMemberId:this.inData.id,
                    orgCode:this.userSelfInfo.orgCode,
                    id
                });
                if(res.data && res.data.errCode === 0){
                    this.patientListInfo.list[index].childModules[1].time = res.data.body[0].recordDtime;
                    this.patientListInfo.list[index].childModules[1].data = res.data.body[0].contents;
                    this.patientListInfo.list[index].childModules[1].recordName = res.data.body[0].recordName;//记录医生
                    this.patientListInfo.list[index].childModules[1].inSno = res.data.body[0].inSno;//住院流水号
                    this.patientListInfo = Object.assign({},this.patientListInfo);
				}else{
					this.$notify({
						title: '首次病程记录获取失败',
						message: res.data.errMsg,  
						type: 'error'
					});
				}
            },
            /**
             * 13.根据电子病历ID获取日常病程记录
             */
            async getEMREverydayCourse(id,index){
                if(!this.inData)return;
                const res = await eMREverydayCourse({
                    token:this.userInfo.token,
                    familyMemberId:this.inData.id,
                    orgCode:this.userSelfInfo.orgCode,
                    id
                });
                if(res.data && res.data.errCode === 0){
                    this.patientListInfo.list[index].childModules[2].time = res.data.body[0].recordDtime;
                    this.patientListInfo.list[index].childModules[2].data = res.data.body[0].contents;
                    this.patientListInfo.list[index].childModules[2].recordName = res.data.body[0].recordName;//记录医生
                    this.patientListInfo.list[index].childModules[2].inSno = res.data.body[0].inSno;//住院流水号
                    this.patientListInfo = Object.assign({},this.patientListInfo);
				}else{
					this.$notify({
						title: '日常病程记录获取失败',
						message: res.data.errMsg,  
						type: 'error'
					});
				}
            },
            /**
             * 14.根据电子病历ID获取出院记录
             */
            async getEMRLeaveHospital(id,index){
                if(!this.inData)return;
                const res = await eMRLeaveHospital({
                    token:this.userInfo.token,
                    familyMemberId:this.inData.id,
                    orgCode:this.userSelfInfo.orgCode,
                    id
                });
                if(res.data && res.data.errCode === 0){
                    this.patientListInfo.list[index].childModules[3].time = res.data.body[0].recordDtime;
                    this.patientListInfo.list[index].childModules[3].data = res.data.body[0].contents;
                    this.patientListInfo.list[index].childModules[3].recordName = res.data.body[0].recordName;//记录医生
                    this.patientListInfo.list[index].childModules[3].inSno = res.data.body[0].inSno;//住院流水号
                    this.patientListInfo = Object.assign({},this.patientListInfo);
				}else{
					this.$notify({
						title: '出院记录获取失败',
						message: res.data.errMsg,  
						type: 'error'
					});
				}
            },
            selectModule(item,index){
                this.nowNav = index;
            },
			selectChildModule(item,index){
                this.patientListInfo.list[this.nowNav].showChildModuleIndex = index;
            },
		},
		async created(){
            console.log(78979878979)
            this.getUserInfo();
            this.getEMRList();
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
        padding-left: 0.78rem;
        padding-top: .8rem;
    }
    /* .new-content-body-content-botton{
        font-size: 0.14rem;
        color: #4cb0e7;
    } */
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