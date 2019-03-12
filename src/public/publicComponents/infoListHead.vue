<template>
	<div class="info-list-head">
        <span class="table-title">{{inData.name||""}}</span>
        <el-button @click="$emit('reBack',{click:true})">{{btnText || 'something wrong'}}</el-button>
    </div>
</template>

<script>
	export default {
        props:[
            "inData"
        ],
		data () {
			return {
				btnText:""
			}
		},
		methods:{
			/***
			 * 设置按钮文字
			 * 前期图纸都是一样，也没想到
			 * 后来文字有改变
			 * 添加个函数解决
			 */
			setBtnText(){
				const table = [
					{
						entry:'今日计划',
						output:'查看历史计划'
					},
					{
						entry:'今日警告',
						output:'查看历史告警'
					},
					{
						entry:'近期随访',
						output:'查看历史随访'
					},
					{
						entry:'双向转诊',
						output:'查看更多'
					},
					{
						entry:'远程协作',
						output:'查看更多'
					},
					{
						entry:'远程会诊',
						output:'查看更多'
					}
				];
				table.forEach(v=>{
					if(v.entry === this.inData.name){
						this.btnText = v.output;
						return;
					}
				})
			},
		},
		async created(){
			this.setBtnText();
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