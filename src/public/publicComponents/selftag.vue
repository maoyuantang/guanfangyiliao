<template>
  <div class="self-tag">
      <!-- <p>{{inData}}</p> -->
    <span class="el-tag tag-title">{{inData.title||''}}:</span>
      <!-- <span v-for="(item,index) in inData.list" :key="index" @click="reBackFn(index)" style="margin-left:20px">{{item.text}}</span>  -->
    <el-tag :type="index===0?'warning':''" 
        :class="[{'warning':item.warning},{'all':selectIndex===index}]"
        v-for="(item,index) in more?inData.list.slice(0,4):inData.list" 
        :key="index" 
        @click.native.prevent="reBackFn(item,index)">
            {{item.text||''}}
    </el-tag>
    <!-- <el-tag @click.native="reBackFn(-1)" v-if="inData.more">更多…</el-tag> -->
    <el-tag @click.native="showMore" v-if="more">更多…</el-tag>
  </div>
</template>

<script>
export default {
  data() {
    return {
        selectIndex:0,
        more:false
    };
  },
  watch:{
    'inData.list':{
      handler(n){
        if(n.length>5){
          this.more = true;
        }
      }
    }
  },
  methods:{
    reBackFn(item,index) {
        this.selectIndex = index;
        console.log(this.selectIndex)
        this.inData.index=item;
        this.$emit("reback",Object.assign({},this.inData));
        // :class="index===0?'all':''" 
        // :class="item.warning?'warning':''"
    },
    showMore(){
      console.log('enter')
      this.more = false;
    },
    isMore(){
      if(this.inData.list.length>5){
          this.more = true;
        }
    }
  },
//   props:[
//       "inData"
//   ],
  props: {
    inData: Object
  },
  model: {
    prop: ["inData"],
    event: "reback"
  },
   created() {
     this.isMore()
  }
};
</script>

<style scoped>
.self-tag {
}
.self-tag > .tag-title {
  font-family: PingFangSC-Semibold;
  font-size: 14px;
  color: #646464 !important;
  font-weight: bold;
  text-align: justify;
  /* width: 1rem; */
  /* width:.8rem;
  display: inline-block; */
}
.self-tag > .tag-title::after{
  /* content: "";  */
  display: inline-block; 
  padding-left: 100%;
}
/* .self-tag > .tag-title::after{
  content: " "; 
  display: inline-block; 
  padding-left: 100%;
} */
.self-tag > .all {
  color: #fba800 !important;
}
.self-tag > .el-tag {
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 14px;
  font-family: PingFangSC-Regular;
  color: #0067ff;
  min-width: .7rem;
}
.self-tag .warning{
    color:red;/*!important*/
}
/* .tag-title{
  width:.8rem;
}
.self-tag .el-tag{
  width: .7rem;
} */
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