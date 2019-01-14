<template>
	<div class="info-list-head">
        <span class="table-title">{{inData.name||""}}</span>
        <el-button @click="$emit('reBack',{click:true})">查看历史计划</el-button>
    </div>
</template>

<script>
	export default {
        props:[
            "inData"
        ],
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
	.info-list-head{
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 0.68rem;
		box-sizing: border-box;
		/* border-bottom: 1px solid #EBF0F4; */
	}
	.table-title{
		font-family: var(--fontFamily3);
		font-size: var(--fontSize6);
		color: var(--color7);
		letter-spacing: 0;
		line-height: 0.28rem;
	}
	.info-list-head>.el-button{
		/* border-color: var(--borderColor4); */
	}
	.info-list-head>.el-button>span{
		/* color: var(--color15); */
	}

</style>