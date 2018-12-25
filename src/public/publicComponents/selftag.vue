<template>
	<div class="self-tag">
        <span class="el-tag tag-title">{{inData.title}}:</span>
        <el-tag :type="index===0?'warning':''" :class="index===0?'all':''" v-for="(item,index) in inData.list" :key="index" @click.native="reBackFn(index)">{{item.text}}</el-tag>
        <el-tag @click.native="reBackFn(-1)" v-if="inData.more">更多…</el-tag>
	</div>
</template>

<script>
	export default {
		data () {
			return {
				// test:{
                //     more:true,
                //     title:'测试456465',
                //     list:[
                //         {
                //             text:'all'
                //         },
                //         {
                //             text:'1st'
                //         },
                //         {
                //             text:'2st'
                //         },
                //         {
                //             text:'3st'
                //         },
                //         {
                //             text:'4st'
                //         },
                //     ]
                // }
			}
		},
		methods:{
			reBackFn(index){
				// this.inData.i = index
                // this.$emit('reBack',this.inData)
                this.$emit('reBack',{index:index})
			}
		},
		props: {
			inData:Object
		},
		model:{
			prop:['inData'],
			event:'reBack'
		},
		async created(){
		}
	}
</script>

<style scoped>
	.self-tag{
    }
    .self-tag>.tag-title{
        font-family: PingFangSC-Semibold;
        font-size: 14px;
        color: #646464 !important;
        font-weight: bold;
    }
    .self-tag>.all{
        color: #FBA800 !important;
    }
    .self-tag > .el-tag{
        background-color:transparent;
        border: none;
        cursor: pointer;
        font-size: 14px;
        font-family: PingFangSC-Regular;
        color: #0067FF;
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