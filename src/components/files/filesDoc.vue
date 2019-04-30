<template>
  <div class="files-doc">
    <div class="files-doc-top">
      <div class="files-doc-top-left">
        <selftag v-model="findCondition.grouping.data" @reback="groupingSelect"></selftag>
        <selftag v-model="findCondition.fileClassification.data" @reback="fileClassificationSelect"></selftag>
        <selftag v-model="findCondition.source.data" @reback="sourceSelect"></selftag>
        <selftag v-model="findCondition.inHospitalFile.data" @reback="inHospitalFileSelect"></selftag>
      </div>
      <div class="files-doc-top-right">
        <search @searchValue="searchChange"></search>
      </div>
    </div>
    <div class="files-doc-body-out">
      <div class="files-doc-body" ref="filesScroll">
        <table class="files-doc-table">
          <thead class="files-doc--thead">
            <tr>
              <th>姓名</th>
              <th>来源</th>
              <th>手机号</th>
              <th>分组</th>
              <th>提取档案</th>
              <th>推送档案</th>
              <th>院内档案</th>
              <th>院外档案</th>
              <th></th>
            </tr>
          </thead>
          <tbody class="files-doc--tbody">
            <tr v-for="(item,index) in userList" :key="index">
              <th>
                <el-checkbox v-model="item.select">{{item.userName}}</el-checkbox>
              </th>
              <th>{{item.relSource===1?'线下扫码':'在线业务'}}</th>
              <th>{{item.phone}}</th>
              <th>{{item.groupName}}</th>
              <th>{{item.queryNumber}}</th>
              <th>{{item.pushNumber}}</th>
              <th>{{item.recordNumber}}</th>
              <th>{{item.lobbyNumber}}</th>
              <th class="files-doc-spe-th">
                <el-button type="primary" size="mini" plain @click="openAlert(item)">查看档案</el-button>
                <el-dropdown>
                <el-button type="danger" size="mini" plain>录入档案</el-button>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item @click.native="openPregnantWomanDoc(item)">孕妇信息</el-dropdown-item>
                    <el-dropdown-item @click.native="openAlertNor(item)">普通档案</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </th>
            </tr>
          </tbody>
        </table>
        <tableNoMore v-if="userList.length <= 0"></tableNoMore>
      </div>
      <table class="files-doc-table files-doc-table-spe files-doc-table" :class="isEnd?null:'has-border'">
          <thead class="files-doc--thead">
            <tr>
              <th><span class="spe-no-show">''</span></th>
            </tr>
          </thead>
          <tbody class="files-doc--tbody">
            <tr v-for="(item,index) in userList" :key="index">
              <th class="files-doc-spe-th">
                <el-button type="primary" size="mini" plain @click="openAlert(item)">查看档案</el-button>
                <el-dropdown>
                <el-button type="danger" size="mini" plain>录入档案</el-button>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item @click.native="openPregnantWomanDoc(item)">孕妇信息</el-dropdown-item>
                    <el-dropdown-item @click.native="openAlertNor(item)">普通档案</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </th>
            </tr>
          </tbody>
        </table>
    </div>
    <div class="files-doc-footer">
      <div class="files-doc-footer-left">
        <div class="files-doc-footer-all">
          <el-checkbox v-model="bottomOperating.all">全部</el-checkbox>
        </div>
        <div class="files-doc-footer-moveto">
          <el-dropdown>
            <span class="el-dropdown-link">移动到</span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item v-for="(item,index) in bottomOperating.list" :key="index" @click.native="moveToItem(item)">{{item.groupName}}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
      <div class="files-doc-footer-right">
        <el-pagination
          background
          layout="prev, pager, next"
          :page-size="findCondition.page.pageSize"
          @current-change="listSelectPage"
          :current-page="parseInt(findCondition.page.pageNum)"
          v-if="findCondition.page.total!=0"
          :total="findCondition.page.total"
        ></el-pagination>
      </div>
    </div>
    <el-dialog
      title=" "
      :visible.sync="alertData.show"
      :fullscreen="true"
      :before-close="handleClose"
    >
      <div class="files-doc-aler">
        <div class="files-doc-aler-">
          <div class="files-alert-toptag">
            <span
              v-for="(item,index) in alertData.data.topTag.list"
              :key="index"
              class="files-alert-toptag-nor"
              @click="tagClick(item)"
            >{{item.laber}}</span>
          </div>
        </div>
        <div class="files-doc-aler-nav">
          <doctorTab :inData="alertData.data.nav" @reBack="navSelect"></doctorTab>
        </div>
        <div class="files-doc-aler-body">
			<div class="files-doc-aler-body-container">
				<div>
					<div class="files-doc-aler-item">
						<div class="files-doc-aler-item-left"></div>
						<div class="files-doc-aler-item-right">
							<div class="files-doc-aler-item-title">
								<span>住院处方</span>
							</div>
							<div class="files-doc-aler-item-content">
								<span>最近一次处方时间</span>
								<span>此处显示最近一次处方门诊医生的处理意见或者医嘱或者其他 反正是留一段字符 备用</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
      </div>
    </el-dialog>
    <WomanDoc :inData="pregnantWomanDoc" @reback="createPregnantWomanDoc"></WomanDoc>
    <norDocAlert :inData="norDoc" @reback="createNorDoc"></norDocAlert>
  </div>
