<!-- 设备自测 -->
<template>
	<div class="equipment">
        <div class="equipment-content">
            <lineChart :inData="item" v-for="(item,index) in listData" :key="index"></lineChart>
            <lineChart :inData="chartData"></lineChart>
        </div>
       <div class="pagination">
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
       <!-- {{userInfo.token}} -->
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    import lineChart from '../../../public/publicComponents/lineChart.vue'
    import {webDocGetDeviceList} from '../../../api/apiAll.js'
	export default {
        props: ['inData'],
		components:{
			lineChart
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
                    size:2,
                    current:1,
                    total:0
                },
                listData:[],
                chartData:{//图表 数据
                    xAxis:['周一','周二','周三','周四','周五','周六','周日'],//x轴  
                    series:[
                        {
                            name:'邮件营销',
                            data:[120, 132, 101, 134, 90, 230, 210]
                        },
                        {
                            name:'联盟广告',
                            data:[220, 182, 191, 234, 290, 330, 310]
                        },
                    ]
                }
                // testData1:{
                //     xAxis:['周一','周二','周三','周四','周五','周六','周日'],//x轴  
                //     series:[
                //         {
                //             name:'邮件营销',
                //             data:[120, 132, 101, 134, 90, 230, 210]
                //         },
                //         {
                //             name:'联盟广告',
                //             data:[220, 182, 191, 234, 290, 330, 310]
                //         },
                //     ]
                // }
            }
		},
		
		methods:{
            /**
             * 分页 触发
             */
            ChangePage(num){
                this.page.current = num;
                this.getWebDocGetDeviceList();
            },
            /**
             * 获取设备信息
             */
            async getWebDocGetDeviceList(){
                const res = await webDocGetDeviceList({
                    token:this.userInfo.token,
                    userId:this.inData.userId,
                    memberId:this.inData.id,
                    pageNum:this.page.current,
                    pageSize:this.page.size
                });
                console.log(res);
                if(res.data && res.data.errCode === 0){
                    this.listData = res.data.body.list.map(iten=>{
                        if(item.deviceType === 'TONOMETER'){//血压计
                            return {
                                xAxis:item.dataList.map(ele=>ele.dataTime),
                                series:[{
                                    name:'收缩压',
                                    data:item.dataList.map(ele=>ele.firstValue)
                                },{
                                    name:'舒张压',
                                    data:item.dataList.map(ele=>ele.secondValue)
                                },{
                                    name:'脉搏',
                                    data:item.dataList.map(ele=>ele.thirdValue)
                                }]
                            }
                        }else{
                            return {
                                xAxis:item.dataList.map(ele=>ele.dataTime),
                                series:[{
                                    name:'血糖',
                                    data:item.dataList.map(ele=>ele.thirdValue)
                                }]
                            }
                        }
                    });
                    this.page.total = res.data.body.total
				}else{
					this.$notify({
						title: '获取设备信息获取失败',
						message: res.data.errMsg,  
						type: 'error'
					});
				}

                
            }
		},
		async created(){
            this.getWebDocGetDeviceList();
		}
	}
</script>

<style scoped>
    .equipment{

    }
</style>