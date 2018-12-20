<template>
<div class="top">
	{{msg}}
</div>
</template>

<script>
	export default {
		name : 'top',
		data(){
			return {
				msg:'头部'
			}
		}
	}
</script>

<style scoped>
	.top{
		background: black;
		color: var(--testColor);
		height: 1.5rem;
		font-size: 0.2rem;
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>