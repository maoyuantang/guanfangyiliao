<template>
	<div class="info-box">
		<div class="info-box-head">
            <span class="info-box-title">{{inData.title}}</span>
            <Dropdown>
            <a href="javascript:void(0)">
                <i class="iconfont info-box-expand">&#xe612;</i>
            </a>
            <DropdownMenu slot="list">
                <DropdownItem v-for="(item,index) in inData.selectList" :key="index" @click.native="sendData(item,index)">{{item.name}}</DropdownItem>
                <!-- <DropdownItem>炸酱面</DropdownItem>
                <DropdownItem disabled>豆汁儿</DropdownItem>
                <DropdownItem>冰糖葫芦</DropdownItem>
                <DropdownItem divided>北京烤鸭</DropdownItem> -->
            </DropdownMenu>
        </Dropdown>
           
        </div>
        <div class="info-box-body">
            <slot></slot>
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
			sendData(item,index){
                this.$emit("reback",{item,index});
            },
		},
		async created(){

		}
	}
</script>

<style scoped>
	.info-box{
        background: #FFF;
        border: 1px solid var(--color5);
        box-shadow: 0 0.06rem 0.36rem 0 rgba(0,62,100,0.04);
        border-radius: 0.04rem;
        width: 5.2rem;
        height: 3.36rem;
        padding-left: 0.24rem;
        padding-top: 0.27rem;
        padding-right: 0.3rem;
        padding-bottom: 0.19rem;
    }
    .info-box-head{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .info-box-title{
        font-family: var(--fontFamily3);
        font-size: var(--fontSize3);
        color: var(--color10);
    }
    .info-box-expand{
       color: var(--color10);
    }
</style>