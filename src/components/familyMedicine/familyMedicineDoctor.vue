<template>
	<div class="family-medicine-doctor">
		家医系统 医生端
        <div class="family-medicine-doctor-head">
            <div class="family-medicine-doctor-head-left">
                <selftag v-model="dateList" @reback="getDateSelect"></selftag>   
                <selftag v-model="busModules" @reback="getDateSelect"></selftag>    
            </div>
            <div class="family-medicine-doctor-head-right">
                <publicTime @timeValue="getSelectTime"></publicTime>
            </div>
        </div>
        <div class="family-medicine-doctor-body">
            <table>
                <thead class="family-medicine-doctor-thead">
                    <tr>
                        <th>{{tableInfo.thead.businessName || 'null'}}</th>
                        <th>{{tableInfo.thead.modelName || 'null'}}</th>
                        <th>{{tableInfo.thead.orderTime || 'null'}}</th>
                        <th>{{tableInfo.thead.userName || 'null'}}</th>
                        <th>{{tableInfo.thead.userPhone || 'null'}}</th>
                        <th>{{tableInfo.thead.doctorName || 'null'}}</th>
                        <th>{{tableInfo.thead.status || 'null'}}</th>
                        <th>{{tableInfo.thead.orderId || 'null'}}</th>
                        <th class="family-medicine-doctor-body-spe">{{tableInfo.thead.orderNo || 'null'}}</th>
                    </tr>
                </thead>
                <tbody  class="family-medicine-doctor-body">
                    <tr v-for="(item,index) in tableInfo.tbody" :key="index">
                        <th>{{item.businessName || 'null'}}</th>
                        <th>{{item.modelName || 'null'}}</th>
                        <th>{{item.orderTime || 'null'}}</th>
                        <th>{{item.userName || 'null'}}</th>
                        <th>{{item.userPhone || 'null'}}</th>
                        <th>{{item.doctorName || 'null'}}</th>
                        <th>{{item.status || 'null'}}</th>
                        <th><el-button type="danger" plain size="mini" @click="changeStatus(item,index)">服务变更</el-button></th>
                        <th class="family-medicine-doctor-body-spe">
                            <el-button type="warning" size="mini" plain @click="checkDoc(item,index)">查看档案</el-button>
                            <el-button type="success" size="mini" plain>发送</el-button>
                        </th>
                    </tr>
                </tbody>
            </table>
        </div>
        <el-dialog
        :visible.sync="alertInfo.show">
        <div class="alert-centent">
            <h1 class="alert-centent-title">服务变更</h1>
            <div class="alert-centent-item">
                <span class="alert-centent-item-name">时间:</span>
                <div>
                    <el-date-picker
                    v-model="alertInfo.data.time"
                    type="date"
                    size="mini"
                    value-format="yyyy-MM-dd"
                    placeholder="选择日期">
                    </el-date-picker>
                </div>
            </div>
            <div class="alert-centent-item">
                <span class="alert-centent-item-name">地点:</span>
                <div>
                    <el-input
                    placeholder="请输入内容"
                    size="mini"
                    v-model="alertInfo.data.place"
                    clearable>
                    </el-input>
                </div>
            </div>
            <div class="alert-centent-submit">
                <el-button type="primary" @click="submitChange">确定</el-button>
            </div>
        </div>
        <!-- <span>这是一段信息</span>
        <span>
            <el-button @click="alertInfo.show = false">取 消</el-button>
            <el-button type="primary" @click="alertInfo.show = false">确 定</el-button>
        </span> -->
        </el-dialog>
	</div>
</template>