</template>

<script>
import { mapState } from "vuex";
import selftag from "../../public/publicComponents/selftag.vue";
import search from "../../public/publicComponents/search.vue";
import doctorTab from "../../public/publicComponents/doctorTab.vue";

import norDocAlert from "../../public/publicComponents/norDocAlert.vue";
import WomanDoc from "../../public/publicComponents/WomanDoc.vue";
import tableNoMore from "../../public/publicComponents/tableNoMore.vue";

import { deepCopy } from "../../public/publicJs/deepCopy.js";
import { queryByPage, groupSelects, addGroupMember, queryListByUserId, addOrdinaryArchives, addWomanMessage } from "../../api/apiAll.js";
export default {
  components: {
    selftag,
    search,
    doctorTab,
    norDocAlert,
    WomanDoc,
    tableNoMore
  },
  watch: {
    /**
     * 分组 监听分组变化（异步，所以不能在created的时候直接赋值，也不能用computed，当时有点脑残，在子组件用了双向绑定）
     */
    "$store.state.global.group": {
      //
      handler(n) {
        this.findCondition.grouping.data = deepCopy({
          more: false,
          title: "分组",
          list: this.$store.state.global.group.map(item => {
            item.text = item.name;
            return item;
          })
        });
      }
    },
    /**
     * 档案分类
     */
    "$store.state.global.documentsClassification": {
      handler(n) {
        this.findCondition.fileClassification.data = deepCopy({
          more: false,
          title: "档案分类",
          list: this.$store.state.global.documentsClassification.map(item => {
            item.text = item.name;
            return item;
          })
        });
      }
    },
    /**
     * 来源
     */
    "$store.state.global.userSource": {
      handler(n) {
        this.findCondition.source.data = deepCopy({
          more: false,
          title: "来源",
          list: this.$store.state.global.userSource.map(item => {
            item.text = item.name;
            return item;
          })
        });
      }
    },
    /**
     * 院内档案
     */
    "$store.state.global.hospitalArchives": {
      handler(n) {
        this.findCondition.inHospitalFile.data = deepCopy({
          more: false,
          title: "院内档案",
          list: this.$store.state.global.hospitalArchives.map(item => {
            item.text = item.name;
            return item;
          })
        });
      }
    },
    /**
     *检测全选勾选情况
     */
    'bottomOperating.all':{
      handler(n){
        this.userList.forEach(item=>item.select = n);
      }
    },
  },
  computed: {
    ...mapState({
      userInfo: state => state.user.userInfo,
      userSelfInfo: state => state.user.userSelfInfo,
      global: state => state.global
    })
  },
  data() {
    return {
      isEnd:false,//滚动条是否到底部，新加的功能，固定列
      norDoc:{//新增 普通档案  弹窗数据  
        // id:'1231321',
        show:false,//是否显示
        nameSelectId:'',//选择名字 
        nameList:[],//名字列表  
        sexList:[//性别 
          {label:'女',value:0},
          {label:'男',value:1},
        ],
        sexSelectId:0,
        age:'',//年龄
        addr:'',//地址
        org:'',//机构
        diagnosis:'',//诊断
        deal:'',//处理意见
      },
      pregnantWomanDoc:{//新增 孕妇档案  弹窗数据   
        show:false,
        nameSelectId:'',//选择名字 
        nameList:[],//名字列表  
        husband:'',//丈夫
        phone:'',//电话
        addr:'',//地址
        LastMenstrualPeriod:null,//末次月经
      },
      bottomOperating:{ //下方全选 和 移动到  
        all:false,
        moveTo:null,
        list:[
          // {
          //   userId:'userId',
          //   userName:'userName',
          //   sessionId:'sessionId',
          //   age:'age',
          //   sexName:'sexName',
          //   groupId:'groupId',
          //   groupName:'groupName',
          //   phone:'phone'
          // }
        ]
      },
      findCondition: { 
        //查询条件
        grouping: {
          //分组
          select: {}, //选中
          data: {
            more: false,
            title: "分组",
            list: [{ text: "454545" }]
          }
        },
        fileClassification: {
          //档案分类
          select: {}, //选中
          data: {
            more: false,
            title: "档案分类",
            list: [{ text: "454545" }]
          }
        },
        source: {
          //来源
          select: {}, //选中
          data: {
            more: false,
            title: "来源",
            list: [{ text: "454545" }]
          }
        },
        inHospitalFile: {
          //院内档案
          select: {}, //选中
          data: {
            more: false,
            title: "院内档案",
            list: [{ text: "454545" }]
          }
        },
        searchKey: "", //查询关键字
        page: { 
          //分页相关
          pageNum: 1, //当前页
          pageSize: 10, //每页多少数据
          total: 0 //总共多少条
        }
	  },
	  userList:[],
      alertData: {
        show: false,
        data: {
          topTag: {
            select: {},
            list: [
              { laber: "就诊人1" },
              { laber: "就诊人2" },
              { laber: "就诊人3" },
              { laber: "就诊人4" },
              { laber: "就诊人5" }
            ]
          },
          nav: {
            i: 0,
            list: [{ zh: "院内病历" }, { zh: "院内就诊" }, { zh: "院外档案" }]
          }
        }
      }
    };
  },
  methods: {
    /**
     * 
     */
    listenEleScroll(){
        this.$nextTick(ev=>{
            // this.$refs.familyScroll.scrollLeft = 500;
            // this.$refs.familyScroll.scrollTop
            this.isEnd = this.$refs.filesScroll.scrollLeft < (this.$refs.filesScroll.scrollWidth - this.$refs.filesScroll.offsetWidth);
            this.$refs.filesScroll.onscroll = ev =>{
                // console.log(this.$refs.familyScroll.scrollLeft)
                // console.log(this.$refs.familyScroll.scrollWidth - this.$refs.familyScroll.offsetWidth)
                this.isEnd = this.$refs.filesScroll.scrollLeft < (this.$refs.filesScroll.scrollWidth - this.$refs.filesScroll.offsetWidth);
            }
        })
    },
    /**
     * 打开 孕妇 档案
     */
    async openPregnantWomanDoc(item){
      await this.getQueryListByUserId(item);

      this.pregnantWomanDoc.show = true; 
    },
    /**
     * 新增 孕妇 档案
     */
    async createPregnantWomanDoc(data){
      const postData = {
        memberId:data.nameSelectId,
        memberName:data.nameList.find(value=>{return value.id === data.nameSelectId}).name,
        husband:data.husband,
        phone:data.phone,
        home:data.addr,
        ultimate:data.LastMenstrualPeriod 
      };
      console.log(postData);
      if(!postData.id){
         this.$notify({
            title: '错误',
            message: '家庭成员为必选项',
            type: 'error'
          });
          return;
      }
      if(!postData.ultimate){
        this.$notify({
            title: '错误',
            message: '末次月经为必选项',
            type: 'error'
          });
          return;
      }
      const res = await addWomanMessage(...[
        {token: this.userInfo.token},
        postData
      ]);
      console.log(res);
      if (res.data && res.data.errCode === 0) {
        this.$notify({
            title: '成功',
            message: '新增成功',
            type: 'success'
          });
          this.pregnantWomanDocClose();
      }else{
        this.$notify({
          title: "失败",
          message: "新增失败",
          type: "error"
        });
      }
    },
     /**
     * 打开 新增 孕妇档案 弹窗
     */
    // openPregnantWomanDoc(){
    //   this.pregnantWomanDoc.show = true;
    // },
    /**
     * 关闭 新增 孕妇 档案
     */
    pregnantWomanDocClose(done){
      this.pregnantWomanDoc.show = false;
      this.pregnantWomanDoc.nameSelectId = '';
      this.pregnantWomanDoc.husband = '';
      this.pregnantWomanDoc.phone = '';
      this.pregnantWomanDoc.addr = '';
      this.pregnantWomanDoc.LastMenstrualPeriod = null;
    },
    /**
     * 打开 新增 普通档案 弹窗
     */
    async openAlertNor(item){
      await this.getQueryListByUserId(item);
      this.norDoc.show = true;
    },
    /**
     * 2.新增患者普通档案
     */
    async createNorDoc(data){
      const postData = {
          memberId:data.nameSelectId,
          sex:data.sexSelectId,
          age:data.age,
          address:data.addr,
          diagnosis:data.diagnosis,
          opinion:data.deal
      };
      if(!postData.memberId){
        this.$notify({
          title: "错误",
          message: "成员为必填选项",
          type: "error"
        });
        return;
      }
      if(!postData.sex){
        this.$notify({
          title: "错误",
          message: "性别为必填选项",
          type: "error"
        });
        return;
      }
      const res = await addOrdinaryArchives(...[
        {token: this.userInfo.token},
        postData
      ]);
      console.log(res);
      if (res.data && res.data.errCode === 0) {
          this.$notify({
            title: '成功',
            message: '新增成功',
            type: 'success'
          });
          this.norDocClose();
      }else{
        this.$notify({
          title: "失败",
          message: "新增失败",
          type: "error"
        });
      }
    },
    /**
     * 获取 家庭成员列表
     */
    async getQueryListByUserId(item){
      const res = await queryListByUserId({
        token: this.userInfo.token,
        userId: item.userId
      });
      console.log(res); 
      if (res.data && res.data.errCode === 0) {
        this.norDoc.nameList = deepCopy(res.data.body);
        this.pregnantWomanDoc.nameList = deepCopy(res.data.body);
      }else{
        this.$notify({
          title: "失败",
          message: "家庭成员列表获取失败",
          type: "error"
        });
      }
    },
    /**
     * 移动到
     */
    async moveToItem(item){
      const selectItem = this.userList.filter(element=>element.select);
      Promise.all(
        selectItem.map(element=>{
          return addGroupMember(...[
            {token: this.userInfo.token},
            {
              groupId:item.groupId,
              userId:element.userId
            }
          ])
        })
      )
      .then(resArr=>{
        console.log(resArr);
        for(const i of resArr){
          if(i.data.errCode !== 0){
            this.$notify({
              title: "error",
              message: '移动失败',
              type: "error"
            });
            return;
          }
        }
        this.$notify({
          title: '成功',
          message: '移动成功',
          type: 'success'
        });
      })
      .catch(err=>{
        this.$notify({
          title: "error",
          message: err,
          type: "error"
        });
      })
      
    },
    /**
     * 关闭 新增 普通档案 弹窗
     */
    norDocClose(done){
      this.norDoc.show = false;
      this.norDoc.nameSelectId = '';
      this.norDoc.sexSelectId = 0;
      this.norDoc.age = '';
      this.norDoc.addr = '';
      this.norDoc.org = '';
      this.norDoc.diagnosis = '';
      this.norDoc.deal = '';
      // done();
    },
    /**
     * 获取 用户组列表
     */
    async getGroupSelects(){
      const res = await groupSelects({token: this.userInfo.token});
      console.log(res);
      if (res.data && res.data.errCode === 0) {
        this.bottomOperating.list = res.data.body;
      } else {
        this.$notify({
          title: "失败",
          message: "用户组列表获取失败",
          type: "error"
        });
      }
    },
    /**
     * 选择分页
     */
    listSelectPage(data){
      this.findCondition.page.pageNum = data;
      this.getQueryByPage();
    },
    /**
     * 获取 分组
     */
    getgrouping(){
      this.findCondition.grouping.data = deepCopy({
          more: false,
          title: "分组",
          list: this.$store.state.global.group.map(item => {
            item.text = item.name;
            return item;
          })
        });
    },
    /**
     * 获取 档案分类
    */
   getDocumentsClassification(){ 
     this.findCondition.fileClassification.data = deepCopy({
          more: false,
          title: "档案分类",
          list: this.$store.state.global.documentsClassification.map(item => {
            item.text = item.name;
            return item;
          })
        });
   },
   /**
    * 获取 来源
    */
   getSource(){
     this.findCondition.source.data = deepCopy({
          more: false,
          title: "来源",
          list: this.$store.state.global.userSource.map(item => {
            item.text = item.name;
            return item;
          })
        });
   },
   /**
    * 获取 院内档案
    * 
    */
   getHospitalArchives(){
     this.findCondition.inHospitalFile.data = deepCopy({
          more: false,
          title: "院内档案",
          list: this.$store.state.global.hospitalArchives.map(item => {
            item.text = item.name;
            return item;
          })
        });
   }, 
	  /**
	   * nav 被点击
	   */
	  navSelect(data){
		  console.log(data)
	  },
    /**
     * 弹窗顶部 tag 被点击
     */
    tagClick(item) {
	  this.alertData.data.topTag.select = item;
	  console.log(item)
	  return;
	  
    },
    /**
     * 关闭弹窗
     */
    handleClose(done) {
      done();
    },
    /**
     * 打开弹窗
     */
    openAlert(data) {
      console.log(data);
      this.$router.push({
        path: "/docDetailed",
        query:{
          id:data.userId
        }
      })
    },
    /**
     * 分组 被选中
     */
    groupingSelect(data) {
      console.log(data);
      this.findCondition.grouping.select = data.index;
      this.getQueryByPage();
    },

    /**
     * 档案分类 被选中
     */
    fileClassificationSelect(data) {
      console.log(data);
      this.findCondition.fileClassification.select = data.index;
      this.getQueryByPage();
    },

    /**
     * 来源 被选中
     */
    sourceSelect(data) {
      console.log(data);
      this.findCondition.source.select = data.index;
      this.getQueryByPage();
    },

    /**
     * 院内档案 被选中
     */
    inHospitalFileSelect(data) {
      console.log(data);
      this.findCondition.inHospitalFile.select = data.index;
      this.getQueryByPage();
    },

    /**
     * 用户通过关键字搜索
     */
    searchChange(data) {
      console.log(data);
      this.findCondition.searchKey = data;
      this.getQueryByPage();
    },

    /**
     * 获取 患者分页列表
     */
    async getQueryByPage() {
      const query = {
        token: this.userInfo.token,
        groupId: this.findCondition.grouping.select.id || '',
        relSource: this.findCondition.source.select.id || '',
        isRecord: this.findCondition.inHospitalFile.select.id === "true",
        searchKey: this.findCondition.searchKey,
        pageNum: this.findCondition.page.pageNum,
        pageSize: this.findCondition.page.pageSize
      };
      // for (const i in query) {
      //   !query[i] ? delete query[i] : null;
      // }
      console.log(query);
      // return;
      const res = await queryByPage(query);
      console.log(res);
      if (res.data && res.data.errCode === 0) {
		  this.userList = res.data.body.data2.list.map(item=>{
			  item.select = false;
			  return item;
      });
      this.findCondition.page.total = res.data.body.data2.total;
      this.$nextTick(ev=>{//加个新功能 固定表格最后一列 wtf
          const allSpeCom = document.getElementsByClassName('files-doc-spe-th');
          // const tableAbs = document.getElementsByClassName('table-abs');
          allSpeCom[allSpeCom.length-1].style.width = allSpeCom[0].offsetWidth + 'px'
      });
      } else {
        this.$notify({
          title: "失败",
          message: "患者分页列表获取失败",
          type: "error"
        });
      }
    }
  },
  async created() {
    // console.log(deepCopy);
    this.getQueryByPage();
    this.getgrouping();
    this.getDocumentsClassification();
    this.getSource();
    this.getHospitalArchives();
    this.getGroupSelects();
    this.listenEleScroll();
    // this.getQueryListByUserId();
  }
};
</script>

