export default [
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: '/login',
        name: 'Login',
        meta: {
            title: '欢迎登录'
        },
        component: () => import('@/view/login')
    },
    {
        path: '/cashier',
        name: 'cashier',
        meta: {
            title: '收银台'
        },
        component: () => import('@/view/cashier')
    }
]
