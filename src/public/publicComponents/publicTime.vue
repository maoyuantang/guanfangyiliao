<template>
    <div class="publicTime">
        <div class="block">
            <span class="demonstration">时间段</span>
            <el-date-picker v-model="valueTime" type="daterange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期" @change="timeChange()" value-format="yyyy-MM-dd" prefix-icon="" size="small" >
            </el-date-picker>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            valueTime: ""
        };
    },
    methods: {
        timeChange() {
            this.$emit("timeValue", this.valueTime);
        }
    },
    async created() {}
};
</script>

<style>
.publicTime>div{
    display: flex;
    display: -webkit-flex;
}
.publicTime input {
    width: 109px !important;
    height: 35px !important;
    border: 1px solid #E5EDF3 !important;
    border-radius: 4px;
    color:#0067FF !important;
}
.publicTime .el-date-editor{
    border:none !important;
}
.demonstration{
    display: inline-block;
    width:37px;
    line-height: 34px;
}
/* 备注

父组件引入
<publicTime @timeValue="timeValueFun"></publicTime>
注意：通过这个方法获取到时间值

timeValueFun(data){
			alert(data)
		},
 */
</style>