<template>
<div class="navigation">
		<div class="logo">
			<span class="logo-font">冠方智慧医疗</span>
		</div>
		<el-menu>
		    <el-menu-item index="2" v-for="(item,index) in navList" :key="index" :class="item.select?'select-item':'not-select-item'" @click="gotoPage(item,index)">
		        <i class="el-icon-menu"></i>
		        <span slot="title">{{item.name}}{{item.select}}</span>
		    </el-menu-item>
		</el-menu>
</div>
</template>

<script>
import { mapState } from 'vuex'
import jsonSort from '../../public/publicJs/jsonSort';
	export default {
		name : 'navigation',
		watch:{
			/**
			 * 监听navList变化
			 * 其实是监听点击顶上的‘管理权限’和‘医生端’的点击情况
			 * 在视图权限切换的情况下，切换后的权限不一定有切换前展示的页面，如果没有，直接跳转首页
			 */
			navList(n,o){
				if(!n[this.$store.state.user.viewRoot.now.name]){//缺失视图权限
					this.$router.push({path:'/'});//路由跳转
					this.navList = this.navList.map(item=>{
						item.select = item.code==='1';//首页的code是‘1’
						return item;
					});
				}
			},
			'$store.state.user.viewRoot'(n,o){
				console.log(n)
			}
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
				],

			}
		},
		computed:{
			...mapState({
				userState: state => state.user.userInfo,
				viewRoot: state => state.user.viewRoot,
			}),
			navList:{
				get(){
					return this.$store.state.user.viewRoot[this.$store.state.user.viewRoot.now.name]
				},
				set(data){
					return data
				}
			},
			
		},
		methods:{
			/**
			 * 左侧菜单导航栏被点击
			 * 修改css样式
			 * 记录下当前点击源，防止刷新
			 * 路由跳转
			 */
			gotoPage(item,index){
				this.navList = this.navList.map((i,key)=>{//修改css
					i.select = index===key;
					return i;
				});
				sessionStorage.setItem('page',JSON.stringify(item));//存缓存
				this.$router.push({path:item.path});//路由跳转
			},

			/**
			 * 该函数恢复页面，主要用在刷新之后
			 */
			restorePage(){
				console.log('enter')
				let rePage = sessionStorage.getItem('page');
				if(rePage){//说明以前有记录，恢复他
					try{
						rePage = JSON.parse(rePage);
					}catch(e){
						console.log(e);
						this.$notify.error({
							title: '错误',
							message: '记录恢复失败!'
						});
						return;
					}
					console.log(rePage)
					console.log(this.viewRoot[this.viewRoot.now.name])
					const index = this.viewRoot[this.viewRoot.now.name].find(item=>{//该权限视图是否包含该页面
						return item.code===rePage.code
					});
					if(index){
						this.navList = this.navList.map((item,key)=>{
							item.select = item.code===rePage.code;
							return item;
						});
					}else{

					}
					
				}

			}
		},
		created(){
			this.restorePage()
			console.log(this.$store.state.user.viewRoot);
			console.log(sessionStorage.getItem('page'))
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