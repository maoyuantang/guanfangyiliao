<template>
	<div class="education">
		<div :is="viewCurrent.page"></div>
	</div>
</template>

<script>
	import educationDoc from './education/educationDoc.vue'
	import educationMan from './education/educationMan.vue'
	export default {
		computed:{
			viewCurrent(){
				const rootView = {
					manager:'educationMan',
					doctors:'educationDoc'
				};
				return {page:rootView[this.$store.state.user.viewRoot.now.name]}
			}
		},
		components:{
			educationDoc,
			educationMan
		},
		data () {
			return {
			}
		},
		methods:{
		},
		async created(){

		}
	}
</script>

<style scoped>
	.education{

    }
</style>