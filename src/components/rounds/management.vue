<!--移动查房系统 管理端-->
<template>
	<div class="rounds-manament">
		<div class="rounds-manament-div-top">
            <normalTab v-model="barInfo" @reBack="getBar"></normalTab>
        </div>
        <div class="rounds-manament-div-body">
            <div :is="viewCurrent"></div>
        </div>
	</div>
</template>

<script>
    import { mapState } from "vuex"
    import normalTab from '../../public/publicComponents/normalTab.vue'
    import mobile from './management/mobile.vue'
    import statistics from './management/statistics.vue'

	export default {
		components: {
            normalTab,
            mobile,
            statistics
		},
		data() {
			return {
                /**
				 * bar 数据
				 */
				barInfo:{
					i:0,//当前页面
					list:[
						{
							en:'Mobile rounds',
							zh:'移动查房管理',
							page:'mobile'
						},
						{
							en:'statistics',
							zh:'统计',
							page:'statistics'
						},
					]	
				},
			}
		},
		computed: {
			...mapState({
				userState: state => state.user.userInfo,
				userSelfInfo: state => state.user.userSelfInfo,
				userInfo: state => state.user.userInfo,
            }),
            viewCurrent(){
				return this.barInfo.list[this.barInfo.i].page
			}	
		},
		methods: {
            /**
			 * bar 切换数据
			 */
			getBar(data){
				// console.log(data)
			},
		},
		async created(){
		}
	}
</script>

<style scoped>
	.rounds-manament {
		
	}
</style>