<template>
  <div class="select-tree">
     <div class="inner">
        <el-input
            placeholder="请选择日期"
            suffix-icon="el-icon-arrow-down"
            readonly="readonly"
            size="mini"
            @click.native="isShow">
        </el-input>
        <div class="list">
            <el-tree v-show="show"
                :data="inData"
                show-checkbox
                node-key="id"
                ref="tree"
                check-strictly
                default-expand-all
                @check="selectItem"
                >
            </el-tree>
        </div>
     </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
        show:false
    };
  },
  methods:{
    reBackFn(index) {
        // this.$emit("reback",this.$refs.tree.getCheckedKeys());
    },
    isShow(){
        this.show = !this.show
        console.log(6666)
    },
    selectItem(){
        // const idArr = this.$refs.tree.getCheckedKeys();
        // const newArr = this.setValue(this.inData,this.$refs.tree.getCheckedKeys());
        this.$emit("reback",this.setValue(this.inData,this.$refs.tree.getCheckedKeys()));
    },
    setValue(arr,idArr){
        for(let i in arr){
            for(let j in idArr){
                if(idArr[j] == arr[i].id){
                    arr[i].select = true;
                }
            }
            if(arr[i].children.length !== 0){
                this.setValue(arr[i].children,idArr)
            }
        }
        return arr
    }
  },
  props: {
    inData: Array
  },
  model: {
    prop: ["inData"],
    event: "reback"
  },
   created() {
  }
};
</script>

<style scoped>
.select-tree{
    flex: 1;
}
.inner{
    position: relative;
    background-color: transparent;
    /* margin-top: 10px; */
}
.list{
    position: absolute;
    width: 100%;
    top: 40px;
    z-index: 1;
}
</style>
<!--
    使用先知：
        -该组件是一个标签组件
        -传入参数为一个对象
        -传参结构(已经处理过，可以直接v-model绑定)：{
            more:true,//是否有更多选项，true表示有，false表示没有，布尔类型
            title:'测试456465',//标签标题，字符串类型
            list:[//标签内容，数组类型
                {
                    text:'all'//具体标签的文字内容
                },
                {
                    text:'1st'
                },
                {
                    text:'2st'
                },
                {
                    text:'3st'
                },
                {
                    text:'4st'
                },
            ]
        }
        -点击时返回用reBack接收
        -返回结构：{
            index:1//index是个数字，表示被点击的是第几个元素
        }
        -实例：
		父组件 :
        <template>
			<div class="father">
			<selftag @reBack="gitIndex" v-model="test"></selftag>
			</div>
		</template>
		<script>
			import selftag from '../xxx/selftag.vue'//第一步：引入
			export default {
				data(){
					return{
						test:{
                            more:true,
                            title:'测试456465',
                            list:[
                                {
                                    text:'all'
                                },
                                {
                                    text:'1st'
                                },
                                {
                                    text:'2st'
                                },
                                {
                                    text:'3st'
                                },
                                {
                                    text:'4st'
                                },
                            ]
                        },
					}
				},
				components:{
					selftag//注册组件
				},
				methods:{
					gitIndex(index){
                        console.log(index)
                    },
				}
			}
		</script>
-->