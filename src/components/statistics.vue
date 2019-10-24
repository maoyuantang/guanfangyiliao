<template>
	<div class="statistics">
		<div :is="viewCurrent.page">
			<!-- <hospitalManagement></hospitalManagement> -->
			<!-- <doctorsIndex></doctorsIndex> -->
		</div>
	</div>
</template>

<script>

import hospitalManagement from './statistics/hospitalManagement.vue'//医院管理员页面
import doctorsIndex from './statistics/doctorsIndex.vue'//医生页面
import superManagement from './statistics/superManagement.vue'//超级管理员页面
import {initializeTheCreationOfHospital,userList,settingsList} from '../api/apiAll.js'
	export default {
		watch:{
			
		},
		data () {
			return {
				
			}
		},
		computed:{
			/**
			 * 根据用户权限，动态渲染
			 */
			viewCurrent(){
				const rootView = {
					rooter:'superManagement',
					manager:'hospitalManagement',
					doctors:'doctorsIndex'
				};
				return {page:rootView[this.$store.state.user.viewRoot.now.name]}
			}
		},
		methods:{
		},
		components:{
			superManagement,
			hospitalManagement,
			doctorsIndex
		},
		async created(){
			// console.log(this.$store.state.user);
			// window.onerror = err=>console.log(err);
			// console.log(this.$store.state.user.userInfo.hasAuth)
			// console.log('test');
			// const test = await settingsList({token:this.$store.state.user.userInfo.token});
			
			// console.log(test);
			// const test = await userList()
			// const test = await initializeTheCreationOfHospital({
			// 	"name":"冠方医院001",
			// 	"account":"test01",
			// 	"passwd":"111111"
			// });
			// console.log(test)

		}
	}
</script>

<style scoped>
	.statistics{
		
	}
	
	
</style>
<!--
	这个组件主要是根据权限选择不同（暂时三种）的首页显示：
		<hospitalManagement>是医院管理人员的首页
		<doctorsIndex>是医生的首页
-->