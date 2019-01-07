<template>
	<div id="app">
		<!-- <img src="./assets/logo.png">-->
		<transition>
			<router-view class="router-view-class" />
		</transition>

	</div>
</template>

<script>
    import { mapState } from 'vuex'

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
        this.lianjie();
    },
    methods: {
        lianjie() {
            websocket.initWebSocket(this.userState.token);
        }
    },
    watch: {
        $route(to, from) {
            console.log(to);
            console.log(from);
        }
    },
    beforeRouteUpdate(to, from, next) {
        if (this.$router.isBack) {
        } else {
        }
        this.$router.isBack = false;
        next();
    }
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
