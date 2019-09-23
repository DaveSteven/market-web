import Main from '@/base/main'

export default [
    {
        path: '/',
        redirect: '/cashier',
        meta: {
            hideInMenu: true
        }
    },
    {
        path: '/cashier',
        name: 'cashier',
        meta: {
            title: '收银台',
            hideInMenu: true
        },
        component: () => import('@/view/cashier')
    },
    {
        path: '/admin/login',
        name: 'adminLogin',
        meta: {
            title: '欢迎登录',
            hideInMenu: true
        },
        component: () => import('@/view/management/login')
    },
    {
        path: '/admin',
        name: 'admin',
        redirect: '/admin/home',
        component: Main,
        meta: {
            notCache: true
        },
        children: [
            {
                path: '/admin/home',
                name: 'adminHome',
                meta: {
                    title: '首页',
                    icon: 'md-home'
                },
                component: () => import('@/view/management/home')
            }
        ]
    },
    {
        path: '/admin/goods',
        name: 'adminGoods',
        meta: {
            title: '商品管理',
            icon: 'md-archive'
        },
        component: Main,
        children: [
            {
                path: '/admin/goods/category',
                name: 'goodsCategory',
                meta: {
                  title: '商品分类'
                },
                component: () => import('@/view/management/category')
            },
            {
                path: '/admin/goods/list',
                name: 'goodsList',
                meta: {
                  title: '商品列表'
                },
                component: () => import('@/view/management/goods')
            }
        ]
    },
    {
        path: '/admin/stock',
        name: 'admin/stock',
        meta: {
            title: '库存管理',
            icon: 'md-filing'
        },
        component: Main,
        children: [
            {
                path: '/admin/stock/list',
                name: 'stockList',
                meta: {
                    title: '库存列表'
                },
                component: () => import('@/view/management/stock')
            },
            {
                path: '/admin/inventory/list',
                name: 'inventoryList',
                meta: {
                    title: '进货记录'
                },
                component: () => import('@/view/management/inventory')
            }
        ]
    },
    {
        path: '/admin/order',
        name: 'adminOrder',
        meta: {
            title: '订单管理',
            icon: 'ios-list-box'
        },
        component: Main,
        children: [
            {
                path: '/admin/order/list',
                name: 'orderList',
                meta: {
                    title: '订单列表'
                },
                component: () => import('@/view/management/order')
            }
        ]
    },
    {
        path: '/admin/supplier',
        name: 'adminSupplier',
        meta: {
            title: '供应商管理',
            icon: 'md-people'
        },
        component: Main,
        children: [
            {
                path: '/admin/supplier/list',
                name: 'supplierList',
                meta: {
                    title: '供应商管理',
                    icon: 'md-people'
                },
                component: () => import('@/view/management/supplier')
            }
        ]
    }
]
