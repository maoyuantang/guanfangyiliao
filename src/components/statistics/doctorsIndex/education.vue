<!--
    远程教育
-->
<template>
  <div
    class="doctors-index-education"
    v-if="show"
  >
    <!-- <div class="doctors-index-education" v-if="show"> -->
    <div class="doctors-index-rounds">
      <div class="doctors-index-rounds-head">
        <span class="doctors-index-rounds-name">远程教育</span>
        <span></span>
      </div>
      <div class="doctors-index-rounds-body education-body">
        <div class="education-body-content">
          <div class="education-body-content-top">
            <div class="education-body-head">
              <img
                :src="info.imgUrl || '../../../../static/assets/img/doctorImg.png'"
                :alt="info.teacherName"
              >
            </div>
            <div class="education-body-userinfo">
              <p class="education-body-username">{{info.teacherName || ''}}</p>
              <p class="education-body-num">{{info.courseNumber || ''}}</p>
            </div>
          </div>
          <div class="education-body-content-bottom">
            <div class="education-body-content-bottom-item">
              <p class="education-body-content-bottom-item-key">授课时间</p>
              <p class="education-body-content-bottom-item-value">{{info.time || ''}}</p>
            </div>
            <div class="education-body-content-bottom-item">
              <p class="education-body-content-bottom-item-key">报名人数</p>
              <p class="education-body-content-bottom-item-value">{{info.num || 0}}</p>
            </div>
            <div class="education-body-content-bottom-item">
              <p class="education-body-content-bottom-item-key">状态</p>
              <p class="education-body-content-bottom-item-value">{{info.classState || ''}}</p>
            </div>
            <div class="education-body-content-bottom-item">
              <el-button
                type="danger"
                size="mini"
                @click="operating"
                v-if="info.btnName"
              >{{info.btnName}}</el-button>
            </div>
          </div>
        </div>
      </div>
      <!-- 进入学习 弹窗 -->
      <el-dialog :close-on-click-modal="false"
        title=" "
        append-to-body
        width="50vw"
        :visible.sync="alertData.show"
        :before-close="closeAlert"
        @opened="createVedio"
        @close="clearVedio"
      >
        <div class="doctors-index-education-alert">
          <video
            ref="videoElement"
            class="centeredVideo"
            controls
            autoplay
          >Your browser is too old which doesn't support HTML5 video.</video>
        </div>
      </el-dialog>
      <!-- <div class="no-data">
            <h1>暂无数据</h1>
      </div>-->
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import flv from 'flv.js'
import apiBaseURL from '../../../enums/apiBaseURL.js'
import {
  signUp,
  intoClassroom,
  intoPlatform,
  webCourseList,
} from '../../../api/apiAll.js'
export default {
  watch: {},
  computed: {
    ...mapState({
      userInfo: state => state.user.userInfo,
      userSelfInfo: state => state.user.userSelfInfo,
    }),
  },

  data() {
    return {
      info: {},
      show: false,
      alertData: {
        show: false,
      },
      url: '',
    }
  },

  methods: {
    /**
     * 关闭弹窗
     */
    closeAlert() {
      this.alertData.show = false
    },
    /**
     * 按钮被点击  操作
     */
    operating() {
      // console.log(this.info)
      const funCMap = {
        TOSIGNUP: this.TOSIGNUP, //报名
        TOLEARN: this.TOLEARN, //进入学习
        TOTEACH: this.TOTEACH, //进入教学
        NULL: this.NULL, //无操作
      }
      funCMap[this.info.action] && funCMap[this.info.action](this.info)
    },
    /**
     * 报名
     */
    async TOSIGNUP(item) {
      // console.log(item)
      const res = await signUp({
        token: this.userInfo.token,
        id: item.id,
      })
      // console.log(res);
      if (res.data && res.data.errCode === 0) {
        this.$notify({
          title: '成功',
          message: '报名成功',
          type: 'success',
        })
        this.getWebCourseList()
      } else {
        this.$notify({
          title: '报名失败',
          message: res.data.errMsg,
          type: 'error',
        })
      }
    },
    /**
     * 进入学习
     */
    async TOLEARN(item) {
      const data = await intoClassroom({
        token: this.userInfo.token,
        id: item.id,
      }).then(({ data }) => data)

      if (data && data.errCode === 0) {
        this.url = data.body.playUrl.flv.replace(/^http:\/\//i, 'https://')
        this.alertData.show = true
      } else {
        this.$notify({
          title: '进入失败',
          message: data.errMsg,
          type: 'error',
        })
      }
    },
    /**
     * 进入教学
     */
    async TOTEACH(item) {
      // console.log(item);
      const res = await intoPlatform({
        token: this.userInfo.token,
        id: item.id,
      })
      // console.log(res);
      if (res.data && res.data.errCode === 0) {
      } else {
        this.$notify({
          title: '进入失败',
          message: res.data.errMsg,
          type: 'error',
        })
      }
    },
    /**
     * 无操作
     */
    async NULL(item) {},
    /**
     * 获取课程
     */
    async getWebCourseList() {
      const query = {
        token: this.userInfo.token,
        pageSize: 1,
        pageNum: 1,
      }
      const res = await webCourseList(query)
      // console.log(res);
      if (res.data && res.data.errCode === 0) {
        const reData = res.data.body.list[0]
        reData.imgUrl = reData.headId
          ? `${apiBaseURL.imgBaseUrl}/m/v1/api/hdfs/fs/download/${
              reData.headId
            }`
          : reData.headId
        const newTime = new Date(reData.teachStartTime)
        reData.time = `${newTime.getFullYear()}-${newTime.getMonth() +
          1}-${newTime.getDate()}`
        const btnStatus = {
          TOSIGNUP: {
            //报名
            type: 'primary',
            label: '报名',
          },
          TOLEARN: {
            //进入学习
            type: 'danger',
            label: '进入学习',
          },
          TOTEACH: {
            //进入教学
            type: 'warning',
            label: '进入教学',
          },
        }
        // console.log(reData.action);
        reData.btnName = btnStatus[reData.action]
          ? btnStatus[reData.action].label
          : ''
        this.info = reData
        this.show = true
      } else {
        this.$notify({
          title: '课程列表获取失败',
          message: res.data.errMsg,
          type: 'error',
        })
        this.show = false
      }
    },
    createVedio() {
      const { url } = this;
      if (url.length <= 0 || typeof url !== 'string') {
        this.$notify({
          title: '无效的视频播放地址',
          message: `请刷新页面，或者联系管理: ${url}`,
          type: 'error',
        })

        return
      }

      this.$nextTick(() => {
        if (flv.isSupported()) {
          this.player = flv.createPlayer({
            type: 'flv',
            url,
          })
          this.player.attachMediaElement(this.$refs.videoElement)
          this.player.load()
          this.player.play()
        }
      })
    },
    /**
     * 清楚 video
     */
    clearVedio() {
      this.player.pause()
      this.player.unload()
      this.player.detachMediaElement()
      this.player.destroy()
      this.player = null
    },
  },
  created() {
    this.getWebCourseList()
  },
  destroyed() {
    this.player && this.clearVedio()
  },
}
</script>

<style scoped>
.doctors-index-education {
  /* height: 100%; */
  width: 5.2rem;
  height: 3rem;
}
.doctors-index-rounds {
  height: 100%;
  border: 1px solid #e5edf3;
  border-radius: 4px;
  background-color: white;
}
.doctors-index-rounds-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 28px;
}
.doctors-index-rounds-name {
  font-family: PingFangSC-Regular;
  font-size: 16px;
  color: #778ca2;
  padding-left: 24px;
}
.education-body {
  padding-left: 0.15rem;
  padding-right: 0.15rem;
  margin-top: 40px;
}
.education-body-content {
  border: 1px solid #e1e8ee;
  border-radius: 4px;
  /* height: 1rem; */
  padding-left: 0.2rem;
}
.education-body-content-top {
  display: flex;
  align-items: center;
  border-bottom: 1px solid #e4e8ee;
  padding-top: 22px;
  padding-bottom: 23px;
}
.education-body-head {
  width: 53px;
  height: 53px;
  margin-right: 21px;
}
.education-body-head > img {
  display: block;
  width: 100%;
  height: 100%;
  border-radius: 50%;
}
.education-body-username {
  font-family: PingFangSC-Semibold;
  font-size: 15px;
  color: #002257;
  letter-spacing: 0.1px;
  font-weight: bold;
}
.education-body-num {
  font-family: PingFangSC-Regular;
  font-size: 13px;
  color: #97a3b4;
  line-height: 22px;
}
.education-body-content-bottom {
  display: flex;
  padding-top: 18px;
  padding-bottom: 18px;
  align-items: center;
}
.education-body-content-bottom-item {
  flex: 1;
}
.education-body-content-bottom-item-key {
  font-family: PingFangSC-Semibold;
  font-size: 13px;
  color: #97a3b4;
  line-height: 22px;
}
.education-body-content-bottom-item-value {
  font-family: OpenSans-Semibold;
  font-size: 13px;
  color: #002257;
  line-height: 22px;
  font-weight: bold;
}
.doctors-index-education-alert {
  height: 40vw;
}
.centeredVideo {
  width: 100%;
  height: 100%;
}
</style>
