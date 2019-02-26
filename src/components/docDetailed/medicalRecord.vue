<template>
	<div class="medical-record">
		<div class="doc-nor-item">
            <div class="doc-nor-item-left">
                <img src="../../../static/assets/img/上传@2x.png" alt="" srcset="">
            </div>
            <div class="doc-nor-item-right">
                <p class="doc-nor-item-title">住院处方</p>
                <p class="doc-nor-item-time">最近一次处方时间 </p>
                <p class="doc-nor-item-text">此处显示最近一次处方门诊医生的处理意见或者医嘱或者其他 反正是留一段字符 备用</p>
            </div>
        </div>

        <div class="doc-nor-item">
            <div class="doc-nor-item-left">
                <img src="../../../static/assets/img/住院医嘱@2x.png" alt="" srcset="">
            </div>
            <div class="doc-nor-item-right">
                <p class="doc-nor-item-title">住院医嘱</p>
                <p class="doc-nor-item-time">最近一次处方时间 </p>
                <p class="doc-nor-item-text">此处显示最近一次处方门诊医生的处理意见或者医嘱或者其他 反正是留一段字符 备用</p>
            </div>
        </div>

        <div class="doc-nor-item">
            <div class="doc-nor-item-left">
                <img src="../../../static/assets/img/检验检查@2x.png" alt="" srcset="">
            </div>
            <div class="doc-nor-item-right">
                <p class="doc-nor-item-title">检验检查</p>
                <p class="doc-nor-item-time">最近一次处方时间 </p>
                <p class="doc-nor-item-text">此处显示最近一次处方门诊医生的处理意见或者医嘱或者其他 反正是留一段字符 备用</p>
            </div>
        </div>

        <div class="doc-nor-item">
            <div class="doc-nor-item-left">
                <img src="../../../static/assets/img/体检报告@2x.png" alt="" srcset="">
            </div>
            <div class="doc-nor-item-right">
                <p class="doc-nor-item-title">体检报告</p>
                <p class="doc-nor-item-time">最近一次处方时间 </p>
                <p class="doc-nor-item-text">此处显示最近一次处方门诊医生的处理意见或者医嘱或者其他 反正是留一段字符 备用</p>
            </div>
        </div>

        <div class="doc-nor-item">
            <div class="doc-nor-item-left">
                <img src="../../../static/assets/img/综合影像@2x.png" alt="" srcset="">
            </div>
            <div class="doc-nor-item-right">
                <p class="doc-nor-item-title">综合影像</p>
                <p class="doc-nor-item-time">最近一次处方时间 </p>
                <p class="doc-nor-item-text">此处显示最近一次处方门诊医生的处理意见或者医嘱或者其他 反正是留一段字符 备用</p>
            </div>
        </div>
	</div>
</template>

<script>
	export default {
		watch:{
			
		},
		data () {
			return {
				
			}
		},
		computed:{
			
		},
		methods:{
		},
		components:{
            
		},
		async created(){
		}
	}
</script>

<style scoped>
	.medical-record{
		display: grid;
        grid-template-columns: 1fr 1fr;
        grid-column-gap: 0.2rem;
	}
	.doc-nor-item{
        display: flex;
        background: #FFFFFF;
        border: 1px solid #E1E8EE;
        border-radius: 4px;
        width: 6.7rem;
        height: 1.62rem;
        margin-bottom: 0.15rem;
    }
    .doc-nor-item-left{
        flex:1;
        display: flex;
        align-items: center;
        justify-content: center;
    }
	.doc-nor-item-right{
        flex:3;
    }
    .doc-nor-item-title{
        margin-top: 0.28rem;
        color: var(--color18);
        line-height: 0.22rem;
    }
    .doc-nor-item-time{
        font-family: var(--fontFamily3);
        font-size: var(--fontSize1);
        color: var(--color19);
        line-height: 0.22rem;
    }
    .doc-nor-item-text{
        font-family: var(--fontFamily3);
        font-size: var(--fontSize1);
        color: var(--color19);
        line-height: 0.22rem;
    }
</style>