export default {
	namespaced: true,
	state:{
		count:0,
		userInfo:{
			isLogin:false,//是否登录，true是，false否.默认未登录
			account:'',//账号
			passwd:'',//密码
			token:'',//免密登录标识
			rooter:false,//是否超级管理员；true是，false否,默认false
			manager:false,//是否医院管理员；true是，false否,默认false
			completion:false,//是否已经完善信息；true是，false否 ,默认false
			sign:'',//接口签名串的加密串 
			hasAuth:[//拥有的权限 
				/**
				 * 
				 * hasAuth.type => 权限类型,类型String，1,科室管理权限.2,医生业务
				 * hasAuth.authorityId => 权限标识符,类型String
				 * 
				 *  */
				// {"type": "1","authorityId": "10000"}
			],
			hospitalCode:'',//医院代码
		}
	},
	mutations:{
		/**
		 * 
		 * @param {*} state 
		 * @param {*} data 
		 * 作用：测试
		 */
		ADDCOUNT(state,data){
			state.count += data;
		},

		/**
		 * @param {*} state =>state 
		 * @param {*} data =>传入数据，类型为json
		 * 作用：设置用户信息
		 */
		SETUSERINFO(state,data){
			if(Object.prototype.toString.call(data)!=="[object Object]")return;//数据类型不对直接返回
			state.userInfo.isLogin = true;//回台是返回没有这个字段，这个字段只是方便前端操作添加的
			state.userInfo = data;
		},

		/**
		 * 作用：清除用户信息
		 */
		CLEARUSERINFO(){
			const option = {
				userInfo:{
					isLogin:false,//是否登录，true是，false否.默认未登录
					account:'',//账号
					passwd:'',//密码
					token:'',//免密登录标识
					rooter:false,//是否超级管理员；true是，false否,默认false
					manager:false,//是否医院管理员；true是，false否,默认false
					completion:false,//是否已经完善信息；true是，false否 ,默认false
					sign:'',//接口签名串的加密串 
					hasAuth:[//拥有的权限 
						/**
						 * 
						 * hasAuth.type => 权限类型,类型String，1,科室管理权限.2,医生业务
						 * hasAuth.authorityId => 权限标识符,类型String
						 *  */
						// {"type": "1","authorityId": "10000"}
					],
					hospitalCode:'',//医院代码
		
				}
			};
			state.userInfo = option;
		}
	},
	actions:{//异步提交
		addCount(context,data){
			context.commit("ADDCOUNT",data);
		},
		/**
		 * 
		 * @param {*} context 
		 * @param {*} data 
		 * 作用：设置用户信息
		 */
		setUserInfo(context,data){//设置用户信息
			context.commit("SETUSERINFO",data);
		},
		/**
		 * 
		 * @param {*} context 
		 * 作用：清除用户信息
		 */
		clearUserInfo(context){//清除用户信息
			context.commit("CLEARUSERINFO");
		},
	}
}
