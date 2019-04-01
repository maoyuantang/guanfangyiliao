<!-- 设备自测 -->
<template>
	<div class="equipment">
       <lineChart :inData="testData1"></lineChart>
    </div>
</template>

<script>
    // import { mapState } from 'vuex'
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
			// ...mapState({
			// 	userInfo:state => state.user.userInfo,
            //     userSelfInfo:state => state.user.userSelfInfo,   
            //     global: state => state.global 
			// })
        },
		data () {
			return {
                testData1:{
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
            }
		},
		
		methods:{
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