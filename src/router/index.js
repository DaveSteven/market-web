import Router from 'vue-router'
import Vue from 'vue'

Vue.use(Router)

const router = new Router({
    routes: [
        {
            path: '/',
            name: 'Cashier',
            component: () => import('@/view/cashier/cashier')
        }
    ]
})

export default router
