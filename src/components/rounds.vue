<!--移动查房系统-->
<template>
	<div class="rounds">
		<div :is="viewCurrent.page"></div>
	</div>
</template>

<script>
	import management from './rounds/management.vue'
	import doctors from './rounds/doctors.vue' 
	export default {
		components: {
			management,
			doctors
		},
		data() {
			return {
			}
		},
		computed: {
			/**
			 * 根据用户权限，动态渲染
			 */
			viewCurrent(){
				const rootView = {
					manager:'management',
					doctors:'doctors'
				};
				return {page:rootView[this.$store.state.user.viewRoot.now.name]}
			}
		},
		methods: {
		},
		async created(){
		},
	}
</script>

<style scoped>
</style>