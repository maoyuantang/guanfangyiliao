<template>
  <div class="files-doc">
	  {{userSelfInfo.userId}}
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
    <div class="files-doc-body">
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
        <tbody>
          <tr v-for="(item,index) in userList" :key="index">
            <th>
              <el-checkbox v-model="item.select">{{item.userName}}</el-checkbox>
            </th>
            <th>{{item.relSource}}</th>
            <th>{{item.phone}}</th>
            <th>{{item.groupName}}</th>
            <th>{{item.queryNumber}}</th>
            <th>{{item.pushNumber}}</th>
            <th>{{item.recordNumber}}</th>
            <th>{{item.lobbyNumber}}</th>
            <th>
              <el-button type="primary" size="mini" plain @click="openAlert(item)">查看档案</el-button>
              <el-button type="warning" size="mini" plain>录入档案</el-button>
            </th>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="files-doc-footer">
      <div class="files-doc-footer-left">
        <div class="files-doc-footer-all">
          <el-checkbox>全部</el-checkbox>
        </div>
        <div class="files-doc-footer-moveto">
          <el-dropdown>
            <span class="el-dropdown-link">移动到</span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>黄金糕</el-dropdown-item>
              <el-dropdown-item>狮子头</el-dropdown-item>
              <el-dropdown-item>螺蛳粉</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
      <div class="files-doc-footer-right">
        <el-pagination background layout="prev, pager, next" :total="1000"></el-pagination>
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
  </div>
</template>

<script>
import { mapState } from "vuex";
import selftag from "../../public/publicComponents/selftag.vue";
import search from "../../public/publicComponents/search.vue";
import doctorTab from "../../public/publicComponents/doctorTab.vue";
import { deepCopy } from "../../public/publicJs/deepCopy.js";
import { queryByPage } from "../../api/apiAll.js";
export default {
  components: {
    selftag,
    search,
    doctorTab
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
    }
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
		// return;
	//   this.alertData.show = true;
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
    },

    /**
     * 档案分类 被选中
     */
    fileClassificationSelect(data) {
      console.log(data);
      this.findCondition.fileClassification.select = data.index;
    },

    /**
     * 来源 被选中
     */
    sourceSelect(data) {
      console.log(data);
      this.findCondition.source.select = data.index;
    },

    /**
     * 院内档案 被选中
     */
    inHospitalFileSelect(data) {
      console.log(data);
      this.findCondition.inHospitalFile.select = data.index;
    },

    /**
     * 用户通过关键字搜索
     */
    searchChange(data) {
      console.log(data);
      this.findCondition.searchKey = data;
    },

    /**
     * 获取 患者分页列表
     */
    async getQueryByPage() {
      const query = {
        token: this.userInfo.token,
        groupId: this.findCondition.grouping.select.id,
        relSource: this.findCondition.source.select.id,
        isRecord: this.findCondition.source.select.id
          ? this.findCondition.source.select.id === "true"
          : false,
        searchKey: this.findCondition.searchKey,
        pageNum: this.findCondition.page.pageNum,
        pageSize: this.findCondition.page.pageSize
      };
      for (const i in query) {
        !query[i] ? delete query[i] : null;
      }
      console.log(query);
      // return;
      const res = await queryByPage(query);
      console.log(res);
      if (res.data && res.data.errCode === 0) {
		  this.userList = res.data.body.data2.list.map(item=>{
			  item.select = true;
			  return item;
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
  }
};
</script>

<style scoped>
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
}
.files-doc-table th {
  border-bottom: 1px solid var(--color5);
  padding-top: 0.12rem;
  padding-bottom: 0.1rem;
}
.files-doc--thead th {
  /* text-align: center; */
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
</style>