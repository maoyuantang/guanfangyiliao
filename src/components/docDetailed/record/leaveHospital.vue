<!-- 出院记录 -->
<template>
	<div>
		<!-- 出院记录
        <p>{{inData}}</p> -->
		<textList :inData="inData.data"></textList>
		<textBottom 
		:recordName="inData.recordName"
		:time="inData.time"
		:inSno="inData.inSno"></textBottom>
	</div>
</template>

<script>
	import textList from './textList.vue' 
	import textBottom from './textBottom.vue' 
	export default {
        props:[
            "inData"
        ],
		components:{
			textList,
			textBottom
		},
		watch:{
			
		},
		computed:{
			
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

<style >
	
</style>