<template>
<div class="navigation">
		<div class="logo">
			<span class="logo-font">冠方智慧医疗</span>
		</div>
		<el-menu>
			<!--1st-->
			<!-- <el-submenu index="1">
		        <template slot="title">
		          <i class="el-icon-location"></i>
		          <span>导航一</span>
		        </template>
		        <el-menu-item-group>
		          <template slot="title">分组一</template>
		          <el-menu-item index="1-1" @click="goTotest">选项1</el-menu-item>
		          <el-menu-item index="1-2" @click="goTotestB">选项2</el-menu-item>
		        </el-menu-item-group>
		        <el-menu-item-group title="分组2">
		          <el-menu-item index="1-3" @click="goTotestC">选项3</el-menu-item>
		        </el-menu-item-group>
		        <el-submenu index="1-4">
		          <template slot="title">选项4</template>
		          <el-menu-item index="1-4-1">选项1</el-menu-item>
		        </el-submenu>
		    </el-submenu> -->
		    <!--2nd-->
		    <el-menu-item index="2" v-for="(item,index) in routerList" :key="index" :class="item.select?'select-item':'not-select-item'" @click="navClick(index)">
		        <!-- <i class="el-icon-menu"></i> -->
		        <span slot="title">{{item.name}}</span>
		    </el-menu-item>
		    <!--3th-->
		    <!-- <el-menu-item index="3" disabled>
		        <i class="el-icon-document"></i>
		        <span slot="title">导航三</span>
		    </el-menu-item> -->
		</el-menu>
		
</div>
</template>

<script>
	export default {
		name : 'navigation',
		data(){
			return {
				msg:'navigation',
				routerList:[
					{
						name:'首页',
						select:true,
						path:'/'
					},
					{
						name:'远程门诊系统',
						select:false,
						path:'/outpatient'
					},
					{
						name:'远程会诊系统',
						select:false,
						path:'/consultation'
					},
					{
						name:'远程协作系统',
						select:false,
						path:'/cooperation'
					},
					{
						name:'智能随访系统',
						select:false,
						path:'/followUp'
					},
					{
						name:'健康档案系统',
						select:false,
						path:'/files'
					},
					{
						name:'远程教育系统',
						select:false,
						path:'/education'
					},
						{
						name:'分级诊疗系统',
						select:false,
						path:'/medicalTreatment'
					},
						{
						name:'双向转诊系统',
						select:false,
						path:'/referral'
					},
						{
						name:'移动查房系统',
						select:false,
						path:'/rounds'
					},
						{
						name:'终端管理系统',
						select:false,
						path:'/management'
					},
				]
			}
		},
		methods:{
			changeCss(index){//点击导航条，改变样式
				// for(let i of this.routerList){
				// 	i.select = false;
				// }
				// this.routerList[index].select = true;
				const newArr = this.routerList.map(item=>{//试试map函数
					item.select = false;
					return item;
				});
				newArr[index].select = true;
				this.routerList = newArr;
			},
			gotoPage(index){//路由跳转
				this.$router.push({path:this.routerList[index].path})
			},
			navClick(index){//导航被点击
				this.changeCss(index);//切换被选项样式
				this.gotoPage(index);//跳转路由
			},






			goTotest(){
				this.$router.push({path:'/'})
			},
			goTotestB(){
				this.$router.push({path:'/testb'})
			},
			goTotestC(){
				this.$router.push({path:'/testc'})
			},
		}
	}
</script>

<style scoped>
	.navigation{
		/*background: black;*/
		/*color: white;*/
		/* color: var(--testColor);
		height: 1.5rem;
		font-size: 0.2rem; */
	}
	.navigation>.el-menu{
		background-color: transparent;
	}
	.logo{
		height: 0.73rem;
		background-color: var(--navigationBgColor);
		display: flex;
		justify-content: center;
		align-items: center;
		
	}
	.navigation .el-menu-item{
		padding-left: 0.4rem !important;
	}
	
	.el-menu-item span{
		line-height: var(--fontSize7);
	}

	.logo-font{
		color: var(--whiteColor);
		font-size: var(--fontSize7);
		line-height: 0.34rem;
	}
	.not-select-item{
		background-color: var(--navigationBgColor);
		color: var(--whiteColor);
	}
	.select-item{
		background-color: var(--whiteColor);
		color: var(--navigationBgColor);
	}
</style>