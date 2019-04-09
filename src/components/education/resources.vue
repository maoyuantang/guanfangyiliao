<template>
	<div class="resources">
        <!-- <div class="resources-top">
            <div class="resources-top-left">
                <tag :inData="queryConditions.department" @reback="getDepartmentSelect"></tag>
                <tag :inData="queryConditions.department" @reback="getDepartmentSelect"></tag>
                <tag :inData="queryConditions.department" @reback="getDepartmentSelect"></tag>
            </div>
            <div class="resources-top-right">
                {{global.documentsClassification}}
            </div>
        </div> -->
		
	</div>
</template>

<script>
    import { mapState } from "vuex"
    import tag from '../../public/publicComponents/tag.vue'
	export default {
		watch:{
            'global.departmentList':{
                handler(n){
                    this.setDepartmentData()
                }
            }
		},
		data () {
			return {
				queryConditions:{//查询条件  
                    department:{//科室
                        title:'科室',//标题
                        select:0,//当前选中项
                        list:
                        [
                            // {
                            //     label:'全部',
                            //     value:''
                            // }
                        ],
                        more:false
                    },
                    classification:{//分类
                        title:'分类',
                        select:0,
                        list:[],
                        more:false
                    },
                    grouping:{//分组

                    },

                },
			}
		},
		computed:{
            ...mapState({
                userState: state => state.user.userInfo,
                userSelfInfo: state => state.user.userSelfInfo,
                global: state => state.global
            }),
		},
		methods:{
            /**
             * 获取科室选取情况
             */
            getDepartmentSelect(data){
                // this.department.select = data.index;
                // this.department = Object.assign({},this.department)
                // console.log(this.department)
                this.queryConditions.department.select = data.index;
            },
            /**
             * 获取科室列表
             */
            setDepartmentData(){
                this.queryConditions.department.list = this.global.departmentList.map(item=>{
                    item.label = item.deptName;
                    item.value = item.value;
                    return item;
                })
                
            },
		},
		components:{
            tag
		},
		async created(){
            this.setDepartmentData();
		}
	}
</script>

<style scoped>
	.resources{
		
	}
	
	
</style>