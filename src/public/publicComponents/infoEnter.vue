<template>
	<div class="info-enter">
		<div class="info-enter-top">
            <span class="info-enter-name">{{inData.name}}</span>
            <el-button type="primary" @click.native="sendData(inData)">点击进入</el-button>
        </div>
        <div class="info-enter-bottom">
            <span class="unprocessed">未处理{{inData.unprocessed}}人</span>
            <span class="processed">/ 已处理{{inData.processed}}人</span>
            
        </div>
	</div>
</template>

<script>
	export default {
        props:[
            'inData'
        ],
		data () {
			return {
				
			}
		},
		methods:{
			sendData(item){
                this.$emit("reback",item);
            }
		},
		async created(){

		}
	}
</script>

<style >
	.info-enter{
        width: 3.5rem;
        margin: 0 auto;
    }
    .info-enter-top{
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid var(--borderColor2);
        padding-top: 3.7%;
        padding-bottom: 0.13rem;
        
    }
    .info-enter-name{
        font-family: var(--fontFamily3);
        font-size: var(--fontSize4);
        color: var(--bgColor4);
    }
    .info-enter-top>.el-button{
        width: 0.78rem;
        height: 0.32rem;
    }
    .info-enter-top>.el-button span{
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: var(--fontSize2);
        width: 100%;
        height: 100%;
    }
    .info-enter-bottom{
        box-sizing: border-box;
        border-bottom: 0.04rem solid var(--borderColor3);
        border-radius: 0.03rem;
        font-family: var(--fontFamily3);
        line-height: 0.21rem;
        display: flex;
        height: 0.52rem;
        align-items: center;
        color: var(--color11);
    }
    .unprocessed{
        color: var(--color6);
    }
</style>