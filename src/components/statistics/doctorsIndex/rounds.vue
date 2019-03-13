<template>
	<div class="doctors-index-rounds">
		<div class="doctors-index-rounds-head">
            <span class="doctors-index-rounds-name">移动查房</span>
            <span></span>
        </div>
        <div class="doctors-index-rounds-body">
            <div class="doctors-index-rounds-body-item"></div>
        </div>
	</div>
</template>

<script>
	import { mapState } from 'vuex'
	
	export default {
		watch:{
			
		},
		computed:{
			...mapState({
                userInfo:state => state.user.userInfo,
                userSelfInfo:state => state.user.userSelfInfo
			})
		},
		
		data () {
			return {	
			}
		},
		
		methods:{
			
			
		},
		components:{
		},
		async created(){
			
		}
	}
</script>

<style >
	.doctors-index-rounds{

	}
    .doctors-index-rounds-head{
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-top: 28px;
    }
    .doctors-index-rounds-name{
        font-family: PingFangSC-Regular;
        font-size: 16px;
        color: #778CA2;
        padding-left: 24px;
    }
	
</style>
<!--
    医生界面
-->