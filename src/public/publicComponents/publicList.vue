<template>
    <div class="public-list">
        <el-table :data="tableData" style="width: 100%">
            <el-table-column v-for="(column, index) in columns" :prop="column.prop" :key="index" :label="column.label" :width="column.width" :class="column.oclass">
                <template slot-scope="scope">
                    <span>
                        {{scope.row[column.prop]}}
                    </span>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button v-for="(text,index) in tableBtn" @click.native.prevent="text.method('d','dd')" type="text" size="small">
                        {{text.name}}
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    data() {
        return {};
    },
    methods: {
        reBackFn(index) {
            this.inData.i = index;
            this.$emit("reBack", this.inData);
        }
    },
    props: {
        tableData: Array,//父组件传来的 列表 数据
        columns: Array,//父组件传来的 列表标题 数据
        tableBtn: Array//父组件传来的 列表按钮 数据
    },
    model: {
        prop: ["tableData", "columns","tableBtn"],
        event: "reBack"
    },
    async created() {}
};
</script>

<style>
.public-list td {
    padding: 8px 0;
    font-family: PingFangSC-Regular;
    font-size: var(--fontSize1);
    color: #5e6875;
    letter-spacing: 0;
}
.public-list th {
    font-family: PingFangSC-Semibold;
    font-size: var(--fontSize2);
    color: #5e6875;
    letter-spacing: 0;
}
</style>
