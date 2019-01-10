<template>
<div class="navigation">
		<div class="logo">
			<span class="logo-font">冠方智慧医疗</span>
		</div>
		<el-menu>
		    <el-menu-item index="2" v-for="(item,index) in routerList" :key="index" :class="item.select?'select-item':'not-select-item'" @click="navClick(index)">
		        <!-- <i class="el-icon-menu"></i> -->
		        <span slot="title">{{item.name}}</span>
		    </el-menu-item>
		</el-menu>
</div>
</template>

<script>
	export default {
		name : 'navigation',
		watch:{
			
		},
		data(){
			return {
				routerList:[]
			}
		},
		computed:{
			navList(state)  {
				const allList = [
					// {
					// 	name:'首页',
					// 	select:true,
					// 	path:'/',
					// 	code:0
					// },
					{
						name:'远程门诊系统',
						select:false,
						path:'/outpatient',
						code:'10000'
					},
					{
						name:'远程会诊系统',
						select:false,
						path:'/consultation',
						code:'20000'
					},
					{
						name:'远程协作系统',
						select:false,
						path:'/cooperation',
						code:'30000'
					},
					{
						name:'智能随访系统',
						select:false,
						path:'/followUp',
						code:'40000'
					},
					{
						name:'健康档案系统',
						select:false,
						path:'/files',
						code:'50000'
					},
					{
						name:'远程教育系统',
						select:false,
						path:'/education',
						code:'60000'
					},
						{
						name:'分级诊疗系统',
						select:false,
						path:'/medicalTreatment',
						code:'70000'
					},
						{
						name:'双向转诊系统',
						select:false,
						path:'/referral',
						code:'80000'
					},
						{
						name:'移动查房系统',
						select:false,
						path:'/rounds',
						code:'90000'
					},
						{
						name:'终端管理系统',
						select:false,
						path:'/management',
						code:'100000'
					},
				];
				let items = [];
				if(this.$store.state.user.userInfo.rooter){//超级管理员
					items = [
						{
							name:'医院管理',
							select:true,
							path:'/',
							code:'0'
						},
						{
							name:'远程会诊系统',
							select:false,
							path:'/cloudManagement',
							code:'0'
						},
					];
					
				}else{
					items = [
						{
							name:'首页',
							select:true,
							path:'/',
							code:'0'
						},
					];
					for(const i of allList){
						for(const j of this.$store.state.user.userInfo.hasAuth){
							if(i.code === j.authorityId){
								items.push(i);
							}
						}
					}
					
				}
				return items;
				// /********** */
				// const newArr = [
				// 	{
				// 		name:'首页',
				// 		select:true,
				// 		path:'/',
				// 		code:'0'
				// 	},
				// ];
				// for(const i of allList){
				// 	for(const j of this.$store.state.user.userInfo.hasAuth){
				// 		if(i.code === j.authorityId){
				// 			newArr.push(i);
				// 		}
				// 	}
				// }
				// return newArr;
			},
			
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
		},
		created(){
			this.routerList = this.navList
		}
	}
</script>

<style scoped>
	.navigation{
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