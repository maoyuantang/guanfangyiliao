<template>
  <div class="index">
		<div class="index-left" v-if="!userInfo.rooter">
			<navigation></navigation>
		</div>
		<div class="index-right">
			<div class="content-top">
				<top></top>
			</div>
			<div class="content-body">
				<router-view/>
			</div>

		</div>



  	<!-- <top></top> -->
    <!-- <middle></middle> -->
  </div>
</template>

<script>
	import { mapState ,mapMutations  } from 'vuex'
	// import axios from '../plugs/axios'
	
	import top from '@/components/index/top.vue'
	// import middle from '@/components/middle.vue'
	import navigation from '@/components/index/navigation.vue'
	
export default {
  name: 'index',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods:{
  	gotoTest(){
  		this.$router.push({path:'/test'})
  	},
  	gotoTestb(){
  		this.$router.push({path:'/testb'})
  	},
  	userAdd(){
  		this.$store.commit("user/ADDCOUNT", 5)
  	},
  	testAdd(){
  		this.$store.commit("test/ADDCOUNT", 5)
  	},
  	asyncCommit(){
  		this.$store.dispatch("user/addCount", 5)
  	}
  },
  components:{
  	top,
		// middle,
		navigation
  },
  computed:{
	...mapState({
		userInfo:state => state.user.userInfo
	})
  	// ...mapState({
  	// 	userCount: state => state.user.count,
  	// 	testCount: state => state.test.count,
  	// })
  },
  created(){
  	// console.log(axios)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.index{
		height: 100%;
		display: flex;
		/* flex-direction: column; */
	}
	.index-left{
		min-height: 100%;
		width: 2.08rem;
		background-color: var(--navigationBgColor);
	}
	.index-right{
		flex: 1;
		min-height: 100%;
		/* display: flex;
		flex-direction: column; */
		overflow: auto;
		
	}
	.content-top{
		height: 0.6rem;
	}
	.content-body{
		background-color: var(--bgColoor1);
		padding-top: 0.25rem;
		padding-left: 0.37rem;
		flex: 1;
		overflow-y: auto;
		/* height: 0; */
	}
</style>
<!--
	这里是主要内容拼接的组件，暂时只有404页面不在这个组件之内，后期可能登录注册页面也不在这之内，其余内容基本都在这里拼接
	<div class="index-left">是左侧导航栏
	<div class="index-right">是右侧内容显示
		<div class="content-top">是头部内容，
		<div class="content-body">这块是灵活的，根据路由不同动态修改内容
-->