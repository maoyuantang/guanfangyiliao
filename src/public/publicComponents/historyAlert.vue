<template>
    <div class="history-alert">
        <el-dialog
        :title="testData.title"
        :visible.sync="testData.show"
        :before-close="handleClose">
        <div class="history-alert-div">
            <div class="history-alert-findby-condition">
                <div class="history-alert-findby-condition-item">
                    <el-button type="primary" size="mini">全部</el-button>
                </div>
                <div class="history-alert-findby-condition-item">
                    <el-button type="primary" size="mini">昨天</el-button>
                </div>
                <div class="history-alert-findby-condition-item">
                    <el-button type="primary" size="mini">三天内</el-button>
                </div>
                <div class="history-alert-findby-condition-item">
                   <span class="history-alert-findby-condition-item-name">时间筛选</span>
                   <el-date-picker
                    v-model="selectTime"
                    type="daterange"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    size="mini"
                    :default-time="['00:00:00', '23:59:59']">
                    </el-date-picker>
                    <span class="history-alert-findby-condition-item-ok">确认</span>
                </div>
            </div>
            <div class="history-alert-findby-name">
                <el-button type="primary" icon="el-icon-search" size="mini"></el-button>
                <el-input v-model="name" placeholder="请输入内容" size="mini"></el-input>
            </div>
            <div class="history-alert-show-content">
                <ul class="history-alert-show-content-ui">
                    <li class="history-alert-show-content-li">
                        <div class="history-alert-show-content-info">
                            <div class="history-alert-show-content-info-img">
                                <img src="" alt="">
                            </div>
                            <div class="history-alert-show-content-info-name">
                                <span></span>
                            </div>
                            <div class="history-alert-show-content-info-time">
                                <span></span>
                            </div>
                            <div class="history-alert-show-content-info-status">
                                <span></span>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        </el-dialog>
    </div>
</template>

<script>
	export default {
        name : 'newModuleTable',
        props:[
            "inData"
        ],
		computed:{
		},
		data(){
            return { 
                testData:{
                    show:true,
                    title:'查看历史计划',
                    list:[
                        {
                            img:'../a.png',
                            name:'555'
                        }
                    ]
                },
                selectTime:[],//选择时间段
                name:'',//名字
            }
		},
		methods:{
            handleClose(){
                console.log('before close')
            }
		},
		async created(){
		}
	}
</script>

<style scoped>
    .history-alert{

    }
    .history-alert-findby-condition{
        display: flex;
        align-items: center;
    }
    .history-alert-findby-condition-item{
        flex:1;
        display: flex;
        align-items: center;
    }
    .history-alert-findby-condition-item>div{
        flex: 3;
    }
    .history-alert-findby-condition-item-name{
        flex: 1;
        text-align: center;
    }
    .history-alert-findby-condition-item-ok{
        flex: 1;
        text-align: center;
    }
    .history-alert-findby-name{
        display: flex;
        flex-direction: row-reverse;
    }
    .history-alert-findby-name>div{
        width: 200px;
    }
</style>