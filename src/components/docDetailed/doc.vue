<template>
	<div class="doc">
		<div class="doc-nor-item">
            <div class="doc-nor-item-left">
                <img src="../../../static/assets/img/随访计划@2x.png" alt="" srcset="">
            </div>
            <div class="doc-nor-item-right">
                <p class="doc-nor-item-title">随访计划</p>
                <p class="doc-nor-item-time">{{followUp.nearDate || 'empty'}} </p>
                <p class="doc-nor-item-text" v-for="(item,index) in followUp.content" :key="index">{{item}}</p>
            </div>
        </div>

		<div class="doc-nor-item">
            <div class="doc-nor-item-left">
                <img src="../../../static/assets/img/风险自评@2x.png" alt="" srcset="">
            </div>
            <div class="doc-nor-item-right">
                <p class="doc-nor-item-title">风险评估</p>
                <p class="doc-nor-item-time">最近一次处方时间 </p>
                <p class="doc-nor-item-text">此处显示最近一次处方门诊医生的处理意见或者医嘱或者其他 反正是留一段字符 备用</p>
            </div>
        </div>

		<div class="doc-nor-item">
            <div class="doc-nor-item-left">
                <img src="../../../static/assets/img/设备自测@2x.png" alt="" srcset="">
            </div>
            <div class="doc-nor-item-right">
                <p class="doc-nor-item-title">设备自测</p>
                <p class="doc-nor-item-time">{{selfTest.nearlyDate}} </p>
                <p class="doc-nor-item-text">{{selfTest.data}}</p>
            </div>
        </div>

		<div class="doc-nor-item">
            <div class="doc-nor-item-left">
                <img src="../../../static/assets/img/上传@2x.png" alt="" srcset="">
            </div>
            <div class="doc-nor-item-right">
                <p class="doc-nor-item-title">上传档案</p>
                <p class="doc-nor-item-time">最近一次处方时间 </p>
                <p class="doc-nor-item-text">此处显示最近一次处方门诊医生的处理意见或者医嘱或者其他 反正是留一段字符 备用</p>
            </div>
        </div>
	</div>
</template>

<script>
    import { mapState } from "vuex"
    import { nearlyFollowup, nearlyDevice } from '../../api/apiAll.js'
	export default {
        props:[
            "inData"
        ],
		watch:{
			
		},
		data () {
			return {
				followUp:{//随访
                    nearDate:'',//最近时间
                    content:[],//内容
                },
                selfTest:{//设备自测
                    nearlyDate:'',
                    data:''
                }
			}
		},
		computed:{
			...mapState({
                userState: state => state.user.userInfo,
                userSelfInfo:state => state.user.userSelfInfo, 
                global: state => state.global
            }),
		},
		methods:{
            /**
             * 获取 成员最近随访
             */
            async getNearlyFollowup(){
                const res = await nearlyFollowup({
                    token: this.userState.token,
                    userId:this.inData.userId,
                    memberId:this.inData.id
                });
                console.log(res);
                if (res.data && res.data.errCode === 0){
                    this.followUp = res.data.body;
                }else{
                    this.$notify({
						title: '失败',
						message: '随访计划获取失败',
						type: 'error'
					});
                }
            },
            /**
             * 获取 成员最近自测 
             */
            async nearlyDevice(){
                const res = await nearlyDevice({
                    token: this.userState.token,
                    userId:this.inData.userId,
                    memberId:this.inData.id
                });
                console.log(res);
                if (res.data && res.data.errCode === 0){
                    this.selfTest = res.data.body;
                }else{
                    this.$notify({
						title: '失败',
						message: '设备自测获取失败',
						type: 'error'
					});
                }
            },
		},
		components:{
            
		},
		async created(){
            console.log(this.inData);
            this.getNearlyFollowup();
            this.nearlyDevice();
		}
	}
</script>

<style scoped>
	.doc{
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
        font-weight: bold;
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