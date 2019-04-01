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
                        <th>{{item.docName}}</th>
                        <th>{{item.sendTime}}</th>
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
    // import { mapState } from 'vuex'
	export default {
        props: ['inData'],
		components:{
			
		},
		watch:{
			
		},
		computed:{
			// ...mapState({
			// 	userInfo:state => state.user.userInfo,
            //     userSelfInfo:state => state.user.userSelfInfo,   
            //     global: state => state.global 
			// })
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
		},
		async created(){
		}
	}
</script>

<style scoped>
    .assessment{

    }
</style>