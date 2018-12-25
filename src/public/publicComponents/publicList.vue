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
                    <el-button v-for="(text,index) in tableBtn" type="text" size="small">
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
        tableData: Array,
        columns: Array,
        tableBtn: Array
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
<!-- 
	使用先知：
		-该组件是一个类似选项卡的组件，因为用的较多抽象成一个公共组件
		-传入参数为一个对象
		-传参结构(已经处理过，可以直接v-model绑定)：{
			i:0,//选中的是第几项，类型为int(注意：从0开始计数)
			list:[//选项列表，类型Array
				{
					en:'STATISTICS',//选项英文，类型 string
					zh:'统计'//选项中文，类型string
				},
				{
					en:'STATISTICS',
					zh:'统计'
				},
			]
		}
		-点击时返回用reBack接收
		-返回结构：{
			i:0,//选中的是第几项，类型为int
			list:[//选项列表，类型Array
				{
					en:'STATISTICS',//选项英文，类型 string
					zh:'统计'//选项中文，类型string
				},
				{
					en:'STATISTICS',
					zh:'统计'
				},
			]
		}
		-实例：
		父组件 :
		<template>
			<div class="father">
				<normalTab v-model="setData" @reBack="getData"></normalTab>
			</div>
		</template>
		<script>
			export default {
				data(){
					return{
						setData:{
							i:1,
							list:[
								{
									en:'STATISTICS',//选项英文，类型 string
									zh:'统计'//选项中文，类型string
								},
								{
									en:'STATISTICS',
									zh:'统计'
								},
								{
									en:'STATISTICS',//选项英文，类型 string
									zh:'统计'//选项中文，类型string
								},
								{
									en:'STATISTICS',
									zh:'统计'
								},
							]
						}
					}
				},
				methods:{
					getData(res){
						console.log(`当前点击的是第${res.i}个选项`);
					}
				}
			}
		</script>
 -->
