<template>
	<div class="education-doc">
        <div class="education-doc-top">
            <div class="education-doc-top-left">
                <tag :inData="queryConditions.days" @reback="getdaysSelect"></tag>
            </div>
            <div class="education-doc-top-right select-time-css">
                <!-- <publicTime @timeValue="timeValueFun"></publicTime> -->
                <span class="time-paragraph">时间段：</span>
                <el-date-picker
                v-model="queryConditions.time"
                type="datetimerange"
                size="mini" value-format="yyyy-MM-dd HH:mm:ss"
                range-separator="-"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
                </el-date-picker>
            </div>
            
        </div>
        <div class="education-doc-body-container">
            <div class="education-doc-body">
                <educationDocLabel v-for="(item, index) in list" :key="index" :inData="item" @reback="getItemClick"></educationDocLabel>
            </div>
        </div>
        
        <div class="education-doc-foo">
            <div class="education-doc-page">
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
        </div>
        <!-- 进入学习 弹窗 -->
        <el-dialog
        title=" "
        append-to-body
        width="50vw"
        :visible.sync="alertData.show"
        :before-close="closeAlert"
        >
            <div class="doctors-index-education-alert">
                <video ref="videoElement" class="centeredVideo" controls autoplay >Your browser is too old which doesn't support HTML5 video.</video>
            </div>
        </el-dialog>
	</div>
</template>

