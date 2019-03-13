<template>
  <div class="oneTangOut">
    oneTangOut
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
      }),
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
  
</style>
<!--
    医生界面
-->