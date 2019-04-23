<!-- 普通文本 列表 -->
<template>
	<div class="text-bottom">
		<p>记录医生：{{recordName}}</p>
        <p>诊断时间{{time}}</p>
        <p>门诊流水：{{inSno}}</p>
	</div>
</template>

<script>
	export default {
        props:[
            "recordName",
            "time",
            "inSno"
        ],
		components:{
			
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

<style scoped>
.text-bottom{
    font-size: 0.14rem;
    color: #4cb0e7;
}
</style>