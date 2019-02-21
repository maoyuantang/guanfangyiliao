<template>
    <div class="doc-detailed">
        <el-dialog
      title=" "
      :visible.sync="show"
      :fullscreen="true"
      :before-close="handleClose"
    >
      <div class="doc-detailed-alert">
          <div class="doc-detailed-alert-content">
                <div class="doc-detailed-tag">
                <span 
                v-for="(item,index) in topTag.list" 
                :key="index" 
                class="doc-detailed-tag-span" 
                :class="topTag.index === index ? 'doc-detailed-tag-span-select' : null "
                @click="selectTag(index)">
                {{item.name}}
                </span>
            </div>
            <div class="doc-detailed-nav">
                <div class="doc-detailed-nav-content">
                <span 
                v-for="(item,index) in nav.list" 
                :key="index" 
                class="doc-detailed-nav-span" 
                :class="nav.index === index ? 'doc-detailed-nav-span-select' : null "
                @click="selectNav(index)">
                {{item.laber}}
                </span>
                </div>
            </div>
            <div class="doc-detailed-content">
                <div class="doc-detailed-content-medical-record">
                    <div class="doc-detailed-content-medical-record-item">
                        <div class="doc-detailed-content-medical-record-item-left">
                            <img src="../../static/assets/img/上传@2x.png" alt="" srcset="">
                        </div>
                        <div class="doc-detailed-content-medical-record-item-right">
                            <p class="doc-detailed-content-medical-record-item-title">随访计划</p>
                            <p class="doc-detailed-content-medical-record-item-time">2018-12-25 10:00</p>
                            <p class="doc-detailed-content-medical-record-item-text">最后一次自测数据</p>
                        </div>
                    </div>
                    <div class="doc-detailed-content-medical-record-item"></div>
                    <div class="doc-detailed-content-medical-record-item"></div>
                    <div class="doc-detailed-content-medical-record-item"></div>
                    <div class="doc-detailed-content-medical-record-item"></div>
                </div>
            </div>
          </div>
      </div>
    </el-dialog>
    </div>
</template>

<script>
import { mapState } from "vuex";
import { queryListByUserId} from '../api/apiAll.js'//api
export default {
    name: "docDetailed",
    components: {
        
    },
    data() {
        return {
            show:true,//是否显示
            topTag:{//顶部tag数据
                index:0,//选中
                list:[]//列表
            },
            nav:{//顶部nav数据
                index:0,//选中
                list:[
                    {laber:'院内病历'},
                    {laber:'院内就诊'},
                    {laber:'院外档案'},
                ]//列表
            },
        };
    },
    computed: {
        ...mapState({
            userState: state => state.user.userInfo,
            userSelfInfo:state => state.user.userSelfInfo, 
            global: state => state.global
        })
    },
    
    methods: {
        /**
         * 关闭弹窗
         */
        handleClose(done){
            done();
        },

        /**
         * 获取成员列表
         */
        async getUsersList(){
            const res = await queryListByUserId({
                token:this.userState.token,
                userId:this.$route.query.id
            });
            console.log(res);
            if(res.data&&res.data.errCode===0){
                this.topTag.list = res.data.body
            }else{
                this.$notify({
                    title: '失败',
                    message: '成员列表获取失败', 
                    type: 'error'
				});
            }
        },
        /**
         * tag被点击
         */
        selectTag(index){
            this.topTag.index = index;
        },
        /**
         * nav被点击
         */
        selectNav(index){
            this.nav.index = index;
        },
    },
    created() {
        this.getUsersList();
    },
    watch: {}
};
</script>

<style scoped>
.doc-detailed{}
.doc-detailed-tag-span{
    font-family: PingFangSC-Regular;
    color: var(--color6);
    letter-spacing: 0;
    padding-right:0.2rem;
    cursor: pointer;
}
.doc-detailed-tag-span-select{
    color:#FBA800;
}
.doc-detailed-nav-content{
    display:flex;
    justify-content: center;
    align-items: center;
}
.doc-detailed-nav-span{
    display:flex;
    justify-content: center;
    align-items: center;
    width:1.76rem;
    height:0.4rem;
    border-radius: 0.04rem;
    font-family: PingFangSC-Regular;
    color: var(--navigationBgColor);
    cursor: pointer;
}
.doc-detailed-nav-span-select{
    background: var(--navigationBgColor);
    color:white;
}
.doc-detailed-alert-content{
    width:80%;
    margin:0 auto;
}
.doc-detailed-content-medical-record{
    display:grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 10px;
    grid-row-gap: 15px;
}
.doc-detailed-content-medical-record-item{
    height:1.62rem;
    background: #FFFFFF;
    border: 1px solid #E1E8EE;
    border-radius: 4px;
    display:flex;
}
.doc-detailed-content-medical-record-item-left{
    flex:1;
    background:yellow;
    display:flex;
    justify-content: center;
    align-items: center;
}
.doc-detailed-content-medical-record-item-left> img{
    width: 0.76rem;
    height: 0.66rem;
}
.doc-detailed-content-medical-record-item-right{
    /* background:grey; */
    flex:3;
    
}
.doc-detailed-content-medical-record-item-title{
    color: #002257;
    margin-top: 0.28rem;
}
.doc-detailed-content-medical-record-item-time{
    font-family: PingFangSC-Regular;
font-size: 13px;
color: #97A3B4;
line-height: 22px;
}
.doc-detailed-content-medical-record-item-text{

}
</style>
