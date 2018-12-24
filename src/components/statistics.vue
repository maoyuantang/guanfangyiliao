<template>
	<div class="statistics">
		默认首页
		<normalTab v-model="some" @reBack="reData"></normalTab>
	</div>
</template>

<script>
import normalTab from '../public/publicComponents/normalTab.vue'
	export default {
		data () {
			return {
				some:{
					i:1,
					list:[
						{
							en:'STATISTICS',
							zh:'统计'
						},
						{
							en:'STATISTICS',
							zh:'统计'
						},
						{
							en:'STATISTICS',
							zh:'统计'
						},
					]
				},
			}
		},
		methods:{
			reData(data){
				console.log(data);
				console.log(this.some)
				// this.some.i = data.index
			}
		},
		components:{
			normalTab
		},
		async created(){
			
		}
	}
</script>

<style scoped>
	.statistics{
		/* background: yellow; */
		min-height: 100%;
    }
</style>