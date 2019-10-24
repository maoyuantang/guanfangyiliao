<template>
	<div class="info-list-row">
        <div class="head-img-div">
            <img :src="inData.headId||''" alt="" class="head-img">
        </div>
        <span class="user-info-name">{{inData.name||""}}</span>
        <span class="user-info-phone"><i class="iconfont">&#xe61f;</i>{{inData.phone||""}}</span>
        <div class="user-info-slot">
            <slot></slot>
        </div>
        <div class="user-info-btns">
            <el-button type="primary" plain @click="sendData('sendData')">发消息</el-button>
            <el-button type="primary" plain @click="sendData('watchRemarks')">看备注</el-button>
            <el-button type="primary" plain @click="sendData('watchDoc')">看档案</el-button>
            <el-button type="primary" plain @click="sendData('saveDoc')">录入档案</el-button>
        </div>
        <div class="user-info-consummation">
            <el-button type="danger" plain @click="sendData('saveDoc')">处理完成</el-button>
        </div>
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
            sendData(tag){
                this.$emit("reback",{tag:tag,id:this.inData.id});
            },
            
		},
		async created(){

		}
	}
</script>

<style>
.info-list-row{
		display: flex;
		align-items: center;
        border-top: 1px solid #EBF0F4;
        color: #626262;
	}
	.head-img-div{
		width: 0.42rem;
		height: 0.42rem;
		margin-right: 1.3%;
	}
	.head-img-div>img{
		width: 0.42rem;
		height: 0.42rem;
		display: block;
		border-radius: 50%;
	}
	.user-info-name{
		font-family: var(--fontFamily2);
		color: var(--color16);
		letter-spacing: 0;
		margin-right: 4.7%;
		width: 0.98rem;
	}
	.user-info-phone{
		font-family: var(--fontFamily2);
		color: var(--color16);
		letter-spacing: 0;
		margin-right: 4.2%;
		width: 1.25rem;
	}
	.user-info-slot{
		width: 5.45rem;
		/* background: red;
		height: 100px; */
		margin-right: 2.5%;
	}
	.user-info-btns{
		margin-right: 4.9%;
    	width: 3.5rem;
	}
	.user-info-btns>.el-button{
		width: 0.57rem;
		height: 0.2rem;
	}
	.user-info-btns>.el-button>span{
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
	}
    .user-info-consummation{
        padding-right: 0.28rem;
    }
    .user-info-consummation>.el-button{
        width: 0.57rem !important;
        height: 0.2rem !important;
    }
    .user-info-consummation>.el-button>span{
        display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
    }
</style>