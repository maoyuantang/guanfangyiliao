<template>
<div class="not-found">
	{{msg}}
</div>
</template>

<script>
	export default {
		name : 'top',
		data(){
			return {
				msg:'404 not found'
			}
		}
	}
</script>

<style scoped>
	.not-found{
		/*background: black;
		color: var(--testColor);
		height: 1.5rem;*/
	}
</style>