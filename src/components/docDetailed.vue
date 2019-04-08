<template>
    <div class="doc-detailed">
        <div class="doc-detailed-">
            <el-button type="primary" @click="reBack">返回</el-button>
        </div>
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
                    <div class="doc-detailed-nav-select">
                        <el-select v-model="testData.select" clearable placeholder="请选择">
                            <el-option
                            v-for="(item,index) in testData.list"
                            :key="index"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                </div>
            </div>
            <div :is="viewCurrent" :inData="topTag.list[topTag.index]"></div>
          </div>
      </div>
    </div>
</template>

<script>
// import medicalRecord from './docDetailed/medicalRecord.vue'
// import visiting from './docDetailed/visiting.vue'
// import doc from './docDetailed/doc.vue'
import record from './docDetailed/record.vue'
import inSide from './docDetailed/inSide.vue'
import outSide from './docDetailed/outSide.vue'
import { mapState } from "vuex";
import { queryListByUserId} from '../api/apiAll.js'//api
export default {
    name: "docDetailed",
    components: {
        // medicalRecord,
        // visiting,
        // doc,
        record,
        inSide,
        outSide
    },
    
    data() {
        return {
            topTag:{//顶部tag数据   
                index:0,//选中
                list:[]//列表
            },
            nav:{//顶部nav数据
                index:0,//选中
                list:[
                    {laber:'电子病历',page:'record'},
                    {laber:'院内档案',page:'inSide'},
                    {laber:'院外档案',page:'outSide'},
                ]//列表
            },
            //////////////////////////////////
            testData:{
                select:"",  
                list:[
                    {label:'test1',value:'1'},
                    {label:'test2',value:'2'},
                ]
            }
        };
    },
    computed: {
        ...mapState({
            userState: state => state.user.userInfo,
            userSelfInfo:state => state.user.userSelfInfo, 
            global: state => state.global
        }),
        viewCurrent(){
            return this.nav.list[this.nav.index].page
        },
    },
    
    methods: {
        /**
         * 返回
         */
        reBack(){
            this.$router.go(-1)
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
            console.log(index)
        },
    },
    created() {
        this.getUsersList();
    },
    watch: {},
    /**
     * 由于 这个页面 后来修改一些逻辑 
     * 把这个页面单独提出来，加在路由上
     * 为了刷新还在这个页面
     * 存入缓存
     * 但是由于是后加入的  没有code
     * 将前一个页面的code当做这个页面的code
     */
    beforeRouteEnter(to,from,next){
        console.log('enter')
        let getSession = sessionStorage.getItem('page');
        try{
            getSession = JSON.parse(getSession)
        }catch(e){
            console.log(e);
        }
        sessionStorage.setItem('page',JSON.stringify({//存缓存
            name:"查看档案",
            select:true,
            path:"/docDetailed",
            code:getSession?getSession.code:0
        }));
        next()
    },
};
</script>

<style scoped>
.doc-detailed{}
.doc-detailed-tag{
    padding-bottom: 0.45rem;
}
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
.doc-detailed-nav{
    margin-bottom: 0.65rem;
}
.doc-detailed-nav-content{
    display:flex;
    justify-content: center;
    align-items: center;
    position: relative;
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
    /* width:80%;
    margin:0 auto; */
}
.doc-detailed-nav-select{
    position: absolute;
    right: 0;
}
.new-content{
    display: flex;
}
.new-content-nav{
    width: 3.4rem;
    min-height: 100%;
    border: 1px solid #E5E7E9;
    padding-left: 6px;
    padding-right: 22px;
    margin-right: .3rem;
}
.new-content-userinfo{
    padding-left: .15rem;
}
.new-content-headimg{
    padding-top: .18rem;
}
.new-content-headimg>img{
    display: block;
    width: 0.98rem;
    height: 0.98rem;
    border-radius: 50%;
    margin: 0 auto;
}
.new-content-username{
    font-family: PingFangSC-Regular;
    font-size: 13px;
    color: #97A3B4;
    line-height: 22px;
    text-align: center;
    padding-top: .18rem;
    margin-bottom: 0.43rem;
}
.new-content--msg-item{
    font-family: PingFangSC-Regular;
    font-size: 13px;
    color: #97A3B4;
    line-height: 22px;
    padding-bottom: .18rem;
}
.new-content-content-item{
    border-top: 1px solid;
    padding-bottom: .35rem;
    padding-left: .15rem;
    cursor: pointer;
}
.new-content-content-item:hover{
    background-color: #e3f5ff;
}
.new-content-content-item:nth-child(3n+0){
    border-color: #0064FF;
}
.new-content-content-item:nth-child(3n+1){
    border-color: #00d983;
}
.new-content-content-item:nth-child(3n+2){
    border-color: #FFDB00;
}
.new-content-content-item-title{
    font-family: PingFangSC-Semibold;
    font-size: 13px;
    color: #002257;
    line-height: 22px;
    font-weight: bold;
}
.new-content-content-item-info{
    font-family: PingFangSC-Regular;
    font-size: 13px;
    color: #97A3B4;
    line-height: 22px;
}
.new-content-body{
    border: 1px solid #E5E7E9;
    flex: 1;
    display: flex;
}

.new-content-body-nav{
    width: 1.9rem;
    border-right: 1px solid #E5E7E9;
}
.new-content-body-content{
    /* background-color: grey; */
    flex: 1;
}
.new-content-body-nav-item{
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: 1.5rem;
    border-bottom: 1px solid #E5E7E9;
}
.new-content-body-nav-item:last-child{
    /* border: none; */
}
.new-content-body-nav-item-name{
    font-family: PingFangSC-Semibold;
    font-size: 13px;
    color: #002257;
    line-height: 22px;
}
.new-content-body-nav-item-time{
    font-family: PingFangSC-Regular;
    font-size: 13px;
    color: #97A3B4;
    line-height: 22px;
}
</style>
