<template>
	<div :is="viewCurrent.page"></div>
</template>

<script>
	import { mapState } from 'vuex'
	import medicalTreatmentMan from './medicalTreatment/medicalTreatmentMan.vue'
	import medicalTreatmentDoc from './medicalTreatment/medicalTreatmentDoc.vue'
	export default {
		computed:{
			/**
			 * 根据用户权限，动态渲染
			 */
			viewCurrent(){
				const rootView = {
					// rooter:'superManagement',
					manager:'medicalTreatmentMan',
					doctors:'medicalTreatmentDoc'
				};
				return {page:rootView[this.$store.state.user.viewRoot.now.name]}
			}
		},
		components:{
			medicalTreatmentMan,
			medicalTreatmentDoc
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
	.medicalTreatment{

    }
</style>