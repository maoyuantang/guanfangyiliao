<template>
	<div class="statistics">
		<div>
			<hospitalManagement></hospitalManagement>
			<!-- <doctorsIndex></doctorsIndex> -->
		</div>

		<!-- <div>
			<normalTab v-model="some" @reBack="reData"></normalTab>
		</div> -->
		<!-- <div class="index-body">
			<statisticsTable></statisticsTable>
			<AccountAuthority></AccountAuthority>
		</div> -->
		
		<!-- <div class="set-flex">
			<normalColumnChart v-model="drawData" v-for="i in 6"></normalColumnChart>
		</div> -->
		<!-- <div>
			<el-dropdown >
				<el-button type="primary">
					更多菜单<i class="el-icon-arrow-down el-icon--right"></i>
				</el-button>
				<el-dropdown-menu slot="dropdown">
					<el-dropdown-item @click.native="testSomeThing">黄金糕</el-dropdown-item>
					<el-dropdown-item>狮子头</el-dropdown-item>
					<el-dropdown-item>螺蛳粉</el-dropdown-item>
					<el-dropdown-item>双皮奶</el-dropdown-item>
					<el-dropdown-item>蚵仔煎</el-dropdown-item>
				</el-dropdown-menu>
			</el-dropdown>
		</div> -->
		<!-- <div>
			<div class="block">
				<span class="demonstration">默认</span>
				{{value6}}
				<el-date-picker
				v-model="value6"
				type="daterange"
				range-separator="至"
				start-placeholder="开始日期"
				end-placeholder="结束日期">
				</el-date-picker>
			</div>
		</div>  -->
		<!-- <selftag @reBack="gitIndex" v-model="test"></selftag> -->
		<!-- <selftag @reBack="gitIndex" v-model="test"></selftag> -->
		<!-- <el-button type="primary" @click="changeComFun">主要按钮</el-button>
		<div>
			<div :is="changeCom?'test':'testb'"></div>
		</div> -->
		<!-- <div>
			<statisticsWay @reBack='getTime'></statisticsWay>
		</div> -->
	</div>
</template>

<script>

import hospitalManagement from './hospitalManagement.vue'
import doctorsIndex from './doctorsIndex.vue'

import test from './test.vue'//测试动态渲染组件
import testb from './testb.vue'
	export default {
		watch:{
			
		},
		data () {
			return {
				
			}
		},
		methods:{
			
			
		},
		components:{
			hospitalManagement,
			doctorsIndex
		},
		async created(){
			
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