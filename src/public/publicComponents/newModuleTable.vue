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
                        <img src="../../assets/img/a-6.png" alt="" srcset="">
                    </div>
                    <div class="new-module-table-li-item-name">
                        <span>发起人姓名</span>
                    </div>
                    <div class="new-module-table-li-item-group">
                        <span>重庆市西南医院 | 神经内科</span>
                    </div>
                    <div class="new-module-table-li-item-num">
                        <span>ZZ021501(转诊编号)</span>
                    </div>
                    <div class="new-module-table-li-item-time">
                        <span>2018-12-25 10:00</span>
                    </div>
                    <div class="new-module-table-li-item-status">
                        <span>未开始</span>
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
		computed:{
		},
		data(){
            return { 

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
}
.new-module-table-li-item-status{
    flex: 1;
    display: flex;
    align-items: center;
    font-family: PingFangSC-Regular;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #FFAB2B;
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
</style>