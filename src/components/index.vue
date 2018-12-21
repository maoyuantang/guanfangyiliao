<template>
  <div class="index">
		<div class="index-left">
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
	
	import top from '@/components/top.vue'
	import middle from '@/components/middle.vue'
	import navigation from '@/components/navigation.vue'
	
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
		middle,
		navigation
  },
  computed:{
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
