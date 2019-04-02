<template>
    <div id="app">
        <websocket1 v-if="userState.isLogin" ref="mychild"></websocket1>
        <!-- <img src="./assets/logo.png">-->
        <transition>
            <router-view class="router-view-class" />
        </transition>

        
    </div>
</template>

<script>
import "./video/assets/css/bootstrap.original.css";
import { mapState } from "vuex";

import websocket from "./common/websocket.js";
// import websocket from "./common/websocket.js";
import "./public/publicCss/base.css";
import websocket1 from "./common/websocket.vue";
export default {
    name: "App",
    components: {
        websocket1
    },
    data() {
        return {
            transitionName: "slide-left"
        };
    },
    computed: {
        ...mapState({
            userState: state => state.user.userInfo,
            userSelfInfo: state => state.user.userSelfInfo,
            global: state => state.global
        })
    },
    created() {
        console.log('登录成功后执行app.vue文件')
        console.log(this.userState.token)
        if (this.userState.token) {
            this.lianjie();
        }
    },
    methods: {
        lianjie: function() {
            this.$nextTick(ev => {
                console.log(this.$refs);
                console.log(this.$refs.mychild);
                this.$refs.mychild.initWebSocket(this.userState.token);
            });
        }
    },
    watch: {}
};
</script>

<style lang="scss">
[v-cloak] {
    display: none !important;
}

#app {
    display: flex;
    height: 100%;
    flex-direction: column;
}
</style>
