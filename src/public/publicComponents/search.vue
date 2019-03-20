<template>
    <div class="search">
            <el-input v-model="input" placeholder="Search by keywords…"></el-input>
            <span @click="searchBtn">
                <img src="../../assets/img/search.png" alt="">
            </span>

    </div>
</template>

<script>
export default {
    data() {
        return {
            input: ""
        };
    },
    methods: {
        searchBtn(){
            this.$emit('searchValue',this.input)
        }
    },
    async created() {}
};
</script>

<style>
.search {
    position: relative;
    width: 293px;
    height: 38px;
    background: #ffffff;
    border: 1px solid #e5edf3;
    -webkit-box-shadow: 0 6px 36px 0 rgba(0, 62, 100, 0.04);
    box-shadow: 0 6px 36px 0 rgba(0, 62, 100, 0.04);
    border-radius: 38px;
}
.search .el-input__inner{
    border-radius: 38px;
    font-size: 14px;
color: #0067FF;
}
.search>span{
    display: block;
    position: absolute;
    right: 23px;
    top: 10px;
    width: 20px;
    height: 20px;
    cursor: pointer;
}
.search>span>img{
    width:100%;
    height: 100%;
}
.search input{
    width: 293px;
    height: 38px;
}
/* 备注

父组件引入
<search @searchValue="searchChange"></search>
注意：searchChange是点击搜索触发事件
 */
</style>