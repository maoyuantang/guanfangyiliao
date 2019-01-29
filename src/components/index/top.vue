<template>
<div class="top">
	<div class="change-root" v-if="!userInfo.rooter">
		<el-menu :default-active="viewRoot.now.type" class="el-menu-demo" mode="horizontal" @select="handleSelect">
		<el-menu-item index="1">管理权限</el-menu-item>
		<el-menu-item index="2" :disabled="!canGotoDoctor">医生端</el-menu-item>
	</el-menu>
	</div>
	
	<div class="top-left">
		<marquee class="title-marquee">{{marquee}}</marquee>
		<div class="msg"><i class="iconfont msg-icon">&#xe8c0;</i></div>
	</div>
	<div class="top-right">
		<div class="top-right-posi">
			<img src="../../assets/logo.png" alt="" class="user-head">
			<span class="user-name">{{userSelfInfo.userName}}</span>
			<Dropdown>
				<a href="javascript:void(0)">
					<i class="iconfont user-select">&#xe65a;</i>
				</a>
				<DropdownMenu slot="list">
					<DropdownItem @click.native="switchStatus">驴打滚</DropdownItem>
					<DropdownItem>炸酱面</DropdownItem>
					<DropdownItem>豆汁儿</DropdownItem>
					<DropdownItem>冰糖葫芦</DropdownItem>
					<DropdownItem divided>北京烤鸭</DropdownItem>
				</DropdownMenu>
			</Dropdown>
		</div>
	</div>
</div>
</template>

<script>
	import { mapState } from 'vuex'
	export default {
		name : 'top',
		computed:{
			...mapState({
				userSelfInfo:state => state.user.userSelfInfo
			}),
			...mapState({
				viewRoot:state => state.user.viewRoot
			}),
			...mapState({
				userInfo:state => state.user.userInfo
			}),
		},
		data(){
			return {
				marquee:'i is fishi is fishi is fishi is fishi is fishi is fishi is fishi is fishi is fishi is fishi is fishi is fishi is fishi is fishi is fishi is fishi is fishi is fishi is fishi is fishi is fish',
				canGotoManager:true,
				canGotoDoctor:true,
			}
		},
		methods:{
			switchStatus(){
				console.log('444')
			},
			handleSelect(index){
				const obj = {
					'1':'manager',
					'2':'doctors'
				};
				let sendData = {
					name:obj[index],
					type:index
				}
				this.$store.commit("user/CHANGEVIEWAUTH",sendData);
				sessionStorage.setItem('viewRoot',JSON.stringify(this.viewRoot));//存缓存,或者叫跟新缓存更合适
			},
			setCanClic(){
				if(this.userInfo.manager && this.$route.path==='/'){
					this.canGotoDoctor = false;
				}
			}
		},
		async created(){
			console.log(this.$store.state.user.viewRoot.now)
			console.log(this.$route.path==='/');
			// this.setCanClic();
		}
	}
</script>

<style scoped>
	.top{
		background-color: var(--whiteColor);
		box-shadow: 0 0.06rem 0.36rem 0 rgba(0,62,100,0.04);
		height: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		position: relative;
	}
	.top-left{
		flex: 1;
		width: 0;
		height: 100%;
		display: flex;
		align-items: center;
		display: flex;
		justify-content: flex-end;
	}
	.top-right{
		width: 1.8rem;
		height: 100%;
		display: flex;
		align-items: center
	}
	.top-right-posi{
		position: relative;
		display: flex;
		align-items: center;
		
	}
	.user-head{
		width: 0.3rem;
		height: 0.3rem;
		border-radius: 50%;
		margin-left: 0.16rem;
	}
	.user-name{
		font-family: Helvetica;
		font-size: var(--fontSize3);
		color: var(--color1);
		margin-left: 0.16rem;
		
	}
	.user-select{
		font-size: 0.12rem;
		margin-left: 0.16rem;
		transition: 0.5s;
		transform:rotate(0deg);
		cursor: pointer;
		color: var(--color1);
		-webkit-touch-callout: none; /* iOS Safari */
		-webkit-user-select: none; /* Chrome/Safari/Opera */
		-khtml-user-select: none; /* Konqueror */
		-moz-user-select: none; /* Firefox */
		-ms-user-select: none; /* Internet Explorer/Edge */
		user-select: none; /* Non-prefixed version, currently*/
	}
	.user-select-true{
		transform:rotate(180deg);
	}
	.detailed-info{
		width: 300px;
		height: 200px;
		background-color: yellow;
		position: absolute;
		top: 0.3rem;
	}
	.title-marquee{
		color: var(--color2);
		font-family: PingFangSC-Regular;
		letter-spacing: 0.005rem;
		line-height: 0.3rem;
		width: 20%;
	}
	.msg{
		width: 0.73rem;
		display: flex;
		justify-content: center;
		color: var(--color2);
	}
	.msg-icon{
		position: relative;
	}
	.msg-icon::after{
		content: '';
		display: block;
		width: 0.08rem;
		height: 0.08rem;
		border-radius: 50%;
		background: var(--bgColor2);
		position:absolute;
		top: 0;
		right: -0.08rem;
	}
	.change-root{
		position: absolute;
		left: 50%;
		transform: translateX(-50%)
	}
</style>