<style lang="scss">
.files-doc {
}
.files-doc-top {
  display: flex;
}
.files-doc-top > div {
  flex: 1;
}
.files-doc-table {
  width: 100%; 
  min-width: 13rem;
}
.files-doc-table th {
  border-bottom: 1px solid var(--color5);
  padding-top: 0.12rem;
  padding-bottom: 0.1rem;
}
.files-doc--thead th {
  /* text-align: center; */
  font-family: PingFangSC-Semibold;
  color: #5E6875;
  letter-spacing: 0;
}
.files-doc-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  bottom: 0.3rem;
  background: #f4f8fa;
  border: 0 solid #bcbcbc;
  /* width: 13.6rem; */
  width: calc((100% - 2.8rem) * 0.8);
  padding-left: 0.2rem;
}
.files-doc-footer > div {
  flex: 1;
}
.files-doc-footer-left {
  display: flex;
  align-items: center;
}
.files-doc-footer-all > .el-checkbox {
  margin: 0;
}
.files-doc-footer-left > div {
  background: #c1d9f3;
  padding-left: 0.1rem;
  padding-right: 0.1rem;
}
.files-doc-footer-moveto {
  margin-left: 0.2rem;
}
.el-dropdown-link {
}
.files-alert-toptag-nor {
  font-family: var(--fontFamily3);
  color: var(--color6);
  letter-spacing: 0;
  padding-right: 0.2rem;
  cursor: pointer;
}
.files-alert-toptag-select {
  color: #fba800;
}
.files-doc-aler-item{
	width:6.7rem;
	height: 1.62rem;
	background: #FFFFFF;
	border: 1px solid #E1E8EE;
	border-radius: 4px;
	display: flex;
}
.files-doc-aler-item-left{
	flex: 1;
	background-color: red;
}
.files-doc-aler-item-right{
	flex: 4;
	
}
.files-doc-aler-item-title{
color: var(--color18);
line-height: 0.22rem;
}
.doc-item{
  margin-bottom: 0.2rem;
}
.doc-item-content{
  display: flex;
  align-items: center;
}
.doc-item-content>div{
  padding-left: 0.1rem;
  padding-right: 0.1rem;
  display: flex;
  align-items: center;
}
.doc-item-content>.el-button{
  margin: 0 auto;
}
.doc-must-input{
  font-size: var(--fontSize1);
  color: red;
}
.files-doc--tbody th{
  font-weight: 100;
  font-family: PingFangSC-Regular;
  font-size: 12px;
  color: #5E6875;
  letter-spacing: 0;
}
.files-doc--tbody th .el-checkbox__label{
  font-weight: 100;
  font-family: PingFangSC-Regular;
  font-size: 12px;
  color: #5E6875;
  letter-spacing: 0;
}
.files-doc-body{
  padding-top: .2rem;
  overflow-x: auto;
}
.files-doc-body-out{
  position: relative;
}
.files-doc-table-spe{
  width:auto;
  border-left: 1px solid #E5EDF3;
  box-sizing: border-box;
  position: absolute;
  right: 0;
  top: 0;
  // border: 1px solid red;
  min-width: auto;
  margin-top: 20px;
  background: white;
  thead{
    tr{
      th{
            font-family: PingFangSC-Semibold;
            color: #5E6875;
            letter-spacing: 0;
            border-bottom: 1px solid var(--color5);
            padding-top: 0.12rem;
            padding-bottom: 0.1rem;
      }
    }
  }
  tbody{
    tr{
      th{
        font-weight: 100;
        font-family: PingFangSC-Regular;
        font-size: 12px;
        color: #5E6875;
        letter-spacing: 0;
        border-bottom: 1px solid var(--color5);
        padding-top: 0.12rem;
        padding-bottom: 0.14rem;
      }
    }
  }
}
.spe-no-show{
  visibility: hidden;
}
.has-border{
    // border-left: 1px solid #E5EDF3;
    // box-sizing: border-box;
    display: none;
}
</style>