组件说明：
	index为次根组件（app.vue之下），notFound组件为404组件，这两个组件同级。除这两个组件之外，其他在路由里设置为下级组件


大致结构：
	app.vue 
	
		index.vue/*次根组件*/
			top.vue/*头部head组件*/
			middle.vue/*主体内容组件*/
				navigation.vue/*左部导航组件*/
				test.vue/*具体内容组件（由路由决定）*/
				testb.vue/*具体内容组件（由路由决定）*/
		
		
		notFound.vue/*404组件*/
	
