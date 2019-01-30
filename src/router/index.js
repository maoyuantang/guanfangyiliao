import Vue from 'vue'
import Router from 'vue-router'
import store from '../vuex/index.js'
import countRoot from '../public/publicJs/countRoot.js'
import index from '@/components/index'//主页
import statistics from '@/components/statistics'//首页统计
import login from '@/components/login'//主页

import consultation from '@/components/consultation'//远程会诊系统
import cooperation from '@/components/cooperation'//远程协作系统
import education from '@/components/education'//远程教育系统
import files from '@/components/files'//健康档案系统
import followUp from '@/components/followUp'//智能随访系统
import management from '@/components/management'//终端管理系统
import medicalTreatment from '@/components/medicalTreatment'//分级诊疗系统
import outpatient from '@/components/outpatient'//远程门诊系统
import referral from '@/components/referral'//双向转诊系统
import rounds from '@/components/rounds'//移动查房系统
import cloudManagement from '@/components/cloudManagement'//移动查房系统
import familyMedicine from '@/components/familyMedicine'//移动查房系统
import notFound from '@/components/notFound'//404页面



Vue.use(Router)

const router = new Router({
	mode: 'hash',
  routes: [
		
    {
      path: '/',
      name: 'index',
      component: index,
      meta: {
        title: '首页'
      },
      children:[
      	{
      		path: '/',
		      name: 'statistics',
		      component: statistics,
		      meta: {
		        title: '首页统计'
		      }
        },
				/**************************** */
				{
      		path: '/cloudManagement',
		      name: 'cloudManagement',
		      component: cloudManagement,
		      meta: {
		        title: '云存储管理'
		      }
        },
        {
      		path: '/rounds',
		      name: 'rounds',
		      component: rounds,
		      meta: {
		        title: '移动查房系统'
		      }
        },
        {
      		path: '/referral',
		      name: 'referral',
		      component: referral,
		      meta: {
		        title: '双向转诊系统'
		      }
        },
        {
      		path: '/outpatient',
		      name: 'outpatient',
		      component: outpatient,
		      meta: {
		        title: '远程门诊系统'
		      }
        },
        {
      		path: '/medicalTreatment',
		      name: 'medicalTreatment',
		      component: medicalTreatment,
		      meta: {
		        title: '分级诊疗系统'
		      }
        },
        {
      		path: '/management',
		      name: 'management',
		      component: management,
		      meta: {
		        title: '终端管理系统'
		      }
        },
        {
      		path: '/followUp',
		      name: 'followUp',
		      component: followUp,
		      meta: {
		        title: '智能随访系统'
		      }
        },
        {
      		path: '/files',
		      name: 'files',
		      component: files,
		      meta: {
		        title: '健康档案系统'
		      }
        },
        {
      		path: '/education',
		      name: 'education',
		      component: education,
		      meta: {
		        title: '远程教育系统'
		      }
        },
        {
      		path: '/cooperation',
		      name: 'cooperation',
		      component: cooperation,
		      meta: {
		        title: '远程协作系统'
		      }
        },
        {
      		path: '/consultation',
		      name: 'consultation',
		      component: consultation,
		      meta: {
		        title: '远程会诊系统'
		      }
				},
				{
      		path: '/familyMedicine',
		      name: 'familyMedicine',
		      component: familyMedicine,
		      meta: {
		        title: '家医生系统'
		      }
				},
      ]
    },
    {
      path: '/index',
      name: 'index',
      component: index,
      meta: {
        title: '首页'
      },
    },
//  {
//    path: '/test',
//    name: 'test',
//    component: test,
//     meta: {
//      title: '测试'
//    }
//  },
//  {
//    path: '/testb',
//    name: 'testb',
//    component: testb,
//     meta: {
//      title: '测试'
//    }
//  },
		{
			path: '/login',
			name: 'login',
			component: login,
			meta: {
				title: 'login'
			}
		},
		{
      path: '*',
      name: 'notFound',
      component: notFound,
      meta: {
        title: '404-not-found'
      }
    },
  ]
})

/**
 * 作用：路由跳转，设置title，未登录重定向
 */
router.beforeEach((to, from, next) => {
	if(!store.state.user.userInfo.isLogin&&to.path!=='/login'){//vuex中没有用户信息，并且不在登录页面,检查缓存中有没有数据，判断是否是刷新
		let userInfo = sessionStorage.getItem('userInfo');//用户信息
		let userSelfInfo = sessionStorage.getItem('userSelfInfo');//用户个人信息
		let viewRoot = sessionStorage.getItem('viewRoot');//用户视图权限信息
		
		if(userInfo&&userSelfInfo&&viewRoot){//缓存中有数据，说明是刷新
			try{
				userInfo =  JSON.parse(userInfo);
				userSelfInfo =  JSON.parse(userSelfInfo);
				viewRoot =  JSON.parse(viewRoot);
				// console.log(viewRoot.now)
			}catch(e){
				console.log(e);
				next({path:'/login'});
				return;
			}
			store.commit("user/SETUSERINFO",userInfo);
			store.commit("user/SETUSERSELFINFO",userSelfInfo);
			store.commit("user/SETVIEWROOT",viewRoot);
			// console.log(store.state.user.viewRoot)
		}else{
			next({path:'/login'});
			return;
		}
	}
	/* 路由发生变化修改页面title */
	document.title = to.meta.title?to.meta.title:null;
  next()
})
export default router