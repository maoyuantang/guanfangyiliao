<template>
  <div class="files-doc">
    <div class="files-doc-top">
      <div class="files-doc-top-left">
        <selftag v-model="findCondition.grouping.data" @reback="groupingSelect"></selftag>
        <selftag v-model="findCondition.fileClassification.data" @reback="fileClassificationSelect"></selftag>
        <selftag v-model="findCondition.source.data" @reback="sourceSelect"></selftag>
        <selftag v-model="findCondition.inHospitalFile.data" @reback="inHospitalFileSelect"></selftag>
      </div>
      <div class="files-doc-top-right"></div>
    </div>
    <div class="files-doc-body"></div>
    <div class="files-doc-footer"></div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import selftag from "../../public/publicComponents/selftag.vue";
import search from "../../public/publicComponents/search.vue";
export default {
  components: {
    selftag,
    search
  },
  computed: {
    ...mapState({
      userState: state => state.user.userInfo,
      userSelfInfo: state => state.user.userSelfInfo,
      global: state => state.global
	}),
	/**
	 * 分组信息
	 */
	groupInfo(){
		return {
			more: false,
			title: "分组",
			list:this.$store.state.global.group.map(item=>{
				item.text = item.name;
				return item;
			})
		}
	},
  },
  data() {
    return {
      findCondition: {
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
        }
      }
    };
  },
  methods: {
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
    }
  },
  async created() {}
};
</script>

<style scoped>
.files-doc {
}
</style>