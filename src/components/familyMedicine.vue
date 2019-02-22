<template>
	<div class="family-medicine" >
		{{global.businessModule}}
		<div :is="$store.state.user.viewRoot.now.type==='1'?'familyMedicineManagement':'familyMedicineDoctor'"></div>
	</div>
	
</template>

<script>
import { mapState } from 'vuex'
import familyMedicineManagement from './familyMedicine/familyMedicineManagement.vue'
import familyMedicineDoctor from './familyMedicine/familyMedicineDoctor.vue'
	export default {
		components:{
			familyMedicineManagement,
			familyMedicineDoctor,
			 
		},
		computed:{
			...mapState({
				userInfo:state => state.user.userInfo,
				userSelfInfo:state => state.user.userSelfInfo,
				global: state => state.global
			})
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
	.family-medicine{
		/* height: 100%; */
		min-height: 100%;
		overflow-y: auto;
    }
</style>