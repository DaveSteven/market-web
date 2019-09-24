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
    }
]
