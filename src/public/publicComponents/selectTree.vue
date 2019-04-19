<template>
  <div class="select-tree" @click.stop>
      <!-- {{select.map(item=>item.id)}} -->
      <!-- {{checked}} -->
     <div class="inner">
        <el-input
            placeholder="本账号范围内可多选"
            suffix-icon="el-icon-arrow-down"
            readonly="readonly"
            size="mini"
            @click.native="isShow">
        </el-input>
        <div class="list">
            <div class="list-inner" :class="show?'list-inner-show':'list-inner-hiddle'">
                <el-tree v-show="show"
                    :data="inData"
                    show-checkbox
                    node-key="id"
                    :default-checked-keys="checked"
                    :check-change="test"
                    ref="tree"
                    @check="selectItem">
                </el-tree>
            </div>
        </div>
     </div>
  </div>
</template>

<script>
export default {
  watch:{
  },
  data() {
    return {
        checked:[],
        show:false
    };
  },
  methods:{
    test(){},
    isShow(){
        this.show = !this.show
    },
    selectItem(){
        // console.log(this.$refs.tree.getCheckedKeys())
        // console.log(this.$refs.tree.getCheckedNodes(false,false))
        this.$emit("reback",this.$refs.tree.getCheckedNodes(false,false));
    },
    unShow(){
        this.show = false;
    },
    documentClick(){
        window.addEventListener('click',this.unShow,false)
    },
    clearListen(){
        window.removeEventListener('click',this.unShow,false)
    }
  },
  props:[
    'inData',
    'select'
  ],
  created() {
    this.documentClick();
    // console.log(this.inData)
    // console.log(this.select)
    let arr = [];
    this.select.forEach(item => {
        if (item.id) {
            arr.push(item.id);
        }
    });
    this.checked = arr;
  },
  beforeDestroy(){
    this.clearListen();
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
    z-index: 2;
}
.list-inner{
    position: relative;
    transition: 1s;
    /* overflow: hidden; */
    border-radius: 4px;
    border: 1px solid #E5EDF3;
    box-shadow: 0 6px 36px 0 
}
.list-inner-show{
    opacity: 1;
    height: auto;
}
.list-inner-hiddle{
    opacity: 0;
    height: 0;
}
.list-inner-show::before{
    content: '';
    border-top: solid transparent 10px;
    border-bottom: white 10px solid;
    border-left: transparent 10px solid;
    border-right: transparent 10px solid;
    position: absolute;
    top: -20px;
    left: 20px;
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