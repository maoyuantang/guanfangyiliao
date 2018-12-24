<template>
	<div class="normal-tab">
		<div class="tab-item" v-for="(item,index) in inData.list" :key="index" @click="reBackFn(index)" :class="index===inData.i?'selected-item-css':''">
			<span class="item-en">{{item.en}}</span>
			<span class="item-zh">{{item.zh}}</span>
		</div>
	</div>
</template>

<script>
	export default {
		data () {
			return {
				
			}
		},
		methods:{
			reBackFn(index){
				this.inData.i = index
				this.$emit('reBack',this.inData)
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
	.normal-tab{
		clear: both;
    }
	.tab-item{
		width: 2.45rem;
		height: 0.84rem;
		background-color: var(--whiteColor);
		box-shadow: 0 0.06rem 36rem 0 rgba(0,62,100,0.04);
		border-radius: 0.04rem;
		float: left;
		border: 1px solid var(--color5);
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding-left: 0.2rem;
		margin-right: 0.24rem;
		cursor: pointer;
	}
	.item-en{
		font-family: var(--fontFamily2);
		font-size: var(--fontSize1);
		color: var(--color3);
	}
	.item-zh{
		font-family:var(--fontFamily3);
		font-size: var(--fontSize4);
		color: var(--color4);
	}
	.selected-item-css{
		background: var(--bgColor3);
	}
	.selected-item-css>span{
		color: var(--whiteColor);
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
