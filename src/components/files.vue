<template>
  <div class="files">
    <div :is="viewCurrent.page"></div>
  </div>
</template>

<script>
import filesMan from './files/filesMan.vue' //医院管理员页面
import filesDoc from './files/filesDoc.vue' //医生页面
export default {
  computed: {
    /**
     * 根据用户权限，动态渲染
     */
    viewCurrent() {
      const rootView = {
        manager: 'filesMan',
        doctors: 'filesDoc',
      }
      return { page: rootView[this.$store.state.user.viewRoot.now.name] }
    },
  },
  components: {
    filesMan,
    filesDoc,
  },
}
</script>
