<template>
	<div class="doctors-index">
		{{authMap.find(item=>item.authorityId==='3000')}}
		<!-- 顶部三个模块  远程门诊  移动查房  远程教育 -->
		<div class="doctors-index-top">
			<div class="doctors-index-top-module" v-if="authMap.find(item=>item.authorityId==='10000')">
				<oneTangOut></oneTangOut>
			</div>
			<div class="doctors-index-top-fg"></div>
			<div class="doctors-index-top-module" v-if="authMap.find(item=>item.authorityId==='90000')">
				<rounds></rounds>
			</div>
			<div class="doctors-index-top-fg"></div>
			<div class="doctors-index-top-module" v-if="authMap.find(item=>item.authorityId==='60000')">
				<education></education>
			</div>
			
		</div>
		<!-- 随访相关三个模块 今日计划 告警 近期随访 -->
		<div class="doctors-index-suifang" v-if="authMap.find(item=>item.authorityId==='40000')">
			<!-- 今日计划 -->
			<div class="doctors-index-suifang-module">
				<plan></plan>
			</div>

			<!-- 告警 -->
			<div class="doctors-index-suifang-module">
				<alarm></alarm>
			</div>

			<!-- 近期随访 -->
			<div class="doctors-index-suifang-module">
				<followUp></followUp>
			</div>
		</div>
		<!-- 通用三个模块 双向转诊  远程会诊 远程协作 -->
		<div class="doctors-index-normal">
			<!-- 双向转诊 -->
			<div class="doctors-index-normal-module" v-if="authMap.find(item=>item.authorityId==='80000')">
				<oneTangRef></oneTangRef>
			</div>

			<!-- 远程会诊 -->
			<div class="doctors-index-normal-module" v-if="authMap.find(item=>item.authorityId==='20000')">
				<consultation></consultation>
			</div>

			<!-- 远程协作 -->
			<div class="doctors-index-normal-module" v-if="authMap.find(item=>item.authorityId==='30000')">
				<cooperation></cooperation>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapState } from 'vuex'
	import rounds from './doctorsIndex/rounds.vue'
	import education from './doctorsIndex/education.vue'
	import oneTangManage from './doctorsIndex/oneTangManage.vue'//终端系统
	import oneTangMedical from './doctorsIndex/oneTangMedical.vue'//分级
	import oneTangOut from './doctorsIndex/oneTangOut.vue'//门诊
	import oneTangRef from './doctorsIndex/oneTangRef.vue'//双向转诊
	import consultation from './doctorsIndex/consultation.vue'//远程会诊
	import cooperation from './doctorsIndex/cooperation.vue'//远程协作
	import plan from './doctorsIndex/plan.vue'//今日计划
	import alarm from './doctorsIndex/alarm.vue'//告警
	import followUp from './doctorsIndex/followUp.vue'//近期随访
	export default {
		components:{
			rounds,
			education,
			oneTangManage,
			oneTangMedical,
			oneTangOut,
			oneTangRef,
			consultation,
			cooperation,
			plan,
			alarm,
			followUp
		},
		watch:{
			
		},
		computed:{
			...mapState({
                userInfo:state => state.user.userInfo,
                userSelfInfo:state => state.user.userSelfInfo
			}),
			authMap(){
				return this.userInfo.hasAuth.filter(item=>item.type === '2');
			}
		},
		
		data () {
			return {	
			}
		},
		
		methods:{
			
			
		},
		async created(){
			
		}
	}
</script>

<style >
	.doctors-index{
		padding-right: 0.37rem;
	}
	/* .doctors-index>div{
		margin-bottom: 0.42rem;
	} */
	.doctors-index-top{
		display: flex;
	}
	.doctors-index-top-module{
		/* flex: 1; */
		width:5.2rem;
		height: 3rem;
		/* border: 1px solid red; */
	}
	.doctors-index-top-fg{
		width: 0.13rem;
	}
</style>
<!--
    医生界面
-->