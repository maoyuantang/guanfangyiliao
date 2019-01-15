<template>
<div class="navigation">
		<div class="logo">
			<span class="logo-font">冠方智慧医疗</span>
		</div>
		<el-menu>
		    <el-menu-item index="2" v-for="(item,index) in navList.data" :key="index" :class="item.select?'select-item':'not-select-item'" @click="navClick(index,item)">
		        <!-- <i class="el-icon-menu"></i> -->
		        <span slot="title">{{item.name}}{{item.select}}</span>
		    </el-menu-item>
		</el-menu>
</div>
</template>

<script>
// import { constants } from 'http2';
import { mapState } from 'vuex'
import jsonSort from '../../public/publicJs/jsonSort';
	export default {
		name : 'navigation',
		watch:{
			// listenChange(n){
			// 	let root = this.$store.state.user.viewRoot
			// 	const rootMap = this.returnRootAll();
			// 	console.log('456465')
			// 	if(!root)return{ok:false,data:[]};
			// 	let originalList = rootMap[root.name]();
			// 	let nowPage = sessionStorage.getItem('nowView')
			// 	if(nowPage){
			// 		nowPage = JSON.parse(nowPage);
			// 		originalList = originalList.map(item=>{
			// 			item.select = item.code===nowPage.code;
			// 			return item;
			// 		})
			// 	}
			// 	this.routerList = rootMap[this.$store.state.user.viewRoot.name]?{ok:true,data:originalList}:{ok:false,data:[]};
			// 	console.log(this.routerList)
				
			// }
		},
		data(){
			return {
				routerList:[],
				navMapList:[
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
				]
			}
		},
		computed:{
			...mapState({
                userState: state => state.user.userInfo,
			}),
			navList:{
				get(){
					console.log('456465')
					let root = this.$store.state.user.viewRoot
					const rootMap = this.returnRootAll();
					if(!root)return{ok:false,data:[]};
					let originalList = rootMap[root.name]();
					let nowPage = sessionStorage.getItem('nowView')
					if(nowPage){
						nowPage = JSON.parse(nowPage);
						originalList = originalList.map(item=>{
							item.select = item.code===nowPage.code;
							return item;
						})
						console.log(originalList)
						if(!originalList.find((item,index)=>item.select)){
							originalList[0].select = true;
							sessionStorage.setItem('nowView',JSON.stringify(originalList[0]));//记录下当前显示的是哪个页面
							this.$router.push({path:originalList[0].path})
						}
						
					}
					return rootMap[this.$store.state.user.viewRoot.name]?{ok:true,data:originalList}:{ok:false,data:[]};
				},
				set(data){
					return data
				}
			},



			// navList(state){
			// 	console.log('456465')
			// 	let root = this.$store.state.user.viewRoot
			// 	const rootMap = this.returnRootAll();
			// 	if(!root)return{ok:false,data:[]};
			// 	let originalList = rootMap[root.name]();
			// 	let nowPage = sessionStorage.getItem('nowView')
			// 	if(nowPage){
			// 		nowPage = JSON.parse(nowPage);
			// 		originalList = originalList.map(item=>{
			// 			item.select = item.code===nowPage.code;
			// 			return item;
			// 		})
			// 	}
			// 	return rootMap[this.$store.state.user.viewRoot.name]?{ok:true,data:originalList}:{ok:false,data:[]};
			// },
			
		},
		methods:{
			changeCss(index){//点击导航条，改变样式
				this.navList.data = this.navList.data.map((item,key)=>{
					item.select = key===index;
					console.log(item)
					return item;
				});
				// this.routerList = this.routerList.map((item,key)=>{
				// 	item.select = key===index;
				// 	return item;
				// });
			},
			gotoPage(index){//路由跳转
				this.$router.push({path:this.routerList[index].path})
			},
			navClick(index,item){//导航被点击
				this.changeCss(index);//切换被选项样式
				this.gotoPage(index);//跳转路由
				sessionStorage.setItem('nowView',JSON.stringify(item));//记录下当前显示的是哪个页面
				
			},
			returnRootAll(){
				return {
					rooter:data=>{//超级管理员
						return [
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
					},
					manager:data=>{//医院管理员
						const newArr = this.$store.state.user.userInfo.hasAuth.filter(item=>{//权限列表里面混杂着两种权限，调出医院管理员权限（type为‘1’）
							return item.type==='1';
						});
						const list = [
							{//首页后台并不返回，自己加上
								name:'首页',
								select:true,
								path:'/',
								code:'0'
							},
						];
						for(const i of this.navMapList){
							for(const j of newArr){
								if(i.code === j.authorityId){//从上面过滤出的权限列表里面，对应准备好的路由，挑出来
									list.push(i);
								}
							}
						}
						return list;
					},
					doctors:data=>{//医生
						const newArr = this.$store.state.user.userInfo.hasAuth.filter(item=>{//权限列表里面混杂着两种权限，调出医院管理员权限（type为‘1’）
							return item.type==='2';
						});
						const list = [
							{//首页后台并不返回，自己加上
								name:'首页',
								select:true,
								path:'/',
								code:'0'
							},
						];
						for(const i of this.navMapList){
							for(const j of newArr){
								if(i.code === j.authorityId){//从上面过滤出的权限列表里面，对应准备好的路由，挑出来
									list.push(i);
								}
							}
						}
						return list;
					},
					defaultItem:data=>[{name:'wrong',selcrt:true,path:'/',code:'-1'}]
				}
			},
		},
		created(){
			this.routerList = this.navList.data;
			// console.log(this.routerList)
			// setTimeout(() => {
			// 	console.log('enter')
				
			// 	console.log(this.$store.state.user.viewRoot)
			// }, 5000);
			// console.log(this.$store.state.user.userInfo.hasAuth)
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