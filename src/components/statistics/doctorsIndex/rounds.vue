<!--
    移动查房
-->
<template>
	<div class="doctors-index-rounds">
		<div class="doctors-index-rounds-head">
            <span class="doctors-index-rounds-name">移动查房</span>
            <span></span>
        </div>
        <div class="doctors-index-rounds-body">
            <div class="doctors-index-rounds-body-item">
                <div class="doctors-index-rounds-body-item-top">
                    <span class="info-enter-name">今日查房 {{info.todayMan}}</span>
                    <el-button type="primary" size="mini" @click="gotoPage">点击进入</el-button>
                </div>
                <div class="doctors-index-rounds-body-item-bottom">
                    <span class="unprocessed">未处理{{info.waitMan}}人</span>
                    <!-- <span class="processed">/ 已处理20人</span> -->
                </div>
            </div>
        </div>
	</div>
</template>

<script>
	import { mapState } from 'vuex'
    import {todayRounds} from '../../../api/apiAll.js' 
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
                info:{
                    todayMan:'',//今日查房数
                    waitMan:'',//未处理数
                }
			}
		},
		
		methods:{	
            /**
             * 获取 列表 数据
             */
            async getTodayRounds(){
                const res = await todayRounds({token:this.userInfo.token});
                console.log(res);
                if(res.data&&res.data.errCode===0){
                    this.info = res.data.body;
                }else{
                    this.$notify({
						title: '失败',
						message: '列表数据获取失败',
						type: 'error'
					});
                }
            },
            gotoPage(){
                sessionStorage.setItem('page',JSON.stringify({
                    name:"移动查房系统",select:true,path:"/rounds",code:"90000"
                }));//存缓存
				this.$router.push({path:'/rounds'});//路由跳转
            },
		},
		components:{
		},
		async created(){
			this.getTodayRounds();
		}
	}
</script>

<style >
	.doctors-index-rounds{
        height: 100%;
        border: 1px solid #E5EDF3;
        border-radius: 4px;
        /* display: flex;
        flex-direction: column; */
	}
    .doctors-index-rounds-head{
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-top: 28px;
    }
    .doctors-index-rounds-body-item{
        /* width: 3.5rem;
        margin: 0 auto; */
        padding-left: .63rem;
        padding-right: .63rem;
        padding-top: .5rem;
        /* flex: 1;
        display: flex;
        justify-content: center; */
    }
    .doctors-index-rounds-name{
        font-family: PingFangSC-Regular;
        font-size: 16px;
        color: #778CA2;
        padding-left: 24px;
    }
	.doctors-index-rounds-body-item-top{
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid var(--borderColor2);
        padding-top: 3.7%;
        padding-bottom: 0.13rem;
    }
    .doctors-index-rounds-body-item-bottom{
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
    .info-enter-name{
        font-family: var(--fontFamily3);
        font-size: var(--fontSize4);
        color: var(--bgColor4);
    }
</style>
