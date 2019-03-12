<template>
	<div class="education-doc-label" v-loading="inData.loading">
        <div class="education-doc-label-top">
            <div class="education-doc-label-imgdiv">
                <!-- <img src="https://demo.chuntaoyisheng.com:10002/m/v1/api/hdfs/fs/download/5ad1576a993985e2d93b3e04735110f7" alt=""> -->
                <img :src="inData.imgUrl || '../../../static/assets/img/a-6.png'" :alt="inData.teacherName">
            </div>
            <div class="education-doc-label-userinfo">
                <p class="education-doc-label-username">{{inData.teacherName || '缺失'}}</p>
                <p class="education-doc-label-course-num">{{inData.courseNumber || '缺失'}}</p>
            </div>
        </div>
        <div class="education-doc-label-bottom">
            <div class="education-doc-label-detailed">
                <div>
                    <p class="name">授课时间</p>
                    <p class="value">{{inData.teachStartTime || '缺失'}}</p>
                </div>
                <div>
                    <p class="name">报名人数</p>
                    <p class="value">{{inData.num || '缺失'}}</p>
                </div>
                <div>
                    <p class="name">状态</p>
                    <p class="value">{{inData.classState || '缺失'}}</p>
                </div>
                <div>
                    <el-button size="mini" :type="btnStatus[inData.action].type" @click="getSelect" v-if="inData.action !== 'NULL'">{{btnStatus[inData.action].label}}</el-button>
                </div>
            </div>
        </div>
	</div>
</template>

<script>
	export default {
        props:[
            "inData"
        ],
		computed:{
        },
        watch:{
        },
		components:{
		},
		data () {
			return {
                btnStatus:{
                    TOSIGNUP:{//报名
                        type:'primary',
                        label:'报名'
                    },
                    TOLEARN:{//进入学习
                        type:'danger',
                        label:'进入学习'
                    },
                    TOTEACH:{//进入教学
                        type:'warning',
                        label:'进入教学'
                    },
                }
            }
		},
		methods:{
            /**
             *  按钮被点击
             */
            getSelect(){
                this.$emit("reback",this.inData);
            }
		},
		async created(){
            
		}
	}
</script>

<style scoped>
	.education-doc-label{
        width: 486px;
        height: 169px;
        background: #FFFFFF;
        border: 1px solid #E1E8EE;
        border-radius: 4px;
        padding-left: 20px;
        padding-right: 20px;
        padding-top: 20px;
    }
    .education-doc-label-top{
        display: flex;
        padding-bottom: 23px;
        border-bottom: 1px solid #E4E8EE;
    }
    .education-doc-label-imgdiv>img{
        display: block;
        width: 53px;
        height: 53px;
        border-radius: 50%;
    }
    .education-doc-label-userinfo{
        padding-left: 20px;
    }
    .education-doc-label-username{
        font-family: PingFangSC-Semibold;
        font-size: 15px;
        color: #002257;
        letter-spacing: 0.1px;
    }
    .education-doc-label-course-num{
        font-family: PingFangSC-Regular;
        font-size: 13px;
        color: #97A3B4;
        line-height: 22px;
    }
    .education-doc-label-detailed{
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        /* grid-column-gap: 0.2rem; */
        justify-items: center;
        align-items:center;
        padding-top: 18px;
    }
    .name{
        font-family: PingFangSC-Semibold;
        font-size: 13px;
        color: #97A3B4;
        line-height: 22px;
    }
    .value{
        font-family: OpenSans-Semibold;
        font-size: 13px;
        color: #002257;
        line-height: 22px;
    }
</style>