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
		
	}
}
/**
 * 测试文件  无用
 */