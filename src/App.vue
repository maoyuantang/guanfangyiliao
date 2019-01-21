<template>
	<div id="app">
        
		<!-- <img src="./assets/logo.png">-->
		<transition>
			<router-view class="router-view-class" />
		</transition>

	</div>
</template>

<script>
import "./video/assets/css/bootstrap.original.css"
import { mapState } from "vuex";

import websocket from "./common/websocket.js";
import "./public/publicCss/base.css";
export default {
  
    name: "App",
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
        const test = this.lianjie();
        console.log(window.Manis)
        // console.log(this.$store.state.user.userInfo.hasAuth)
        // console.log(this.$store.state.user.userInfo.rooter)
        //  console.log(this.$store.state.user.userInfo.manager)
				
    },
    methods: {
        lianjie:function() {
        //  websocket.close()
        // console.log(this.userState.token)
        
            window.websocket = websocket.initWebSocket(this.userState.token);
        
            // console.log(window.websocket)
        }
    },
    watch: {
    },
}
</script>

<style>
[v-cloak] {
    display: none !important;
}

#app {
    display: flex;
    height: 100%;
    flex-direction: column;
}
</style>
