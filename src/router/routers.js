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
            hideInMenu: true,
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
    }
]
