<template>
  <div class="oneTangOut" v-show="myHomes.length != 0">


    <div v-if="centerDialogVisible">
      <el-dialog title="" :visible.sync="centerDialogVisible" center append-to-body fullscreen @close="closeVideo()">
        <ovideo :createVideoRoomData="createVideoRoomData" :videoType="videoType" :oClinicId="oClinicId"
          @reback="videoclick">
        </ovideo>
      </el-dialog>
    </div>



    <div class="top">
      <div class="top1">远程门诊</div>
      <i class=" top2 iconfont" @click="goMore()">&#xe612;</i>
    </div>
    <div class="body">

      <div v-for="(text,index1) in myHomes" :key="index1" class="fors" v-if="index1 < 2">
        <div class="title">
          <div class="title1">{{text.orgName}}-{{text.clinicName}}</div>
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
      // 7.6(WEB医生)获取所有该医生的在线诊室(医生端列表1)
      async getList1() {
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
          // this.myHomesBiao.length = 0;
          // $.each(res.data.body.data2.list, function (index, text) {
          //   _this.myHomesBiao.push(index);
          //   _this.tableDataList1.push([
          //     {
          //       process: text.process,
          //       unProcess: text.unProcess,
          //       doctorCount: text.doctorCount,
          //     }
          //   ]);
          // });
          // console.log(this.tableDataList1);
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
      async goShiPin(data) {
        this.oClinicId = data.id;
        let _this = this;
        let query = {
          token: this.userInfo.token
        };
        const options = {
          clinicId: data.id
        };
        const res = await doctorInto(query, options);
        console.log(res);
        if (res.data && res.data.errCode === 0) {
          _this.centerDialogVisible = true;
        } else {
          //失败
          this.$notify.error({
            title: "警告",
            message: res.data.errMsg
          });
        }

      },
      videoclick(data) {
        this.centerDialogVisible = false;
      },


    },

    async created() {
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

      .top2 {}
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