<template>
  <div class="oneTangOut" v-show="myHomes.length != 0">
    <!-- 视频聊天 -->
    <div v-if="centerDialogVisible">
      <el-dialog class='videoClassBox' title="" :visible.sync="centerDialogVisible" center append-to-body fullscreen
        @close="closeVideo()" :showClose="VideoshowClose">
        <ovideo :createVideoRoomData="createVideoRoomData" :videoType="videoType" :oClinicId="oClinicId"
          @reback="videoclick" :doctorVis='doctorVis' :userMessage="userMessage" :chatTypeBox="chatTypeBox">
        </ovideo>
      </el-dialog>
    </div>


    <!-- <div v-if="centerDialogVisible">
      <el-dialog title="" :visible.sync="centerDialogVisible" center append-to-body fullscreen @close="closeVideo()">
        <ovideo :createVideoRoomData="createVideoRoomData" :videoType="videoType" :oClinicId="oClinicId"
          @reback="videoclick">
        </ovideo>
      </el-dialog>
    </div> -->



    <div class="top">
      <div class="top1">远程门诊</div>
      <i class=" top2 iconfont" @click="goMore()">&#xe612;</i>
    </div>
    <div class="body">

      <div v-for="(text,index1) in myHomes" :key="index1" class="fors" v-if="index1 < 2">
        <div class="title">
          <div class="title1">{{text.clinicName}}</div>
          <el-button type="primary" size="mini" @click="goShiPin(text)">点击进入</el-button>
        </div>
        <div class="i1"></div>
        <div class="jindu"><span class="jindu1">未处理 {{text.unProcess}}人</span><span class="jindu2">/ 已处理
            {{text.process}}人</span></div>
        <div class="i2"></div>
      </div>

    </div>
  </div>
</template>

