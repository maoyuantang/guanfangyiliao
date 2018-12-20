名称：vuetest
框架：vue
ui框架:element-ui
图表：echarts
ajax：axios
作者：kition
作用：冠方医疗-后台管理 2.0
目录结构（主要）：
vueTest 
	node_modules//依赖包
	config//配置文件夹
	dist//打包文件夹
	src//项目主体
		api//ajax请求文件夹，放置ajax请求文件
		assets//静态资源文件夹
		components//放置普通组件
		enums//放置通用常量
		icons//放置icon
		libs//放置库文件（npm上找不到的）
		plugs//放置插件
		public//放置公共文件
			puclicComponents//放置公共组件
			publicCss//放置公共css
			publicJs//放置公共方法
		router//放置路由配置文件
			index.js//路由配置文件
		vuex//vuex配置
			index.js//vuex主体文件
			modules//vuex分层文件夹，放置分层文件
		App.vue//根组件
		main.js//项目入口文件
	static//静态资源文件夹（打包后依然存在）
	index.html//页面
	TODO.md//项目进度文件
	CHANGELOG.md//修改日志，记录修改
	
脚本命令：			
# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test



