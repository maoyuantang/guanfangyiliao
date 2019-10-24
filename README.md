名称：vuetest

基础框架：vue

ui框架:element-ui,iview

图表：echarts

ajax：axios

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

项目说明：
一个医疗管理后台，大致分为：远程门诊系统，远程会诊系统，远程协作系统，智能随访系统，健康档案系统，远程教育系统，分级诊疗系统，双向转诊系统，家医系统等系统，每个系统可能下辖子系统，数量不确定。	每个模块都有两种权限状态：医院管理权限和医生权限，值得注意的是，具有医院管理权限的除了医院的管理员之外，普通医生也可以具有医院的部分管理权限。账号具有所有权限由后端传来，注意后端传的是个     json数组，包含信息有：权限码（每个系统和子系统都有其对应权限码，不清楚找后端，我也知道的不全），身份码（是医生或者医院管理员）。值得注意的是一个账号可能具有某个医院管理的权限，但不一定具     有对应的医生权限。比如一个账号具有‘远程门诊系统’这个系统的医院管理权限，但不一定具有‘远程门诊系统’的医生权限。首页和超级管理员是没有权限码（后端没有返回），所以前端手动添加为字符串1为首      页权限码，2为超级川里院权限码，3为云存储管理权限码（后端返回的也是字符串，比如字符串（不是数字）10000对应‘远程门诊系统’）

基本配置：
	vue-cli2.0基础上添加3个全局变量，process.env.WSS_PATH（websocket的url），process.env.HTTPS_PATH（https请求的url），process.env.IMG_PREFIX（图片地址url，注意：图片地址不是后端返 回，需要自己拼接），这三个变量会在执行脚本命令时会分配不同值（用来区分开发环境的测试环境）。由于后端没有开启跨域，本地启用了代理配置。打包时将绝对路径修改为想对路径。

api:
	前端使用axios发送请求。全部统一配置，src\enums\apiList.js 存放所有请求路径， src\api\apiAll.js 存放所有请求。项目只有两种请求类型（get和post），每种请求头部有加密并且不一样， src\public\publicJs\postQueryHandle.js 为post加密处理函数（具体使用看该文件注释）， src\public\publicJs\getQueryHandle.js 为get加密处理函数（具体使用看该文件注释）。

icon：
	element-ui icon和阿里图标库混合使用，src\icons\baseIcon.css 存放阿里图标库引用地址

assets：
	由于存放在assets文件夹的静态资源在编写代码时有引用问题和打包后路径问题，基本已经弃用，转移到static文件夹

plugs：
	存放插件文件夹，放有axios（ajax），echarts（图表），element-ui（ui框架），iview（ui框架，用得少，但用的有点），VideoPlayer（vedio播放插件），其他的由于不是本人引入，不清楚功用

vuex：
	vuex经过分层，开启有命名空间。分层文件放在src\vuex\modules 文件夹下，然后在src\vuex\index.js 组装，最后在app.vue注入vue实例。

main.js:
	main.js是项目入口，引入资源并创建vue实例，然后挂载实例

项目结构（路由是hash模式，不需要后端在做处理）：
	路由每次进入会先判断vuex里面有没有用户信息（主要怕用户直接在url上做手脚），如果有则不拦截，否则查找缓存中是否有用户信息（主要用于用户是刷新页面，导致vuex数据丢失）。如果缓存有用户信息，说明是刷新，再重新将缓存里的数据格式化一下再存入vuex，继续路由。若没有说明用户未登录，直接跳转登录页面。
app.vue (根组件,<router-view/>)
	index.vue(主体)
		navigation.vue(左侧导航栏)
		<router-view/>(路由窗口)
			statistics.vue(默认显示首页文件，这个比较特殊，包含有：超级管理员，医院管理员和医生三种身份的权限)
				superManagement.vue(超级管理员)
				hospitalManagement.vue(医院管理员。注意：这个页面不仅仅是医院管理员能够看到，具有管理权限的医生也能看到，只有‘账号及权限’模块是医院管理员独有权限)
				doctorsIndex.vue(医生，医院管理员不可见，只有具有医生权限才能看到，)
			cloudManagement.vue(云存储管理,仅超级管理员可见)
			rounds.vue(移动查房系统)
			referral.vue(双向转诊系统)
			outpatient.vue(远程门诊系统)
			medicalTreatment.vue(分级诊疗系统)
			management.vue(终端管理系统)
			followUp.vue(智能随访系统)
			files.vue(健康档案系统)
			education.vue(远程教育系统)
			cooperation.vue(远程协作系统)
			consultation.vue(远程会诊系统)
			familyMedicine.vue(家医生系统)
			docDetailed.vue(健康档案系统-患者详情)
				这个是后加的，自己加了个权限码000001
	login.vue(登录)
	notFound.vue(404)
注意：如果一个组件下面有另一个组件（公共组件和写在路由里的除外），会在当前文件夹下建一个同名文件夹，把其子组件放入其中

权限：
	用户权限由后端返回一个json数组，需要对数组做出一定处理。一开始后端只要求写一级模块系统（一级模块系统一万的整数倍，当然是字符串），后来要求也要叫我把子系统（子系统是父系统的个位上添加，比如10000对应‘远程门诊系统’这个父级系统，‘远程门诊系统’下的子模块‘处方配送’为10001，）也写上。但是如果只有一个子系统，后端却不会返回其父系统，需要自己找到父系统并加上（后端要求），所以大致流程（具体请看login.vue）：
	1、如果有子系统，则加上父系统
	2、去除重复父系统
	3、由于后端传回的权限混在一个数组里，将其分类为两个数组（一个是医院管理权限，一个是医生权限。由于超级管理员是固定的，遇到超级管理员另外处理）
	4、设置当前显示模块
	5、存入缓存和vuex

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

//备注：有些文件夹和文件由于不是本人添加或编辑，所以未解释

