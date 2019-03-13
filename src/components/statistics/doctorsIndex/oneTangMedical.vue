<template>
  <div class="oneTangMedical">
    oneTangMedical
  </div>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    watch: {

    },
    computed: {
      ...mapState({
        userInfo: state => state.user.userInfo,
        userSelfInfo: state => state.user.userSelfInfo
      })
    },

    data() {
      return {
      }
    },

    methods: {


    },
    components: {
    },
    async created() {

    }
  }
</script>

<style>
  .doctors-index-rounds {}
</style>
<!--
    医生界面
-->