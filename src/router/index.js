import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Index.vue'

Vue.use(VueRouter)

//获取原型对象上的push函数
const originalPush = VueRouter.prototype.push
//修改原型对象中的push方法
VueRouter.prototype.push = function push(location) {
	return originalPush.call(this, location).catch(err => err)
}

const routes = [{
		path: "/administr",
		children: [{
				path: "/",
				name: 'index',
				component: () => import("../views/administer/Index.vue")
			},
			{
				path: "/administr/member",
				name: 'member',
				component: () => import("../views/administer/Member.vue")
			},
		],
		component: Home,
	},
	{
		path: "/",
		redirect: '/administr'
	},
	{
		path: '/collection/index',
		component: {
			render: (e) => e("router-view")
		},
		children: [{
				path: '',
				name: 'collection',
				component: () => import('@/views/collection/Index.vue'),
			},
			{
				path: '/collection/collectoeder',
				name: 'collectionoeder',
				component: () => import('@/views/collection/Collectoeder.vue')
			}
		]
	},
	{
		path: '/home',
		component: {
			render: (e) => e("router-view")
		},
		children: [{
				path: '',
				name: 'home',
				component: () => import('@/views/Home.vue'),
			},
			{
				path: "/information",
				name: 'information',
				component: () => import("@/views/Homeh/Information.vue")
			},
			{
				path: "/tableconfiguration",
				name: 'tableconfiguration',
				component: () => import("@/views/Homeh/Tableconfiguration.vue")
			}
		]
	},
	{
		path: '/account',
		component: {
			render: (e) => e("router-view")
		},
		children:[
			{
				path: '',
				name: 'account',
				component: () => import('@/views/account/index.vue'),
			},
			{
				path: '/account/collectionmanagement',
				name: 'collectionmanagement',
				component: () => import("@/views/account/Collectionmanagement.vue")
			}
		]
		// component: () => import("@/views/account/index.vue")
	},
	{
		path: '/merchant/index',
		component: {
			render: (e) => e("router-view")
		},
		children:[
			{
				path:'',
				name: 'merchant',
				component: () => import('@/views/Merchant/Index.vue')
			},
			{
				path: "/merchant/reset",
				name: 'reset',
				component: () => import("@/views/Merchant/Reset.vue")
			},
			{
				path:'/merchant/newlybuild',
				name:'newlybuild',
				component: () => import("@/views/Merchant/Newlybuild.vue")
			},
			{
				path: "/merchant/payment",
				name: 'payment',
				component: () => import("@/views/Merchant/Payment.vue")
			},
			{
				path: "/merchant/accounts",
				name: 'accounts',
				component: () => import("@/views/Merchant/Accounts.vue")
			}
		]
		
	},
	// 订单中心
	{
		path:'/ordercenter/index',
		component: {
			render: (e) => e("router-view")
		},
		
		children:[
			{
				path: '',
				name: 'ordercenter',
				component: () => import("@/views/ordercenter/Index.vue")
			},
			{
				path: '/ordercenter/refundrecord',
				name: 'refundrecord',
				component: () => import('@/views/ordercenter/Refundrecord.vue')
			},
			{
				path: '/ordercenter/transferorder',
				name: 'transferorder',
				component: () => import('@/views/ordercenter/Transferorder.vue')
				
			},
		]
	},
	// 分账管理
	{
		path:'/account/accountgroup',
		component: {
			render: (e) => e("router-view")
		},
		children:[
			{
				path: '',
				name: 'accountgroup',
				component: () => import("@/views/account/Accountgroup.vue")
			},
			{
				path: '/ledgermanagement',
				name: 'ledgermanagement',
				component: () => import("@/views/ledgermanagement/Index.vue")
			},
			{
				path: '/indexdetails',
				name: 'indexdetails',
				component: () => import("@/views/ledgermanagement/Indexdetails.vue")
			},
			{
				path: '/accountmodify',
				name: 'accountmodify',
				component: () => import("@/views/ledgermanagement/Accountmodify.vue")
			},
			{
				path: '/accnewlybuild',
				name: 'accnewlybuild',
				component: () => import("@/views/ledgermanagement/Accnewlybuild.vue")
			},
			
			{
				path: '/collectionnewbuild',
				name: 'collectionnewbuild',
				component: () => import("@/views/ledgermanagement/Collectionnewbuild.vue")
			}
		]
	},
	// 系统管理-用户角色管理
	{
		path:'/operator',
		component: {
			render: (e) => e("router-view")
		},
		children:[
			{
				path: '',
				name: 'operator',
				component: () => import("@/views/operator/Index.vue")
			},
			{
				path: 'changerole',
				name: 'changerole',
				component: () => import("@/views/operator/Changerole.vue")
			},
			{
				path: '/rolemodify',
				name: 'rolemodify',
				component: () => import("@/views/operator/Rolemodify.vue")
			},
			{
				path: '/operator/rolemanagement',
				name: 'rolemanagement',
				component: () => import("@/views/operator/Rolemanagement.vue")
			},
			{
				path: '/operator/modification',
				name: 'modification',
				component: () => import("@/views/operator/Modification.vue")
			},
			{
				path: '/operator/newrole',
				name: 'newrole',
				component: () => import("@/views/operator/Newrole.vue")
			}
		]
	}
]

const router = new VueRouter({
	mode: 'hash',
	routes
})

export default router
