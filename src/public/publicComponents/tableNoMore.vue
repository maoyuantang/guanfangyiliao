<!-- 该组件 实现 表格 被要求 没有数据 显示 没有 更多  -->
<template>
    <div class="table-no-more">
        <span>暂无数据</span>
    </div>
</template>
<script>
export default {
    name: "tableNoMore",
    data() {
        return {
            
        };
    },
    methods: {
        
    },
    
};
</script>
<style scoped>
    .table-no-more{
        min-height: 60px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .table-no-more > span{
        color: #909399;
        font-size: 14px;
    }
</style>