<script>
    import { mapState } from 'vuex'
    import selftag from './../../public/publicComponents/selftag.vue'
    import publicTime from './../../public/publicComponents/publicTime.vue'
    import { stencilName, fetchOrderInfo, updateOrderServices } from '../../api/apiAll.js'
	export default {
        components:{
            selftag,
            publicTime
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
                /**
                 * 顶部日期信息
                 */
				dateList:{
                    more:false,
                    title:'日期',
                    list:[
                        {
                            text:'全部'
                        },
                        {
                            text:'今日'
                        }
                    ]
                },

                /**
                 * 顶部 业务模块 信息
                 */
                busModules:{
                    more:false,
                    title:'业务模块',
                    list:[
                        {
                            text:'全部'
                        },
                        {
                            text:'家庭医生'
                        },
                        {
                            text:'远程监护'
                        },
                        {
                            text:'陪护服务'
                        },
                        {
                            text:'智能陪检'
                        },
                        {
                            text:'在线咨询'
                        },
                        {
                            text:'上门服务'
                        },
                        {
                            text:'家用设备'
                        }
                    ]
                },

                /**
                 * 表格信息
                 */
                tableInfo:{
                    thead:{},
                    tbody:[]
                },

                /**
                 * 弹窗信息
                 */
                alertInfo:{    
                    show:true,
                    data:{ 
                        time:'',
                        place:''
                    },
                    item:null
                }
			}
		},
		methods:{
            /**
             * 初始化接口
             */
            initApi(){
                Promise.all([this.getBusModules(),this.getTableList()])
            },

			/**
             * 获取日期选项
             */
            getDateSelect(item){
                console.log(item)
            },

            /**
            *  获取用户选择时间
            *
            */
            getSelectTime(time){
                console.log(time)
            },

            /**
             * 17.1获取所有业务模版名
             */
            async getBusModules(){
                const res = await stencilName({token:this.userInfo.token});
                console.log(res);
                if(res.data&&res.data.errCode===0){
                    const modulesMap = [
                        {
                            text:'家庭医生',
                            en:'JTYS'
                        },
                        {
                            text:'上门服务',
                            en:'SMFW'
                        },
                        {
                            text:'智能陪检',
                            en:'ZNPJ'
                        },
                        {
                            text:'远程监护',
                            en:'YCJH'
                        },
                        {
                            text:'在线咨询',
                            en:'ZXZX'
                        },
                        {
                            text:'家用设备',
                            en:'JYSB'
                        },
                        {
                            text:'陪护服务',
                            en:'PHFW'
                        }
                    ];
                    this.busModules.list = res.data.body.map(item=>{
                        for(const i of modulesMap){
                            if(item === i.en) return i
                        }
                    });
                    console.log(this.busModules.list)
                }else{
                    this.$notify({
						title: '失败',
						message: '业务模版获取失败',
						type: 'error'
					});
                }
            },

            /**
             * 6.7.家医系统中订单列表（WEB端使用）
             */
            async getTableList(){
                const res = await fetchOrderInfo({token:this.userInfo.token});
                console.log(res);
                if(res.data&&res.data.errCode===0){
                    this.tableInfo.thead = res.data.body.header;
                    this.tableInfo.tbody = res.data.body.data2.list;
                    console.log(this.tableInfo)
                }else{
                    this.$notify({
						title: '失败',
						message: '列表数据获取失败',
						type: 'error'
					});
                }
            },

            /**
             * 弹窗被关闭前
             */
            handleClose(){
                console.log('弹窗被关闭了')
            },

            /**
             * 服务变更 按钮被点击
             */
            changeStatus(item,index){
                console.log('enter')
                this.alertInfo.item = item;
                this.alertInfo.show = true
                console.log(item)
            },

            /**
             * 提交 服务变更
             */
            async submitChange(){
                console.log(this.alertInfo.item)
                const option = [
                    {token:this.userInfo.token},
                    {
                        orderId:this.alertInfo.item.orderId,
                        serviceLocation:this.alertInfo.data.place,
                        serviceTime:this.alertInfo.data.time
                    }
                ];
                console.log(option)
                const res = await updateOrderServices(...option);
                console.log(res);
                if(res.data&&res.data.errCode===0){
                    this.$notify({
                        title: '成功',
                        message: '修改成功',
                        type: 'success'
                    });
                    this.alertInfo = {
                        show:false,
                        data:{ 
                            time:'',
                            place:''
                        },
                        item:null
                    }
                }else{
                    this.$notify({
						title: '失败',
						message: '修改失败',
						type: 'error'
					});
                }
            },

            /**
             * 查看档案
             */
            checkDoc(item,index){
                console.log(item)
            },
		},
		async created(){
            this.initApi();
		}
	}
</script>

<style scoped>
	.family-medicine-doctor{

    }
    .family-medicine-doctor-head{
        display: flex;

    }
    .family-medicine-doctor-head>div{
        flex: 1;
    }
    .family-medicine-doctor-body table{
        width: 100%;
    }
    .family-medicine-doctor-body tr{
        border-bottom: 1px solid #E5EDF3;
        display: flex;
    }
    .family-medicine-doctor-body th{
        padding-top: 0.1rem;
        padding-bottom: 0.12rem;
        flex: 1;
        text-align: center;
    }
    .family-medicine-doctor-body table .family-medicine-doctor-body-spe{
        flex: 2;
    }
    .alert-centent-item{
        display: flex;
        align-items: center;
        padding-top: 0.24rem;
        
    }
    .alert-centent-item > span{
        flex: 1;
    }
    .alert-centent-item > div{
        flex: 4;
    }
    .alert-centent-item .el-input {
        max-width: 2rem;
    }
    .alert-centent-item .el-date-editor{
        max-width: 2rem;
    }
    .alert-centent-title{
        font-family: var(--fontFamily3);
        font-size: var(--fontSize7);
        color: #323C47;
        letter-spacing: 0;
        text-align: center;
    }
    .alert-centent-submit{
        padding-top: 0.59rem;
    }
    .alert-centent-submit>button{
        width: 100%;
    }
    .alert-centent{
        padding-left: 0.2rem;
    }
</style>