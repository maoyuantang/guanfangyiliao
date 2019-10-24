<template>
<div class="middle">
	<div class="middle-navigation">
		<navigation></navigation>
	</div>
	<div class="middle-content">
		<div class="middle-content-body">
			<transition>
				<router-view/>
			</transition>
		</div>
		<div class="middle-content-foot">
			foot
		</div>
	</div>
</div>
</template>

<script>
	import navigation from '@/components/navigation.vue'
	export default {
		name : 'top',
		data(){
			return {
				msg:'主体内容'
			}
		},
		components:{
			navigation
		}
	}
</script>

<style scoped>
	.middle{
		background: var(--testColor2);
		color: var(--testColor);
		flex: 1;
		display: flex;
	}
	.middle-navigation{
		width: 2rem;
		background: blue;
	}
	.middle-content{
		flex: 1;
		display: flex;
		flex-direction: column;
	}
	.middle-content-body{
		flex: 1;
		height: 0;
	}
	.middle-content-foot{
		height: 1rem;
		background: red;
		font-size: 0.2rem;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>