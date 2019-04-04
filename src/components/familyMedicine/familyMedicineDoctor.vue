<template>
	<div class="family-medicine-doctor">
        <div class="family-medicine-doctor-head">
            <div class="family-medicine-doctor-head-left">
                <tag :inData="queryConditions.date" @reback="getDateSelect"></tag>
                <tag :inData="queryConditions.busModules" @reback="getModuleSelect"></tag>
            </div>
            <div class="family-medicine-doctor-head-right">
                <!-- <publicTime @timeValue="getSelectTime"></publicTime> -->
                <span class="time-paragraph">时间段：</span>
                <el-date-picker
                v-model="queryConditions.time"
                type="datetimerange"
                size="mini" value-format="yyyy-MM-dd HH:mm:ss"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
                </el-date-picker>
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
                        <th>{{item.doctorName || ''}}</th>
                        <th>{{item.status || 'null'}}</th>
                        <th><el-button type="danger" plain size="mini" @click="changeStatus(item,index)">服务变更</el-button></th>
                        <th class="family-medicine-doctor-body-spe">
                            <el-button type="warning" size="mini" plain @click="checkDoc(item,index)">查看档案</el-button>
                            <el-button type="success" size="mini" plain @click="sendMsg(item)">发送</el-button>
                            <el-button type="primary" size="mini" plain @click="checkRcord(item)">查看记录</el-button>
                        </th>
                    </tr>
                </tbody>
            </table>
        </div>
         <div class="family-medicine-doctor-footer">
            <el-pagination
                background
                layout="prev, pager, next"
                :page-size="queryConditions.page.size"               
                :current-page="queryConditions.page.current"
                :total="queryConditions.page.total"
                v-if="queryConditions.page.total!=0"
                @current-change="ChangePage"
            ></el-pagination>
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
        <el-dialog
        :visible.sync="chatData.show">
            <chat :sessionId="chatData.sessionId" :doctorVis="chatData.doctorVis"></chat>
        </el-dialog>
        <el-dialog
        title="历史记录"
        :visible.sync="record.show">
            <viewRecord :storyMessage="record.storyMessage"></viewRecord>
        </el-dialog>
        
	</div>
</template>

