<template>

    <div class="public-list">
        <el-table :data="tableData" style="width: 100%">
            <el-table-column v-for="(column, index) in columns" :prop="column.prop" :key="index" :label="column.label" :width="column.width">
                <template slot-scope="scope">
                    <span :class="scope.row.oclass">
                        {{scope.row[column.prop]}}
                    </span>
                </template>
            </el-table-column>
            <el-table-column label="操作" v-show="tableBtn">
                <template slot-scope="scope">
                    <el-button v-for="(text,index) in tableBtn" @click.native.prevent="text.method(scope.row)" :class="text.oclass" type="text" size="small" :key="index"  >
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
        return {
            otrue:true
        };
    },
    methods: {
        reBackFn(index) {
            this.inData.i = index;
            this.$emit("reBack", this.inData);
        }
    },
    props: {
        tableData: Array, //父组件传来的 列表 数据
        columns: Array, //父组件传来的 列表标题 数据
        tableBtn: Array //父组件传来的 列表按钮 数据
    },
    model: {
        prop: ["tableData", "columns", "tableBtn"],
        event: "reBack"
    },
    async created() {
    }
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
/* 表格公共组件
父组件一共需要传入3个参数
        tableData: Array, //父组件传来的 列表 数据
        columns: Array, //父组件传来的 列表标题 数据
        tableBtn: Array //父组件传来的 列表按钮 数据


  //列表标题 数据格式
   columns: [
                {
                    prop:"name",
                    label:"姓名"
                },
                {
                    prop:"age",
                    label:"年龄"
                }c   
            ],
   //列表数据格式
   tableDataList: [
                {
                    age: "1545649424290",
                    name: "冠方医院",
                    oclass:"redColor"
                },
                {
                    age: "1545618639429",
                    name: "测试医院",
                    oclass:"redColor"
                }
            ],
            //列表按钮数据格式
            tableBtn: [
                {
					name: "评价",
					oclass:"evaluateBtn",
                    method: (index, row) => {
                        this.evaluateFun(index, row);
                    }
                },
                {
					name: "查看记录",
					oclass:"recordBtn",
                    method: (index, row) => {
                        this.recordFun(index, row);
                    }
                }
            ]


注意：列表标题的prop对应的字符串要和列表数据列表的字段相对应
      列表按钮里面的method是每个按钮对应触发的事件
     列表按钮的oclass是给每个按钮赋值的class名字
     要改变某一竖列表格的样式，按照tableDataList里面的oclass设定类名传过来

  */
</style>
