<template>
	<div class="test">
		<div class="">
			<p>测试vuex</p>
			<p @click="userAdd">{{userCount}}</p>
			<p @click="testAdd">{{testCount}}</p>
			<p>测试elemenu-ui</p>
			<el-button type="primary" disabled>主要按钮</el-button>
		</div>
	</div>
</template>

<script>
	import { mapState } from 'vuex'
	export default {
		data () {
			return {
				
			}
		},
		methods:{
			gotoIndex(){//跳转首页
				this.$router.push({path:'/'})
			},
			
		},
		computed:{
		  	...mapState({
		  		userCount: state => state.user.count,
		  		testCount: state => state.test.count,
		  	})
		},
		methods:{
			userAdd(){
		  		this.$store.commit("user/ADDCOUNT", 5)
		  	},
		  	testAdd(){
		  		this.$store.commit("test/ADDCOUNT", 5)
		  	},
		},
		created(){
			
		}
	}
</script>

<style scoped>
	.test{
		font-size: 0.2rem;
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100%;
	}
	
</style>