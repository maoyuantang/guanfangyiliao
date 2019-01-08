export default {
	namespaced: true,
	state:{
        socketObj:null,//socket对象
        msgBox:{//消息盒子
            a:{
                msg:[
                    {
                        from:'',
                        to:'',
                        data:""
                    }
                ],
                type:0
            }
        },
	},
	mutations:{
        /**
         * 
         * @param {*} state 
         * @param {*} data 
         */
		SETSOCKET(state,data){
			state.socketObj = data;
		},
	},
	actions:{
		setSocket(context,data){
			context.commit("SETSOCKET",data);
		},
	}
}