export default {
	namespaced: true,
	state:{
		count:0
	},
	mutations:{
		ADDCOUNT(state,data){
			state.count += data;
		},
	},
	actions:{
		addCount(context,data){
			context.commit("ADDCOUNT",data);
		}
	}
}