<script>
  //引入接口
  import {
    doctorInto,//20.1医生进入诊室
    onlineRoomsByDoctor,//7.6(WEB医生)获取所有该医生的在线诊室
  } from "../../../api/apiAll.js";
  import { mapState } from 'vuex'

  import ovideo from "../../../video/oVideo.vue";


  export default {
    components: {
      ovideo,
    },
    watch: {},
    computed: {
      ...mapState({
        userInfo: state => state.user.userInfo,
        userSelfInfo: state => state.user.userSelfInfo
      }),
    },

    data() {
      return {
        typeQuan: [],
        typeQuan1: false,
        typeQuan2: false,
        typeQuan3: false,
        adss: 0,
        // 谭莹
        chatTypeBox: {
          startDoctorName: "",
          startDoctorTYpe: "门诊"
        },
        VideoshowClose: false,
        videoType: "门诊",
        chatVisible1: true,
        doctorVis: 1, //医生跟患者单聊
        sessionId: "", //会话id
        chatVisible: false,
        userMessage: {},
        createVideoRoomData: {
          conferenceId: "",
          conferenceNumber: ""
        },
        oClinicId: [], //当前进入门诊id
        // 谭莹



        myHomes: [],
        myHomesBiao: [],
        centerDialogVisible: false,

        createVideoRoomData: {
          conferenceId: "",
          conferenceNumber: ""
        },
        videoType: "门诊",
        oClinicId: "",//当前门诊id
      }
    },

    methods: {
      // 视屏
      videoclick(data) {
        this.centerDialogVisible = false;
      },
      //进入门诊
      async goShiPin(text) {
        console.log(text)
        this.userMessage = {
          clinicId: text.id,
          departmentId: text.departmentId
        };

        this.oClinicId = text.id;
        this.centerDialogVisible = true;
      },
      //退出诊室
      async closeVideo() {
        let _this = this;
        let query = {
          token: this.userInfo.token
        };
        const options = {
          conferenceId: this.createVideoRoomData.conferenceId,
          state: "OFF"
        };
        const res = await storageUsers(query, options);
        console.log(res);
        if (res.data && res.data.errCode === 0) {
          this.$notify.success({
            title: "成功",
            message: "退出成功！"
          });
          _this.createVideoVisable = false;
          _this.sendMessageChat(6, "cancle", "VIDEO");
        } else {
          //失败
          this.$notify.error({
            title: "警告",
            message: res.data.errMsg
          });
        }
      },
      // 医生端权限
      doctorQuanXian() {
        let quanXian = this.userInfo.hasAuth.filter(item => item.type === '2')
        this.typeQuan = []
        this.typeQuan1 = false
        this.typeQuan2 = false
        this.typeQuan3 = false
        // console.table(quanXian)
        for (let i = 0; i < quanXian.length; i++) {
          // console.log(quanXian[i].authorityId)
          if (quanXian[i].type == 2) {
            // console.log(quanXian[i].authorityId)
            this.typeQuan.push(quanXian[i].authorityId)
          }

        }
        // console.log(this.typeQuan + "-------------")
        this.typeQuan.forEach((element, index) => {
          // console.log(element, index, element[index])
          if (element == 10001) {
            this.typeQuan1 = true;
          } else if (element == 10002) {
            this.typeQuan2 = true;
          } else if (element == 10003) {
            this.typeQuan3 = true;
          }
        });
      },
      // 7.6(WEB医生)获取所有该医生的在线诊室(医生端列表1)
      async getList1() {
        // console.log(this.typeQuan3)
        if (!this.typeQuan3) {
          return
        }
        var date = new Date();
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();
        if (month < 10) {
          month = "0" + month;
        }
        if (day < 10) {
          day = "0" + day;
        }
        var nowDate = year + "-" + month + "-" + day;
        this.time0 = nowDate;
        this.time1 = nowDate;

        const _this = this;
        let query = {
          token: this.userInfo.token,
          pageNum: this.pageNum,
          pageSize: this.pageSize
        };
        const res = await onlineRoomsByDoctor(query);
        if (res.data && res.data.errCode === 0) {
          console.log("医生端列表1+成功");
          console.log(this.time0)
          console.log(this.time1)
          this.myHomes = res.data.body.data2.list;
          console.log(this.myHomes);
        } else {
          //失败
          console.log("医生端列表1+失败");
          this.$notify.error({
            title: "警告",
            message: res.data.errMsg
          });
        }
      },















      async goMore() {
        sessionStorage.setItem('page', JSON.stringify({//存缓存
          name: '远程门诊系统',
          select: true,
          path: '/outpatient',
          code: '10000'
        }));
        this.$router.push({
          path: "/outpatient",
        })
      },


    },

    async created() {
      this.doctorQuanXian()
      this.getList1()
    }
  }
</script>

<style lang="scss" scoped>
  .oneTangOut {
    background: #FFFFFF;
    border: 1px solid #E5EDF3;
    box-shadow: 0 6px 36px 0 rgba(0, 62, 100, 0.04);
    border-radius: 4px;
    padding: 15px;
    width: 5.2rem;
    height: 3rem;

    .top {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .top1 {
        padding: 6px 0 0 6px;
        font-family: PingFangSC-Regular;
        font-size: 18px;
        color: #778CA2;
      }

      .top2 {
        cursor: pointer;
      }
    }

    .body {
      width: 70%;
      margin: auto;

      .fors {
        margin: 25px 0 0 0;

        .title {
          display: flex;
          justify-content: space-between;
          align-items: center;

          .title1 {
            font-family: PingFangSC-Regular;
            font-size: 15px;
            color: #252631;
          }

          .title2 {
            background: #4285F4;
            border-radius: 4px;
          }
        }

        .i1 {
          border: 1px solid #E8ECEF;
          margin: 10px 0;
        }

        .jindu {
          .jindu1 {
            font-family: PingFangSC-Regular;
            font-size: 14px;
            color: #0067FF;
            line-height: 21px;
          }

          .jindu2 {
            font-family: PingFangSC-Regular;
            font-size: 14px;
            color: #3E0000;
            line-height: 21px;
          }
        }

        .i2 {
          border-radius: 1px;
          border: 1.5px solid #6DD230;
          margin: 10px 0;
        }
      }
    }
  }
</style>
<!--
    医生界面
-->