<script>
    import { mapState } from 'vuex'
    import selftag from './../../public/publicComponents/selftag.vue'
    import tag from './../../public/publicComponents/tag.vue'
    import publicTime from './../../public/publicComponents/publicTime.vue'
    import { stencilName, fetchOrderInfo, updateOrderServices, fetchChatSession, fetchHistoryMessage } from '../../api/apiAll.js'
    import chat from '../../public/publicComponents/chat.vue'
    import viewRecord from './../xiezuo/viewRecord.vue'
    
	export default {
        components:{
            selftag,
            publicTime,
            tag,
            chat,
            viewRecord
        },
        computed:{
			...mapState({
				userInfo:state => state.user.userInfo,
                userSelfInfo:state => state.user.userSelfInfo,   
                global: state => state.global 
			})
        },
        watch:{
            'global.businessModule':{
                handler(n){
                    this.getBusModules()
                }
            },
            'queryConditions.time':{
                handler(n){
                    console.log(n);
                    this.getTableList();
                }
            }
        },
		data () {
			return {
                chatData:{//谭颖的组件 数据   
                    sessionId:'',
                    doctorVis:0,
                    show:false
                },
                record:{//谭颖的组件 数据    
                    storyMessage:[],
                    show:false
                },
                queryConditions:{//查询条件  
                    date:{//日期
                        title:'日期',//标题
                        select:0,//当前选中项
                        list:
                        [
                            {
                                label:'全部',
                                value:''
                            },
                            {
                                label:'今日',
                                value:'today'
                            },
                        ],
                        more:false
                    },
                    busModules:{//业务模块 
                        title:'业务模块',//标题  
                        select:0,//当前选中项
                        list:
                        [
                        ],
                        more:false
                    },
                    time:[],
                    page:{
                        current:1,
                        size:10,
                        total:0
                    },
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
                    show:false,
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
             * 查看记录
             */
            async checkRcord(item){
                console.log(item)
                // return
                let postData = [
                    // {token:this.userInfo.token},
                    // {
                    //     userId:item.userId,
                    //     sessionId
                    // }
                ];
                const session = await fetchChatSession({token:this.userInfo.token},{
                    to:item.userId
                });
                if(session.data&&session.data.errCode===0){
                    postData = [
                        {token:this.userInfo.token},
                        {
                            userId:this.userSelfInfo.userId,
                            sessionId:[session.data.body],
                            msgId:100,
                            pageNums:15
                        }
                    ];
                }else{
                    this.$notify({
						title: '失败',
						message: 'sessionId获取失败',
						type: 'error'
					});
                }
                const res = await fetchHistoryMessage(...postData);
                console.log(res);
                if(res.data&&res.data.errCode===0){
                    this.record.storyMessagesa = res.data.body;
                    this.record.show = true;
                }else{
                    this.$notify({
						title: '失败',
						message: '历史记录获取失败',
						type: 'error'
					});
                }
                
            },
            /**
             * 发送消息
             */
            async sendMsg(item){
                const res = await fetchChatSession({token:this.userInfo.token},{
                    to:item.userId
                });
                console.log(res)
                if(res.data&&res.data.errCode===0){
                    this.chatData.sessionId = res.data.body;
                    this.chatData.show = true;
                }else{

                }


            },
            // /**
            //  * 获取 Sessionid
            //  */
            // async fetchChatSession(){

            // },
            /**
             * 分页
             */
            ChangePage(num){
                this.queryConditions.page.current = num;
                this.getTableList();
            },
            /**
             * 获取用户选择模块
             */
            getModuleSelect(data){
                this.queryConditions.busModules.select = data.index;
                console.log(data);
                this.getTableList();
            },
            // /**
            //  * 初始化接口
            //  */
            // initApi(){
            //     // Promise.all([this.getBusModules(),this.getTableList()])
            // },

			/**
             * 获取日期选项
             */
            getDateSelect(item){
                console.log(item);
                this.queryConditions.date.select = item.index;
                this.getTableList();
            },

            // /**
            // *  获取用户选择时间
            // *
            // */
            // getSelectTime(time){
            //     console.log(time)
            // },
            /**
             * 获取业务模版
             */
            getBusModules(){
                this.queryConditions.busModules.list = this.global.businessModule.map(item=>{
                    item.label = item.name;
                    item.value = item.id;
                    return item;
                });
            },
           

            /**
             * 6.7.家医系统中订单列表（WEB端使用）
             */
            async getTableList(){
                const query = {
                    token:this.userInfo.token,
                    pageNum:this.queryConditions.page.current,
                    pageSize:this.queryConditions.page.size,
                    model:this.queryConditions.busModules.list[this.queryConditions.busModules.select]?this.queryConditions.busModules.list[this.queryConditions.busModules.select].value : '',
                };
                if(this.queryConditions.time.length>=2){
                    query.starTime = this.queryConditions.time[0];
                    query.endTime = this.queryConditions.time[1];
                }
                console.log(query)
                // return;
                const res = await fetchOrderInfo(query);
                console.log(res);
                if(res.data&&res.data.errCode===0){
                    this.tableInfo.thead = res.data.body.header;
                    this.tableInfo.tbody = res.data.body.data2.list;
                    this.queryConditions.page.total = res.data.body.data2.total
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
                    this.getTableList();
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
                console.log(item);
                this.$router.push({
                    path: "/docDetailed",
                    query:{
                        id:item.userId
                    }
	            })
            },
		},
		async created(){
            // this.initApi();
            this.getBusModules();
            this.getTableList();
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
        text-align: left;
        font-family: PingFangSC-Regular;
        font-size: 12px;
        color: #5E6875;
    }
    .family-medicine-doctor-body tbody th{
        font-weight: 200;
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
    .family-medicine-doctor-footer{
        text-align: center;
    }
</style>