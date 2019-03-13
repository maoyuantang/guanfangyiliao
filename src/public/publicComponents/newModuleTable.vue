<template>
<!-- <div class="new-module-table">
	<div class="new-module-table-head">
        <span class="new-module-table-head-text">双向转诊</span>
        <span class="new-module-table-head-btn">查看更多</span>
    </div>
    <div class="new-module-table-body">
        <ul class="new-module-table-ul">
            <li class="new-module-table-li" v-for="i in 4" :key="i"> -->
                <div class="new-module-table-li-item">
                    <div class="new-module-table-li-item-img">
                        <img :src="inData.headimg || '../../assets/img/a-6.png' " alt="" srcset="">
                    </div>
                    <div class="new-module-table-li-item-name">
                        <span>{{inData.userName || '发起人姓名'}}</span>
                    </div>
                    <div class="new-module-table-li-item-group">
                        <span>{{inData.hospital || '医院'}} | {{inData.department || '科室'}}</span>
                    </div>
                    <div class="new-module-table-li-item-num">
                        <span>{{inData.num || '转诊编号'}}</span>
                    </div>
                    <div class="new-module-table-li-item-time new-module-table-li-item-time-spe">
                        <span>{{inData.time || '时间'}}</span>
                    </div>
                    <div class="new-module-table-li-item-status new-module-table-li-item-time-spe">
                        <span :class="colorClassMap[inData.status]">{{inData.status || '状态'}}</span>
                    </div>
                    <div class="new-module-table-li-item-btns">
                        <slot></slot>
                    </div>
                </div>
            <!-- </li>
        </ul>
    </div>
</div> -->
</template>

<script>
	export default {
        name : 'newModuleTable',
        props:[
            'inData'
        ],
		computed:{
		},
		data(){
            return { 
                colorClassMap:{
                    '等待审核':'status0',
                    '未开始':'status0',
                    '等待接诊':'status1',
                    '进行中':'status1',
                    '等待出院':'status2',
                }
            }
		},
		methods:{
		},
		async created(){
		}
	}
</script>

<style scoped>
.new-module-table{
    background: #FFFFFF;
    border: 1px solid #EBF0F4;
    border-radius: 3px;
    padding-left: 14px;
    padding-right: 30px;
}
.new-module-table-head{
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 23px;
    padding-bottom: 23px;
}
.new-module-table-head-text{
    font-family: PingFangSC-Regular;
    font-size: 22px;
    color: #323C47;
    letter-spacing: 0;
    line-height: 28px;
    
}
.new-module-table-head-btn{
    background: #FFFFFF;
    border: 1px solid #E4E8EB;
    border-radius: 5px;
    transition: .5s;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #4285F4;
    cursor: pointer;
    width: 113px;
    height: 32px;
    line-height: 32px;
    text-align: center;
}
.new-module-table-head-btn:hover{
    color: white;
    background-color: #4285F4;
}
.new-module-table-li-item{
    display: flex;
    padding-left: 16px;
    align-items: center;
    border-top: 1px solid #EBF0F4;
    padding-top: 14px;
    padding-bottom: 16px;
}
.new-module-table-li-item-img{
    width: 42px;
    height: 42px;
    margin-right: 25px;
}
.new-module-table-li-item-img>img{
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    display: flex;
    align-items: center;
}
.new-module-table-li-item-name{
    flex: 1;
    display: flex;
    align-items: center;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #626262;
    letter-spacing: 0;
}
.new-module-table-li-item-group{
    flex: 1;
    display: flex;
    align-items: center;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #626262;
    letter-spacing: 0;
}
.new-module-table-li-item-num{
    flex: 1; 
    display: flex;
    align-items: center;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #626262;
    letter-spacing: 0;
    overflow: hidden;
}
.new-module-table-li-item-status{
    flex: 1;
    display: flex;
    align-items: center;
    font-family: PingFangSC-Regular;
    /* font-family: PingFangSC-Regular; */
    font-size: 14px;
    /* color: #FFAB2B; */
    text-align: center;
}
.new-module-table-li-item-btns{
    flex: 1;
    display: flex;
    align-items: center;
}
.new-module-table-li-item-time{
    flex: 1;
    display: flex;
    align-items: center;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #626262;
    letter-spacing: 0;
}
.new-module-table-li-item-time-spe{
    padding-left: 0.1rem;
}
.status0{
    color: #FFAB2B;
}
.status1{
    color: #FE4D97;
}
.status2{
    color: #6DD230;
}
</style>