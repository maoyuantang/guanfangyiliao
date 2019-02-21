<template>
	<div class="test">
		<img src="../assets/logo.png"/>
		<p class="golbal-css-test" @click="gotoIndex">this is test page</p>
	</div>
</template>

<script>
	// import test from '../api/test.js'
	export default {
		data () {
			return {
				
			}
		},
		methods:{
			gotoIndex(){
				this.$router.push({path:'/testb'})
			}
		},
		async created(){
//			test.testA()
//			.then(res=>console.log(res))
//			test.testB()
//			.then(res=>console.log(res))
			
			const aRes = await test.testA();
			console.log(aRes);
			const bRes = await test.testB();
			console.log(bRes)
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