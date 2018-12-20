<template>
  <div class="index">
  	<top></top>
    <middle></middle>
  	
  	
  	
  	
    <!--<p @click="asyncCommit" v-cloak>{{userCount}}</p>
    <p @click="testAdd" v-cloak>{{testCount}}</p>
    <p class="golbal-css-test" @click="gotoTest">goto test</p>
    <p class="golbal-css-test" @click="gotoTestb">goto testb</p>
    <el-button type="primary" disabled>主要按钮</el-button>-->
  </div>
</template>

<script>
	import { mapState ,mapMutations  } from 'vuex'
	import axios from '../plugs/axios'
	
	import top from '@/components/top.vue'
	import middle from '@/components/middle.vue'
	
	
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
  	middle
  },
  computed:{
  	...mapState({
  		userCount: state => state.user.count,
  		testCount: state => state.test.count,
  	})
  },
  created(){
  	console.log(axios)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.index{
		height: 100%;
		display: flex;
		flex-direction: column;
	}
</style>
