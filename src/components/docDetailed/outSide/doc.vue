<!-- 上传档案 -->
<template>
	<div class="doc">
        <div class="doc-content">
            <Timeline>
                <TimelineItem v-for="(item,index) in listData" :key="index">
                    <p class="visiting-hospital">{{item.hospital}}</p>
                    <p class="visiting-department">
                        <span class="visiting-department-on">on</span>
                        <span class="visiting-department-name">{{item.dept}}  |  {{item.describe}}</span>
                    </p>
                    <div class="visiting-content">
                        <img :src="value.imgSrc || ''" alt="" srcset="" v-for="(value,key) in item.imgs" :key="key">
                        <!-- <img src="../../../../static/assets/img/ME.png" alt="" srcset="" v-for="(value,key) in item.imgs" :key="key"> -->
                    </div>
                </TimelineItem>
            </Timeline>
        </div>
       <div class="doc-page">
           <el-pagination
            background
            layout="prev, pager, next"
            :page-size="page.size"               
            :current-page="page.current"
            :total="page.total"
            v-if="page.total!=0"
            @current-change="ChangePage"
			></el-pagination>
       </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    import {getUserUpDocList} from '../../../api/apiAll.js'
    import apiBaseURL from "../../../enums/apiBaseURL.js"
	export default {
        props: ['inData'],
		components:{
			
		},
		watch:{
			
		},
		computed:{
			...mapState({
				userInfo:state => state.user.userInfo,
                userSelfInfo:state => state.user.userSelfInfo,   
                global: state => state.global 
			})
        },
		data () {
			return {
                page:{
                    size:2,
                    current:1,
                    total:0
                },
                listData:[]
            }
		},
		
		methods:{
            /**
             * 分页
             */
            ChangePage(num){
                this.page.current = num;
                this.getUserUpDocList();
            },
            /**
             * 获取 数据
             */
            async getUserUpDocList(){
                const res = await getUserUpDocList({
                    token:this.userInfo.token,
                    userId:this.inData.userId,
                    memberId:this.inData.id,
                    pageNum:this.page.current,
                    pageSize:this.page.size
                });
                console.log(res);
                if(res.data && res.data.errCode === 0){
                    this.listData = res.data.body.data2.list.map(item=>{
                        item.imgs = item.imgs.map(ele=>{
                            ele.imgSrc = ele.imgId?`${apiBaseURL.imgBaseUrl}/m/v1/api/hdfs/fs/download/${ele.imgId}`:ele.imgId;
                            return ele;
                        })
                        return item;
                    });
                    this.page.total = res.data.body.total
				}else{
					this.$notify({
						title: '用户上传档案列表获取失败',
						message: res.data.errMsg,  
						type: 'error'
					});
				}
            },

		},
		async created(){
            this.getUserUpDocList();
		}
	}
</script>

<style scoped>
    .doc{
        
    }
    .doc-content{
        padding-left: .27rem;
        padding-top: .36rem;
    }
    .doc-page{
        text-align: center;
    }
    .visiting-hospital{
        color: var(--color18);
        line-height: 0.22rem;
    }
	.visiting-department-on{
        font-family: var(--fontFamily4);
        font-size: var(--fontSize1);
        color: var(--color19);
        line-height: 0.22rem;
    }
    .visiting-department-name{
        font-size: var(--fontSize1);
        color: var(--borderColor5);
    }
    .visiting-content{
        height: 1.6rem;
        background: #F3F6FA;
        border-radius: 4px;
        display: flex;
        padding-left: .48rem;
        align-items: center;
    }
    .visiting-content>img{
        margin-right: .15rem;
        width: 1.25rem;
        height: 1.38rem;
    }
</style>