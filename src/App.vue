<template>
    <div id="app">

        <!-- <img src="./assets/logo.png">-->
        <transition>
            <router-view class="router-view-class" />
        </transition>
        <websocket1 ref="mychild"></websocket1>
    </div>
</template>

<script>
import "./video/assets/css/bootstrap.original.css";
import { mapState } from "vuex";

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
            userState: state => state.user.userInfo
        })
    },
    created() {
        this.lianjie()
        // const test = this.lianjie();
        // console.log(window.Manis);
        // console.log(this.$store.state.user.userInfo.hasAuth)
        // console.log(this.$store.state.user.userInfo.rooter)
        //  console.log(this.$store.state.user.userInfo.manager)
    },
    methods: {
        lianjie: function() {
            //  websocket.close()
            // console.log(this.userState.token)

            // window.websocket = websocket.initWebSocket(this.userState.token);
            
            
             
            this.$nextTick(ev=>{ 
                console.log(this.$refs)
                console.log(this.$refs.mychild)
                this.$refs.mychild.initWebSocket(this.userState.token);
            })

            // console.log(window.websocket)
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
