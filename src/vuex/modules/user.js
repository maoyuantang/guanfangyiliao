export default {
	namespaced: true,
	state:{
		viewRoot:{
			now:{
				name:'',
				type:''
			},
			rooter:[

			],
			manager:[
				{
					name:'首页',
					select:true,
					path:'/',
					code:'1'
				}
			],
			doctors:[
				{
					name:'首页',
					select:true,
					path:'/',
					code:'1'
				}
			]
		},//视图权限，用户能看到哪些界面，现在用户权限基本是个摆设，而且既是医生又是医院管理这个角色无法判断（后端未返回），根据后端要求，用户的权限和视图已经没啥关系了
		// root:null,//用户权限（角色） 四个角色：超级管理员，用'a'表示；医院管理员，用'b'吧表示；医生，用'c'表示；既是医生又是医院管理员，用'bc'表示
		userInfo:{//用户账号信息
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
				 * hasAuth.                                                                                                                                                                                                                                                                                                => 权限标识符,类型String
				 * 
				 *  */
				// {"type": "1","authorityId": "10000"}
			],
			hospitalCode:'',//医院代码
			userType:false,//用户类型，true表示医生/管理/超级管理，false表示用户
		},
		userSelfInfo:{//用户个人信息（由于后端将这两个信息分成了两个接口，我写的时候又不知道还有这个分法，前面那个变量其实更合适，但是已经与前面写的代码混了）
			userId:'',//用户ID: type => String    
			name:'',//用户名称: type => String
			account:'',//账号: type => String
			headId:'',//头像ID
			phone:'',//手机号: type => String
			userType:0,//用户类型: type => int
			completion:false,//是否完善: type => boolean
			currMaxVersion:-1,//最大IM数据版本号: type => int
			sex:-1,//性别: type => int
			age:-1,//年龄: type => int
			openArchives:false,//是否公开档案: type => boolean
			specialty:'',//擅长: type => String
			introduce:'',//简介: type => String
			orgCode:'',//医院代码: type => String 
			orgName:'',//医院名称: type => String
			depts:[
				{
					deptId:'',//科室ID: type => String   
					deptName:''//科室名称: type => String
				}
			]
		}
	},
	mutations:{
		/**
		 * 保存用户视图权限
		 */
		SETVIEWROOT(state,data){
			state.viewRoot = data;
		},

		/**
		 * 设置（切换）用户权限
		 */
		SETROOT(state,data){
			console.log(data)
			state.root = data;
		},

		/**
		 * 切换用户视图身份
		 */
		CHANGEVIEWAUTH(state,data){
			state.viewRoot.now = data;
			state.viewRoot = Object.assign({},state.viewRoot);
			// const obj = {
			// 	'1':'manager',
			// 	'2':'doctors'
			// };
			// state.viewRoot.now ={
			// 	name:obj[data],
			// 	type:data
			// }
			// state.viewRoot.now = data==='1'?{name:'manager',type:'1'}:{name:'manager',type:'2'}
		},

		/**
		 *  state =>state 
		 *  data =>传入数据，类型为json
		 * 作用：设置用户账号信息
		 */
		SETUSERINFO(state,data){
			if(Object.prototype.toString.call(data)!=="[object Object]")return;//数据类型不对直接返回
			state.userInfo.isLogin = true;//回台是返回没有这个字段，这个字段只是方便前端操作添加的
			state.userInfo = data;
		},

		/**
		 * 作用：清除用户账号信息
		 */
		CLEARUSERINFO(state){
			const option = {
				// userInfo:{
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
		
				// }
			};
			// sessionStorage.setItem('userSelfInfo',option);
			sessionStorage.clear()
			state.userInfo = option;
		},

		/**
		 * 
		 * 作用：设置用户个人信息
		 */
		SETUSERSELFINFO(state,data){
			if(Object.prototype.toString.call(data)!=="[object Object]")return;//数据类型不对直接返回
			state.userSelfInfo = data;
		},

		/**
		 * 作用：清除用户个人信息
		 */
		CLAERUSERSELFINFO(state){
			const userSelfInfo = {//用户个人信息（由于后端将这两个信息分成了两个接口，我写的时候又不知道还有这个分法，前面那个变量其实更合适，但是已经与前面写的代码混了）
				userId:'',//用户ID: type => String
				name:'',//用户名称: type => String
				account:'',//账号: type => String
				headId:'',//头像ID
				phone:'',//手机号: type => String
				userType:0,//用户类型: type => int
				completion:false,//是否完善: type => boolean
				currMaxVersion:-1,//最大IM数据版本号: type => int
				sex:-1,//性别: type => int
				age:-1,//年龄: type => int
				openArchives:false,//是否公开档案: type => boolean
				specialty:'',//擅长: type => String
				introduce:'',//简介: type => String
				orgCode:'',//医院代码: type => String
				orgName:'',//医院名称: type => String
				depts:[
					{
						deptId:'',//科室ID: type => String
						deptName:''//科室名称: type => String
					}
				]
			};
			// sessionStorage.setItem('userSelfInfo',userSelfInfo);
			sessionStorage.clear()
			state.userSelfInfo = userSelfInfo;

		}
	},
	actions:{//异步提交
		addCount(context,data){
			context.commit("ADDCOUNT",data);
		},
		/**
		 * 
		 * 作用：设置用户账号信息
		 */
		setUserInfo(context,data){//设置用户账号信息
			context.commit("SETUSERINFO",data);
		},
		/**
		 * 
		 * 作用：清除用户账号信息
		 */
		clearUserInfo(context){//清除用户账号信息
			context.commit("CLEARUSERINFO");
		},

		/**
		 * 作用：设置用户个人信息
		 */
		setUserSelfInfo(context,data){
			context.commit("SETUSERSELFINFO",data);
		},

		/**
		 * 作用：清除用户个人信息
		 */
		clearUserSelfInfo(context){
			context.commit("CLAERUSERSELFINFO");
		},
	}
}
/**
 * 存放用户信息，包括但不限于身份，权限变，id等等信息
 */
