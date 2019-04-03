<template>

    <div class="public-list">
        <el-table :data="tableData" ref="multipleTable" style="width: 100%" @selection-change="reBackFn" :cell-class-name="cellClassName" @cell-click="cellClick" :max-height="450">

            <el-table-column v-if="checkVisable" type="selection" width="55">
            </el-table-column>
            <el-table-column v-for="(column, index) in columns" :prop="column.prop" :key="index" :label="column.label" :width="column.width" label-class-name="tableHeadColor" :show-overflow-tooltip="true">

                <template slot-scope="scope">
                    <span :class="scope.row.oclass">
                        <!-- {{scope.row[column.prop]?scope.row[column.prop]:0}} -->
                        {{scope.row[column.prop]}} {{column.width}}
                    </span>
                </template>
            </el-table-column>
            <el-table-column label="操作" v-if="handleVisiable" width="300">
                <template slot-scope="scope">
                    <el-button v-for="(text,index) in tableBtn" @click.native.prevent="text.method(index,scope.row)" :class="text.oclass" type="text" size="small" :key="index">
                        {{text.name}}
                    </el-button>
                </template>
            </el-table-column>
        </el-table>

        <div style="text-align:center;padding:10px 0">
            <el-pagination background layout="prev, pager, next" :page-size="pageSize" :total="total" @current-change="changeCurrent">
            </el-pagination>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            otrue: true,
            multipleTable: [],
            handleVisiable: false
        };
    },
    methods: {
        reBackFn(val) {
            this.$emit("reBack", val);
        },
        cellClassName(data) {
            if (this.cellColor) {
                for (let i = 0; i < this.cellColor.length; i++) {
                    if (data.columnIndex == this.cellColor[i].cell) {
                        return this.cellColor[i].oclass;
                    }
                }
            }
        },
        cellClick(row, column, cell, event) {
            if (this.cellColor) {
                for (let i = 0; i < this.cellColor.length; i++) {
                    if (column.label == this.cellColor[i].value) {
                        console.log(column);
                        this.$emit("cellClickData", [row, column]);
                    }
                }
            }
        },
        //如果不传按钮则操作隐藏
        hideHandle() {
            if (this.tableBtn || this.tableBtn.length < 1) {
                this.handleVisiable = true;
            } else {
                this.handleVisiable = false;
            }
        },
        changeCurrent(data) {
            this.$emit("rebackFenye", data);
        }
    },
    props: {
        tableData: Array, //父组件传来的 列表 数据
        columns: Array, //父组件传来的 列表标题 数据
        tableBtn: Array, //父组件传来的 列表按钮 数据
        checkVisable: Boolean, //父组件传来的是否有多选框
        cellColor: Array, // 添加类名和事件
        total: Number,
        pageSize: Number
    },
    model: {
        prop: [
            "tableData",
            "columns",
            "tableBtn",
            "checkVisable",
            "cellColor",
            "adminTotal",
            "pageSize"
        ],
        event: "reBack"
    },
    async created() {
        this.reBackFn();
        this.hideHandle();
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

.public-list th .cell {
    display: flex;
    justify-content: start;
    align-items: center;
}
.public-list th {
    font-family: PingFangSC-Semibold;
    font-size: var(--fontSize2);
    color: #5e6875;
    letter-spacing: 0;
    border-right: none;
}
.public-list td {
    border-right: none;
}
.public-list td .cell {
    display: flex;
    justify-content: start;
    align-items: center;
}
.public-list > div {
    border: none;
}
.public-list .el-table .cell {
    padding-left: 0;
}

.public-list
    /deep/
    .el-table__header-wrapper
    .el-table__header
    .has-gutter
    tr
    th
    div {
    text-align: center;
    white-space: nowrap !important;
    padding: 0;
    overflow: hidden;
    text-overflow: ellipsis;
}
.public-list /deep/ .el-table__body-wrapper tbody tr td .cell span {
    text-align: center;
    /* white-space: nowrap !important; */
    padding: 0;
    overflow: hidden;
    text-overflow: ellipsis;
}
.el-table th>.cell, .el-table th div{
    display: inline !important;
    white-space: nowrap !important;
}


/* 表格公共组件
 <tableList :tableData="adminTableData" :columns="columns" :tableBtn="tableBtn" :cellColor="cellColor" @cellClickData="cellClickData"> </tableList>
父组件一共需要传入的参数
        tableData: Array, //父组件传来的 列表 数据
        columns: Array, //父组件传来的 列表标题 数据
        tableBtn: Array //父组件传来的 列表按钮 数据
checkVisable: Boolean, //父组件传来的是否有多选框      //表格前面不需要多选框可不传
        cellColor: Array //父组件传来的要改变颜色列及事件

  //列表标题 数据格式
   columns: [
                {
                    prop:"name",
                    label:"姓名"
                },
                {
                    prop:"age",
                    label:"年龄"
                }   
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

            cellColor:[{
                cell:9,  //cell代表你要给第几列添加类名或者事件
                value:"接收科室",  //这是要改变的列的表头名称
                oclass:"ooRed"  //这是给要改变列添加的类名，添加类名之后，自己写样式，不改样式只添加事件可传空
            },{
                cell:10,
                value:"参与专家",
                oclass:"ooGreen"
            }],

             <tableList :tableData="adminTableData" :columns="columns" :tableBtn="tableBtn" :cellColor="cellColor" @cellClickData="cellClickData"> </tableList>

             
注意：列表标题的prop对应的字符串要和列表数据列表的字段相对应
      列表按钮里面的method是每个按钮对应触发的事件
     列表按钮的oclass是给每个按钮赋值的class名字
     要改变某一竖列表格的样式，按照tableDataList里面的oclass设定类名传过来

  */
</style>