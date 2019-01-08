<template>
	<div class="outpatient">
		远程门诊系统
		<chat></chat>
		<div class="view-curr">
			<outPatientHospitalManagent></outPatientHospitalManagent>
		</div>



		<div class="mark" v-if="false">
			<div class="mark-inner">
				<div class="outpatient-alert">
					<p class="outpatient-alert-title">医生详情</p>
					<div class="outpatient-alert-body">
						<ul>
							<li></li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import chat from '../public/publicComponents/chat.vue'
	import outPatientHospitalManagent from './outPatientHospitalManagent.vue'
	export default {
		data () {
			return {
				doctorsInfo:{//医生信息
					headImg:'',
					name:'',

				},
				
			}
		},
		methods:{
			
		},
		components:{
			outPatientHospitalManagent,
			chat
		},
		async created(){

		}
	}
</script>

<style scoped>
	.outpatient{

	}
	.outpatient-alert{
		width: 5.03rem;
		height: 200px;
		background-color: var(--bgColor5);;
	}
</style>