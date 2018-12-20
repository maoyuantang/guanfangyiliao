import Vue from 'vue'
import Router from 'vue-router'
import store from '../vuex/index.js'
import index from '@/components/index'//主页
import test from '@/components/test'//测试页a
import testb from '@/components/testb'//测试页b
import testc from '@/components/testc'//测试页b
import notFound from '@/components/notFound'//404页面

Vue.use(Router)


const router = new Router({
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
		      name: 'test',
		      component: test,
		      meta: {
		        title: '测试'
		      }
      	},
      	{
      		path: '/testb',
		      name: 'testb',
		      component: testb,
		      meta: {
		        title: '测试b'
		      }
      	},
      	{
      		path: '/testc',
		      name: 'testc',
		      component: testc,
		      meta: {
		        title: '测试c'
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
      children:[
      	{
      		path: '/index',
		      name: 'test',
		      component: test,
		      meta: {
		        title: '测试'
		      }
      	}
      ]
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
      path: '*',
      name: 'notFound',
      component: notFound,
      meta: {
        title: '404-not-found'
      }
    },
  ]
})

router.beforeEach((to, from, next) => {//路由跳转，设置title，后期加上权健
	console.log(this.a.app)
	console.log(store.state.user.count)
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})
export default router