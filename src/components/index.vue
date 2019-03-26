<template>
  <div class="index">
		<div class="index-left">
			<navigation></navigation>
		</div>
		<div class="index-right">
			<div class="content-top">
				<top></top>
			</div>
			<div class="content-body">
				<router-view/>
			</div>
		</div>
  </div>
</template>

<script>
	import { mapState ,mapMutations  } from 'vuex'
	import top from '@/components/index/top.vue'
	import navigation from '@/components/index/navigation.vue'
	import { 
		fetchHospitalDepts, toolMemberGroup, toolArchivesType, toolUserSource, toolArchivesInside, toolRxReviewStatus,
		toolRxSendStatus, toolRxReviewDoctors, toolRxSendDoctors, toolConsultationType, toolConsultationStatus, toolSynergyStatus, 	
		toolArchivesSource, toolBusinessModel, toolBusinessType, toolFollowupType, toolFollowupMode, toolFollowupContent, toolSurveyType,
		toolSurveyMode, toolDeviceType, toolFollowupHasPlan, queryTypeList, toolMedicalType, toolMedicalGrading, toolReferralType,
		getAllHospital, toolDept, stateList
	} from '../api/apiAll.js'//api
	
export default {
  name: 'index',
  data () {
    return {
    }
  },
  methods:{
	  /**
	   * 获取 筛选 科室列表(管理端)
	   */
	  async getManToolDept(){
		  const res = await toolDept({
			  	type:'MANAGE',
				token:this.userState.token
		  });
		//   console.log(res);
			if(res.data&&res.data.errCode===0){
				this.$store.commit("global/SETMANTOOLDEPT", res.data.body);
				// console.log(this.global.manToolDept)
			}else{
				this.$notify({
					title: '失败',
					message: '管理端筛选栏科室列表获取失败', 
					type: 'error'
				});
			}
	  },
	  /**
	   * 获取 筛选 科室列表(医生端)
	   */
	  async getDocToolDept(){
		  const res = await toolDept({
			  	type:'DOCTOR',
				token:this.userState.token
		  });
		//   console.log(res);
			if(res.data&&res.data.errCode===0){
				this.$store.commit("global/SETDOCTOOLDEPT", res.data.body);
				// console.log(this.global.docToolDept)
			}else{
				this.$notify({
					title: '失败',
					message: '医生端筛选栏科室列表获取失败', 
					type: 'error'
				});
			}
	  },
	  /**
	   * 获取 所有医院
	   */
	  async getAllHospital(){
		  const res = await getAllHospital({token:this.userState.token});
			// console.log(res);
			if(res.data&&res.data.errCode===0){
				this.$store.commit("global/SETALLHOSPITAL", res.data.body);
				// console.log(this.global.allHospital)
			}else{
				this.$notify({
						title: '失败',
						message: '医院列表获取失败', 
						type: 'error'
				});
			}
	  },
		/**
		 * 获取 双向转诊 方向 
		 */
		async getToolReferralType(){
			const res = await toolReferralType({token:this.userState.token});
			// console.log(res);
			if(res.data&&res.data.errCode===0){
				this.$store.commit("global/SETTWOREFERRALDIRECTION", res.data.body);
				// console.log(this.global.TwoReferralDirection)
			}else{
				this.$notify({
						title: '失败',
						message: '双向转诊方向获取失败', 
						type: 'error'
				});
			}
		},
		/**
		 * 获取 分级诊疗 分级
		 */
		async getToolMedicalGrading(){
			const res = await toolMedicalGrading({token:this.userState.token});
			// console.log(res);
			if(res.data&&res.data.errCode===0){
				this.$store.commit("global/SETCLASSIFICATIONDIAGNOSISTREATMENT", res.data.body);
				// console.log(this.global.classificationDiagnosisTreatment)
			}else{
				this.$notify({
						title: '失败',
						message: '分级诊疗分级获取失败', 
						type: 'error'
				});
			}
		},
		/**
		 * 获取 分级诊疗 类型
		 */
		async getToolMedicalType(){
			const res = await toolMedicalType({token:this.userState.token});
			// console.log(res);
			if(res.data&&res.data.errCode===0){
				this.$store.commit("global/SETLASSIFEDTREATMNTDIAGNOSISTYPES", res.data.body);
				// console.log(this.global.classifiedTreatmentDiagnosisTypes)
			}else{
				this.$notify({
						title: '失败',
						message: '分级诊疗类型获取失败', 
						type: 'error'
				});
			}
		},
		
		/**
		 * 获取 文章类型列表
		 */
		async getQueryTypeList(){
			const res = await queryTypeList({token:this.userState.token});
			// console.log(res);
			if(res.data&&res.data.errCode===0){
				this.$store.commit("global/SETARTCLELISTTYPES", res.data.body);
				// console.log(this.global.articleListTypes)
			}else{
				this.$notify({
						title: '失败',
						message: '文章类型列表获取失败', 
						type: 'error'
				});
			}
		},
		/**
		 * 获取 随访计划
		 */
		async getToolFollowupHasPlan(){
			const res = await toolFollowupHasPlan({token:this.userState.token});
			// console.log(res);
			if(res.data&&res.data.errCode===0){
				this.$store.commit("global/SETFOLLOWUPPLAN", res.data.body);
				// console.log(this.global.followupPlan)
			}else{
				this.$notify({
						title: '失败',
						message: '随访计划获取失败', 
						type: 'error'
				});
			}
		},
		/**
		 * 获取 设备类型
		 */
		async getToolDeviceType(){
			const res = await toolDeviceType({token:this.userState.token});
			// console.log(res);
			if(res.data&&res.data.errCode===0){
				this.$store.commit("global/SETEQUIPMENTTYPE", res.data.body);
				// console.log(this.global.equipmentType)
			}else{
				this.$notify({
						title: '失败',
						message: '设备类型获取失败', 
						type: 'error'
				});
			}
		},
		/**
		 * 获取 调查方式
		 */
		async getToolSurveyMode(){
			const res = await toolSurveyMode({token:this.userState.token});
			console.log(res);
			if(res.data&&res.data.errCode===0){
				this.$store.commit("global/SETINVESTIGATIONMETHOD", res.data.body);
				// console.log(this.global.investigationMethod)
			}else{
				this.$notify({
						title: '失败',
						message: '调查方式获取失败',
						type: 'error'
				});
			}
		},

		/**
		 * 获取 调查类型
		 */
		async getToolSurveyType(){
			const res = await toolSurveyType({token:this.userState.token});
			console.log(res);
			if(res.data&&res.data.errCode===0){
				this.$store.commit("global/SETSURVEYTYPES", res.data.body);
				// console.log(this.global.surveyTypes)
			}else{
				this.$notify({
						title: '失败',
						message: '调查类型获取失败',
						type: 'error'
				});
			}
		},

		/**
		 * 获取 随访内容
		 */
		async getToolFollowupContent(){
			const res = await toolFollowupContent({token:this.userState.token});
			console.log(res);
			if(res.data&&res.data.errCode===0){
				this.$store.commit("global/SETFOLLOWUPCONTENT", res.data.body);
				// console.log(this.global.followupContents)
			}else{
				this.$notify({
						title: '失败',
						message: '随访内容获取失败',
						type: 'error'
				});
			}
		},
		/**
		 * 获取 随访方式
		 */
		async getToolFollowupMode(){
			const res = await toolFollowupMode({token:this.userState.token});
			console.log(res);
			if(res.data&&res.data.errCode===0){
				this.$store.commit("global/SETFOLLOWUPMODE", res.data.body);
				// console.log(this.global.followupMode)
			}else{
				this.$notify({
						title: '失败',
						message: '随访方式获取失败',
						type: 'error'
				});
			}
		},

		/**
		 * 获取 随访类型
		 */
		async getToolFollowupType(){
			const res = await toolFollowupType({token:this.userState.token});
			console.log(res);
			if(res.data&&res.data.errCode===0){
				this.$store.commit("global/SETFOLLOWUPTYPE", res.data.body);
				// console.log(this.global.followupType)
			}else{
				this.$notify({
						title: '失败',
						message: '随访类型获取失败',
						type: 'error'
				});
			}
		},

		/**
		 * 获取 业务类型
		 */
		async getToolBusinessType(){
			const res = await toolBusinessType({token:this.userState.token});
			console.log(res);
			if(res.data&&res.data.errCode===0){
				this.$store.commit("global/SETBUSINESSTYPE", res.data.body);
				// console.log(this.global.businessType)
			}else{
				this.$notify({
						title: '失败',
						message: '业务类型获取失败',
						type: 'error'
				});
			}
		},

		/**
		 * 获取 业务模块
		 */
		async getToolBusinessModel(){
			const res = await toolBusinessModel({token:this.userState.token});
			console.log(res);
			if(res.data&&res.data.errCode===0){
				this.$store.commit("global/SETBUSINESSMODULE", res.data.body);
				// console.log(this.global.businessModule)
			}else{
				this.$notify({
						title: '失败',
						message: '业务模块获取失败',
						type: 'error'
				});
			}
		},

		/**
		 * 获取 档案来源
		 */
		async getToolArchivesSource(){
			const res = await toolArchivesSource({token:this.userState.token});
			console.log(res);
			if(res.data&&res.data.errCode===0){
				this.$store.commit("global/SETFILESOURCE", res.data.body);
				// console.log(this.global.fileSource)
			}else{
				this.$notify({
						title: '失败',
						message: '档案来源获取失败',
						type: 'error'
				});
			}
		},

		/**
		 * 获取 协作状态
		 */
		async getToolSynergyStatus(){
			const res = await toolSynergyStatus({token:this.userState.token});
			console.log(res);
			if(res.data&&res.data.errCode===0){
				this.$store.commit("global/SETCOLLABORATIONSTATE", res.data.body);
				// console.log(this.global.collaborationState)
			}else{
				this.$notify({
						title: '失败',
						message: '协作状态获取失败',
						type: 'error'
				});
			}
		},


		/**
		 * 获取 会诊状态
		 */
		async getStateList(){
			const res = await stateList({token:this.userState.token});
			console.log(res);
			if(res.data&&res.data.errCode===0){
				this.$store.commit("global/SETCONSULTATIONSTATUS", res.data.body);
				// console.log(this.global.consultationStatus)
			}else{
				this.$notify({
						title: '失败',
						message: '会诊状态获取失败',
						type: 'error'
				});
			}
		},

		/**
		 * 获取 会诊类型
		 */
		async getToolConsultationType(){
			const res = await toolConsultationType({token:this.userState.token});
			console.log(res);
			if(res.data&&res.data.errCode===0){
				this.$store.commit("global/SETCONSULTATONTYPE", res.data.body);
				// console.log(this.global.consultationType)
			}else{
				this.$notify({
						title: '失败',
						message: '会诊类型获取失败',
						type: 'error'
				});
			}
		},
		/**
		 * 获取 科室列表
		 */
		async getHospitalDepts(){
				const res = await fetchHospitalDepts({
						orgCode:this.userSelfInfo.orgCode,
						deptId:''
				});
				console.log(res)
				if(res.data&&res.data.errCode===0){
						this.$store.commit("global/SETDEPARTENTLIST", res.data.body)
						// console.log(this.global.departmentList)
				}else{
						this.$notify({
								title: '失败',
								message: '科室列表获取失败',
								type: 'error'
						});
				} 
		},

		/**
		 * 获取分组
		 */
		async getGroup(){
			const res = await toolMemberGroup({token:this.userState.token});
			console.log(res);
			if(res.data&&res.data.errCode===0){
				this.$store.commit("global/SETGROUP", res.data.body);
				// console.log(this.global.group)
			}else{
				this.$notify({
						title: '失败',
						message: '分组列表获取失败',
						type: 'error'
				});
			}
		},

		/**
		 * 获取  档案分类
		 */
		async getDocumentsClassification(){
			const res = await toolArchivesType({token:this.userState.token});
			console.log(res);
			if(res.data&&res.data.errCode===0){
				this.$store.commit("global/SETDOCUMENTSCLASSIFICATION", res.data.body);
				// console.log(this.global.documentsClassification)
			}else{
				this.$notify({
						title: '失败',
						message: '档案分类获取失败',
						type: 'error'
				});
			}
		},

		/**
		 * 获取 用户来源
		 */
		async getUserSource(){
			const res = await toolUserSource({token:this.userState.token});
			console.log(res);
			if(res.data&&res.data.errCode===0){
				this.$store.commit("global/SETUSERSOURCE", res.data.body);
				// console.log(this.global.userSource)
			}else{
				this.$notify({
						title: '失败',
						message: '用户来源获取失败',
						type: 'error'
				});
			}
		},

		/**
		 * 获取  院内档案
		 */
		async getHospitalArchives(){
			const res = await toolArchivesInside({token:this.userState.token});
			console.log(res);
			if(res.data&&res.data.errCode===0){
				this.$store.commit("global/SETHOSPITALARCHIVES", res.data.body);
				// console.log(this.global.hospitalArchives)
			}else{
				this.$notify({
						title: '失败',
						message: '用户来源获取失败',
						type: 'error'
				});
			}
		},

		/**
		 * 获取 处方审核状态
		 */
		async getToolRxReviewStatus(){
			const res = await toolRxReviewStatus({token:this.userState.token});
			console.log(res);
			if(res.data&&res.data.errCode===0){
				this.$store.commit("global/SETPRESCRIPTIONREVIEWSTATUS", res.data.body);
				// console.log(this.global.prescriptionReviewStatus)
			}else{
				this.$notify({
						title: '失败',
						message: '处方审核状态获取失败',
						type: 'error'
				});
			}
		},

		/**
		 * 获取 处方配送状态
		 */
		async getToolRxSendStatus(){
				const res = await toolRxSendStatus({token:this.userState.token});
				console.log(res);
				if(res.data&&res.data.errCode===0){
					this.$store.commit("global/SETPRESCRIPTIONDISTRIBUTIONSTATUS", res.data.body);
					// console.log(this.global.prescriptionDistributionStatus)
				}else{
					this.$notify({
							title: '失败',
							message: '处方审核状态获取失败',
							type: 'error'
					});
				}
		},

		/**
		 * 获取 处方审核医生
		 */
		async getToolRxReviewDoctors(){
			const res = await toolRxReviewDoctors({token:this.userState.token});
				console.log(res);
				if(res.data&&res.data.errCode===0){
					this.$store.commit("global/SETPRESCRIPTIONAUDITDOCTOR", res.data.body);
					// console.log(this.global.prescriptionAuditDoctor)
				}else{
					this.$notify({
							title: '失败',
							message: '处方审核医生获取失败',
							type: 'error'
					});
				}
		},

		/**
		 * 获取 处方发药医生
		 */
		async getToolRxSendDoctors(){
			const res = await toolRxSendDoctors({token:this.userState.token});
				console.log(res);
				if(res.data&&res.data.errCode===0){
					this.$store.commit("global/SETPRESCRIPTIONDISPENSER", res.data.body);
					// console.log(this.global.PrescriptionDispenser)
				}else{
					this.$notify({
							title: '失败',
							message: '处方发药医生获取失败',
							type: 'error'
					});
				}
		},
		/**
		 * 调用 全局 通用 接口
		 */
		fetchAll(){
			if(this.userState.rooter)return;
			return Promise.all([
				this.getHospitalDepts(),
				this.getGroup(),
				this.getDocumentsClassification(),
				this.getUserSource(),
				this.getHospitalArchives(),
				this.getToolRxReviewStatus(),
				this.getToolRxSendStatus(),
				this.getToolRxReviewDoctors(),
				this.getToolRxSendDoctors(),
				this.getToolConsultationType(),
				this.getStateList(),
				this.getToolSynergyStatus(),
				this.getToolArchivesSource(),
				this.getToolBusinessModel(),
				this.getToolBusinessType(),
				this.getToolFollowupType(),
				this.getToolFollowupMode(),
				this.getToolFollowupContent(),
				this.getToolSurveyType(),
				this.getToolSurveyMode(),
				this.getToolDeviceType(),
				this.getToolFollowupHasPlan(),
				this.getQueryTypeList(),
				this.getToolMedicalType(),
				this.getToolMedicalGrading(),
				this.getToolReferralType(),
				this.getAllHospital(),
				this.getManToolDept(),
				this.getDocToolDept()
			]);
		}
  },
  components:{
  	top,
		navigation
  },
  computed:{
		...mapState({
				userState: state => state.user.userInfo,
				userSelfInfo:state => state.user.userSelfInfo, 
				global: state => state.global,
		}),
  },
  created(){
	this.fetchAll();
  },
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.index{
		height: 100%;
		display: flex;
		/* flex-direction: column; */
	}
	.index-left{
		min-height: 100%;
		width: 2.08rem;
		background-color: var(--navigationBgColor);
	}
	.index-right{
		flex: 1;
		min-height: 100%;
		/* display: flex;
		flex-direction: column; */
		overflow: auto;
		
	}
	.content-top{
		height: 0.6rem;
	}
	.content-body{
		background-color: var(--bgColoor1);
		padding-top: 0.25rem;
		padding-left: 0.37rem;
		flex: 1;
		/* overflow-y: auto; */
		/* height: 100%; */
	}
</style>
<!--
	这里是主要内容拼接的组件，暂时只有404页面不在这个组件之内，后期可能登录注册页面也不在这之内，其余内容基本都在这里拼接
	<div class="index-left">是左侧导航栏
	<div class="index-right">是右侧内容显示
		<div class="content-top">是头部内容，
		<div class="content-body">这块是灵活的，根据路由不同动态修改内容
-->