import Vue from 'vue';
import Vuex from 'vuex';

import test from './modules/test.js';//引入不同的vuex模块
import user from './modules/user.js';
import socket from './modules/socket.js';
import global from './modules/global.js';


Vue.use(Vuex);

export default new Vuex.Store({
//	state:{
//		count:0
//	},
//	mutations:{
//		ADDCOUNT(state,data){
//			state.count += data;
//		}
//	}
	modules:{
		test,//注入模块
		user,
		socket,
		global
	}
})