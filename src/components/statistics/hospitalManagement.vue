<template>
	<div class="statistics">
		<div>
			<normalTab v-model="some" @reBack="reData"></normalTab>
		</div>
		<div class="index-body" :is="some.i===0?'statisticsTable':'AccountAuthority'">
			<!-- <statisticsTable></statisticsTable> -->
			<!-- <AccountAuthority></AccountAuthority> -->
		</div>
		<steps></steps>
	</div>
</template>

<script>
import { mapState } from 'vuex'
import normalTab from '../../public/publicComponents/normalTab.vue'

import statisticsTable from './hospitalManagement/statisticsTable.vue'
import AccountAuthority from './hospitalManagement/AccountAuthority.vue'
// import {fetchHospitalDepts} from '../../api/apiAll.js'
/****************************************************** */
import steps from '../../public/publicComponents/steps.vue'
	export default {
		watch:{
		},
		computed:{
			...mapState({
				userInfo:state => state.user.userInfo,
				userSelfInfo:state => state.user.userSelfInfo
			})
		},
		data () {
			return {
				some:{//顶部导航
					i:0,//当前页面
					list:[
						{
							en:'STATISTICS',
							zh:'统计'
						},
						// {
						// 	en:'Account number & authority',
						// 	zh:'账号及权限'
						// }
					]
				}
			}
		},
		methods:{
			/**
			 * 获取权限，并设置
			 * 权限这块我觉得后端设计很烂，我也没法，以后怕是要出问题
			 * 首页医生视图和和医院管理员视图（去掉一个模块，这就是我现在要做的）居然可以随意转换，即使没有相应的权限
			 */
			getViewRoot(){
				this.userInfo.manager?this.some.list.push({en:'Account number & authority',zh:'账号及权限'}):null;
			},

			/**
			 * 顶部当行模块被点击，返回结果
			 */
			reData(data){
				// console.log(data);
				// console.log(this.some)
			},
		},
		components:{
			normalTab,
			statisticsTable,
			AccountAuthority,
			steps
		},
		async created(){
			this.getViewRoot();
			// console.log(this.userSelfInfo.userId)
			// console.log(this.userInfo.token)
		}
	}
</script>

<style scoped>
	.statistics{
		min-height: 100%;
		padding-right: 0.36rem;
	}
</style>
<!--
    医院管理员界面
-->