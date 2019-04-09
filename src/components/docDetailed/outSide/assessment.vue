<!-- 风险评估 -->
<template>
	<div class="assessment">
       <div class="plan-content">
            <table class="plan-table" cellpadding="10">
                <thead class="plan-thead">
                    <tr>
                        <th>名称</th>
                        <th>发送医生</th>
                        <th>发送时间</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody class="plan-tbody">
                    <tr v-for="(item,index) in list" :key="index">
                        <th>{{item.title}}</th>
                        <th>{{item.familyMemberName}}</th>
                        <th>{{item.createTime}}</th>
                        <th class="see">查看</th>
                    </tr>
                </tbody>
            </table>
            <div class="page">
                <el-pagination
					background
					layout="prev, pager, next"
					:page-size="page.size"               
					:current-page="page.current"
					:total="page.total"
					v-if="page.total!=0"
					@current-change="ChangePage"
			    ></el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    import {queryPageByassessPlan} from '../../../api/apiAll.js'
	export default {
        props: ['inData'],
		components:{
			
		},
		watch:{
			
		},
		computed:{
			...mapState({
				userInfo:state => state.user.userInfo,
                userSelfInfo:state => state.user.userSelfInfo,   
                global: state => state.global 
			})
        },
		data () {
			return {
                page:{
                    size:10,
                    current:1,  
                    total:0
                },
                list:[]
            }
		},
		
		methods:{
            /**
             *  12.WEB端获取评估计划列表
             */
            async getQueryPageByassessPlan(){
                const res = await queryPageByassessPlan({
                    token:this.userInfo.token,
                    pageNum:this.page.current,                                              
                    pageSize:this.page.size,                                         
                    familyMemberId:this.inData.id,
                });
                console.log({
                    token:this.userInfo.token,
                    pageNum:this.page.current,                                              
                    pageSize:this.page.size,                                         
                    familyMemberId:this.inData.id,
                })
                console.log(res);
                if(res.data && res.data.errCode === 0){
                    this.list = res.data.body.data2.list;
                    this.page.total = res.data.body.data2.total;
                    console.log(this.list)
				}else{
					this.$notify({
						title: '评估计划列表获取失败',
						message: res.data.errMsg,  
						type: 'error'
					});
				}
            },
            /**
             * 分页
             */
            ChangePage(num){
                this.page.current = num;
                this.getQueryPageByassessPlan();
            }
		},
		async created(){
            this.getQueryPageByassessPlan();
		}
	}
</script>

<style scoped>
    .assessment{

    }
    .plan-table{
        width: 80%;
        margin: 0 auto;
        margin-top: .24rem;
    }
    .plan-table th{
        padding-left: .2rem;
    }
    .plan-thead{
        background-color: #E9C457;
    }
    .plan-tbody{
       
    }
    .plan-thead>tr{
        height: .48rem;
        font-family: MicrosoftYaHei;
        font-size: 12px;
        color: rgba(0,0,0,0.87);
    }
    .plan-tbody>tr{
        height: .6rem;;
        padding-left: .1rem;
        padding-right: .1rem;
        font-family: MicrosoftYaHei;
        font-size: 12px;
        color: #646464;
        text-align: left;
    }
    .plan-tbody>tr:nth-child(odd){
        background-color: #F1F5F8;
    }
    .see{
        font-family: MicrosoftYaHei;
        font-size: 12px;
        color: #108E26;
        cursor: pointer;
    }
    .page{
        text-align: center;
    }
</style>