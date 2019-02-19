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
		toolArchivesSource, toolBusinessModel, toolBusinessType, toolFollowupType, toolFollowupMode
	} from '../api/apiAll.js'//api
	
export default {
  name: 'index',
  data () {
    return {
    }
  },
  methods:{
		/**
		 * 获取 随访方式
		 */
		async getToolFollowupMode(){
			const res = await toolFollowupMode({token:this.userState.token});
			console.log(res);
			if(res.data&&res.data.errCode===0){
				this.$store.commit("global/SETFOLLOWUPMODE", res.data.body);
				console.log(this.global.followupMode)
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
				console.log(this.global.followupType)
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
				console.log(this.global.businessType)
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
				console.log(this.global.businessModule)
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
				console.log(this.global.fileSource)
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
				console.log(this.global.collaborationState)
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
		async getToolConsultationStatus(){
			const res = await toolConsultationStatus({token:this.userState.token});
			console.log(res);
			if(res.data&&res.data.errCode===0){
				this.$store.commit("global/SETCONSULTATIONSTATUS", res.data.body);
				console.log(this.global.consultationStatus)
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
				console.log(this.global.consultationType)
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
						console.log(this.global.departmentList)
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
				console.log(this.global.group)
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
				console.log(this.global.documentsClassification)
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
				console.log(this.global.userSource)
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
				console.log(this.global.hospitalArchives)
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
				console.log(this.global.prescriptionReviewStatus)
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
					console.log(this.global.prescriptionDistributionStatus)
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
					console.log(this.global.prescriptionAuditDoctor)
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
					console.log(this.global.PrescriptionDispenser)
				}else{
					this.$notify({
							title: '失败',
							message: '处方发药医生获取失败',
							type: 'error'
					});
				}
		},
  },
  components:{
  	top,
		navigation
  },
  computed:{
		...mapState({
				userState: state => state.user.userInfo,
				userSelfInfo:state => state.user.userSelfInfo, 
				global: state => state.global
		}),
  },
  created(){
		Promise.all([
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
			this.getToolConsultationStatus(),
			this.getToolSynergyStatus(),
			this.getToolArchivesSource(),
			this.getToolBusinessModel(),
			this.getToolBusinessType(),
			this.getToolFollowupType(),
			this.getToolFollowupMode(),
		]);
		
  }
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
		height: 100%;
	}
</style>
<!--
	这里是主要内容拼接的组件，暂时只有404页面不在这个组件之内，后期可能登录注册页面也不在这之内，其余内容基本都在这里拼接
	<div class="index-left">是左侧导航栏
	<div class="index-right">是右侧内容显示
		<div class="content-top">是头部内容，
		<div class="content-body">这块是灵活的，根据路由不同动态修改内容
-->