<template>
	<div class="medical-treatment-man">
		<div class="medical-treatment-man-top">
            <normalTab v-model="barInfo" @reBack="getBar"></normalTab>
        </div>
        <div class="medical-treatment-man-body">
            <div class="medical-treatment-man-body-nav">
                <div class="medical-treatment-man-body-nav-left">
                    <selftag v-model="departmentList" @reback="getDepartmentSelect"></selftag>
                    <selftag v-model="departmentList" @reback="getDepartmentSelect"></selftag>
                    <selftag v-model="departmentList" @reback="getDepartmentSelect"></selftag>
                </div>
                <div class="medical-treatment-man-body-nav-right">
                    <search></search>
                    <el-button type="primary">新增</el-button>
                </div>
                
            </div>
            <div class="medical-treatment-man-body-content">
                <table class="medical-treatment-man-body-content-table">
                    <thead>
                        <tr>
                            <th>科室</th>
                            <th>类型</th>
                            <th>编号</th>
                            <th>名称</th>
                            <th>分级</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th>111</th>
                            <th>111</th>
                            <th>111</th>
                            <th>111</th>
                            <th>111</th>
                            <th>
                                <el-button type="success" size="mini" plain>编辑</el-button>
                                <el-button type="danger" size="mini" plain>删除</el-button>
                            </th>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
	</div>
</template>

<script>
    import normalTab from './../../public/publicComponents/normalTab.vue'
    import selftag from './../../public/publicComponents/selftag.vue'
    import search from './../../public/publicComponents/search.vue'
	export default {
        components:{
            normalTab,
            selftag,
            search
		},
		data () {
			return {
				/**
				 * bar 数据
				 */
				barInfo:{
					i:0,//当前页面
					list:[
						{
							en:'Classification of diseases',
							zh:'疾病分级分类管理'
						},
						{
							en:'Process & privilege control',
							zh:'流程和权限控制'
                        },
                        {
							en:'statistics',
							zh:'统计'
						},
					]	
                },
                
                /**
				 * 科室标签信息
				 */
				departmentList:{
					more:false,
                    title:'科室',
                    list:[
                        {
                            text:'全部'
                        },
                        {
                            text:'今日'
                        }
                    ]
				},
			}
		},
		methods:{
			/**
			 * bar 切换数据
			 */
			getBar(data){
				console.log(data)
            },
            
            /**
			 * 科室标签 被点击
			 */
			getDepartmentSelect(item){
				console.log(item)
			},
		},
		async created(){

		}
	}
</script>

<style scoped>
	.medical-treatment-man{

    }
    .medical-treatment-man-body-nav{
        display: flex;
    }
    .medical-treatment-man-body-nav-left{
        flex: 1;
    }
    .medical-treatment-man-body-nav-right{
        flex: 1;
    }
    .medical-treatment-man-body-nav-right>button{
        display: inline-block;
    }
    .medical-treatment-man-body-nav-right>div{
        display: inline-block;
    }
    .medical-treatment-man-body-content-table{
        width: 100%;
    }
</style>