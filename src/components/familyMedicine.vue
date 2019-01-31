<template>
	<div class="family-medicine" >
		<div :is="$store.state.user.viewRoot.now.type==='1'?'familyMedicineManagement':'familyMedicineDoctor'"></div>
		{{$store.state.user.viewRoot.now.type}}
	</div>
	
</template>

<script>
import { mapState } from 'vuex'
import familyMedicineManagement from './familyMedicine/familyMedicineManagement.vue'
import familyMedicineDoctor from './familyMedicine/familyMedicineDoctor.vue'
	export default {
		components:{
			familyMedicineManagement,
			familyMedicineDoctor
		},
		computed:{
			...mapState({
				userInfo:state => state.user.userInfo,
				userSelfInfo:state => state.user.userSelfInfo
			})
		},
		data () {
			return {
				viewCurrent:{

				}
			}
		},
		methods:{
			
		},
		async created(){
			console.log(this.$store.state.user.viewRoot.now.type)
		}
	}
</script>

<style scoped>
	.family-medicine{

    }
</style>