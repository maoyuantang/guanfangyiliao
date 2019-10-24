组件说明：
	index为次根组件（app.vue之下），notFound组件为404组件，这两个组件同级。除这两个组件之外，其他在路由里设置为下级组件


大致结构：
	app.vue 
	
		index.vue/*次根组件*/
			top.vue/*头部head组件*/
			middle.vue/*主体内容组件*/
				navigation.vue/*左部导航组件*/
				test.vue/*具体内容组件（由路由决定,这只是个测试组件）*/
				testb.vue/*具体内容组件（由路由决定，这只是个测试组件）*/
				consultation.vue/*远程会诊系统*/
				cooperation.vue/*远程协作系统*/
				education.vue/*远程教育系统*/
				files.vue/*健康档案系统*/
				followUp.vue/*智能随访系统*/
				management.vue/*终端管理系统*/
				medicalTreatment.vue/*分级诊疗系统*/
				outpatient.vue/*远程门诊系统*/
				referral.vue/*双向转诊系统*/
				rounds.vue/*移动查房系统*/
				statistics.vue/*默认首页*/
		
		notFound.vue/*404组件*/
	