<script>
    import { mapState } from "vuex"
    import tag from '../../public/publicComponents/tag.vue'
    import publicTime from '../../public/publicComponents/publicTime.vue'
    import educationDocLabel from '../../public/publicComponents/educationDocLabel.vue'
    import { webCourseList, signUp, intoClassroom, intoPlatform } from '../../api/apiAll.js'
    import urls from '../../enums/apiBaseURL.js'
    import flv from 'flv.js'
    
	export default {
		computed:{
            ...mapState({
                userState: state => state.user.userInfo,
                userSelfInfo: state => state.user.userSelfInfo,
                global: state => state.global
            }),
        },
        watch:{
            'queryConditions.time':{
                handler(n){
                    // console.log(n);
                    this.getWebCourseList();
                }
            }
        },
		components:{
            tag,
            publicTime,
            educationDocLabel
		},
		data () {
			return {
                /**
                 * 弹窗数据
                 */
                alertData:{ 
                    show:false
                },
                queryConditions:{//查询条件   
                    days:{
                        title:'日期',
                        select:0,
                        list:[
                            {
                                label:'全部',
                                value:false
                            },
                            {
                                label:'今日',
                                value:true
                            },
                        ]
                    },
                    time:null,
                    // [//时间段 (默认就写成去年的今天 到 现在) 
                    //     // `${new Date(new Date().getTime()-365*24*60*60*1000).getFullYear()}-${new Date(new Date().getTime()-365*24*60*60*1000).getMonth()<9?'0'+(new Date(new Date().getTime()-365*24*60*60*1000).getMonth()+1).toString():new Date(new Date().getTime()-365*24*60*60*1000).getMonth()+1}-${new Date(new Date().getTime()-365*24*60*60*1000).getDate()<10?'0'+(new Date(new Date().getTime()-365*24*60*60*1000).getDate()).toString():new Date(new Date().getTime()-365*24*60*60*1000).getDate()}`,
                    //     // `${new Date().getFullYear()}-${new Date().getMonth()<9?'0'+(new Date().getMonth()+1).toString():new Date().getMonth()+1}-${new Date().getDate()<10?'0'+(new Date().getDate()).toString():new Date().getDate()}`,
                    // ], 
                    page:{//分页  
                        current:1,
                        size:12,
                        total:0
                    }
                },
                list:[]
			}
		},
		methods:{
            /**
             * 关闭 弹窗
             */
            closeAlert(){
                this.alertData.show = false;
            },
            /**
             * 元素 按钮 被点击
             */
            async getItemClick(item){
                const ajaxMap = {
                    TOSIGNUP:this.signUp,//报名
                    TOLEARN:this.study,//进入学习
                    TOTEACH:this.teaching,//进入教学
                    NULL:this.someWrong,//参数错误
                };
                this.list.find(i=>i.id===item.id).loading = true;
                await ajaxMap[item.action || 'NULL'](item);
                this.list.find(i=>i.id===item.id).loading = false;
            },
            /**
             * 报名
             */
            async signUp(item){
                // console.log('enter signUp');
                const res = await signUp({
                    token:this.userState.token,
                    id:item.id
                });
                // console.log(res);
                if(res.data && res.data.errCode === 0){
                    this.$notify({
                        title: '成功',
                        message: '报名成功',
                        type: 'success'
                    });
                    this.getWebCourseList();
                }else{
                    this.$notify({
                        title: '报名失败',
                        message: res.data.errMsg,
                        type: 'error'
                    });
                }
            },
            /**
             * 进入学习
             */
            async study(item){
                const res = await intoClassroom({
                    token:this.userState.token,
                    id:item.id
                });
                // console.log(res);
                if(res.data && res.data.errCode === 0){
                    this.createVedio(res.data.body.playUrl.flv.replace('http','https'));
                    // this.$notify({
                    //     title: '成功',
                    //     message: '报名成功',
                    //     type: 'success'
                    // });
                    // this.getWebCourseList();
                }else{
                    this.$notify({
                        title: '进入失败',
                        message: res.data.errMsg,
                        type: 'error'
                    });
                }
            },
            /**
             * 进入教学
             */
            async teaching(item){
                const res = await intoPlatform({
                    token:this.userState.token,
                    id:item.id
                });
                // console.log(res);
                if(res.data && res.data.errCode === 0){
                    // this.$notify({
                    //     title: '成功',
                    //     message: '报名成功',
                    //     type: 'success'
                    // });
                    // this.getWebCourseList();
                }else{
                    this.$notify({
                        title: '进入失败',
                        message: res.data.errMsg,
                        type: 'error'
                    });
                }
            },
            /**
             * 开启 视频
             */
            createVedio(url){
                this.$nextTick(arg=>{
                    if (flv.isSupported()) {
                        const flvPlayer = flv.createPlayer({
                            type: 'flv',
                            url
                        });
                        flvPlayer.attachMediaElement(this.$refs.videoElement);
                        flvPlayer.load();
                        flvPlayer.play();
                        this.$refs.videoElement.play();
                        this.alertData.show = true;
                    }
                });
            },
            /**
             * 参数 传递 错误
             */
            someWrong(){
                this.$notify({
                    title: '错误',
                    message: '参数错误',
                    type: 'error'
                });
            },
            /**
             * 切换分页
             */
            ChangePage(num){
                // console.log(num);
                this.queryConditions.page.current = num;
                this.getWebCourseList();
            },
            /**
             * 12.7 web获取课程列表【医生web】
             */
            async getWebCourseList(){
                const query = {
                    token:this.userState.token,
                    isToday:this.queryConditions.days.list[this.queryConditions.days.select].value,
                    pageSize:this.queryConditions.page.size,
                    pageNum:this.queryConditions.page.current,
                };
                if(this.queryConditions.time){
                    query.startTime = this.queryConditions.time[0];
                    query.endTime = this.queryConditions.time[1];
                }
                // console.log(query)
                const res = await webCourseList(query);
                // console.log(res);
                if(res.data && res.data.errCode === 0){
                    this.list = res.data.body.list.map(item=>{
                        item.imgUrl = item.headId?`${urls.imgBaseUrl}/m/v1/api/hdfs/fs/download/${item.headId}`:item.headId;
                        item.loading = false;
                        return item;
                    });
                    this.queryConditions.page.total = res.data.body.total;
                    // console.log(this.list)
                }else{
                     this.$notify({
                        title: '课程列表获取失败',
                        message: res.data.errMsg,
                        type: 'error'
                    });
                }
            },
            /**
             * 获取日期选取情况
             */
            getdaysSelect(data){
                this.queryConditions.days.select = data.index;
                // console.log(this.queryConditions.days.select)
                this.getWebCourseList();
            },
            /**
             * 获取 选取 时间
             */
            timeValueFun(time){
                // console.log(enter)
                this.queryConditions.time = time;
                // console.log(this.queryConditions.time);
                
            },
		},
		async created(){
            this.getWebCourseList();
		}
	}
</script>

<style scoped>
	.education-doc{

    }
    .education-doc-top{
        display: flex;
    }
    .education-doc-top-left{
        flex:1;
    }
    .education-doc-top-right{
        flex:1;
    }
    .time-paragraph{
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #646464;
    }
    .education-doc-body-container{
        overflow-x: scroll;
        overflow-y: hidden;
        width: 100%;
    }
    .education-doc-body{
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        /* grid-column-gap: 0.2rem; */
        justify-items: center;
        align-items:center;
        grid-row-gap:0.2rem;
        padding-top: 0.2rem;
        min-width: 16rem;;
    }
    .education-doc-page{
        text-align: center;
    }
    .centeredVideo{
        width: 100%;
        height: 100%;
    }
    .doctors-index-education-alert{
        height: 40vw;
    }
</style>