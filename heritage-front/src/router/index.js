import {createRouter, createWebHistory} from 'vue-router'
import {ElMessage} from "element-plus";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {path: '/', redirect: '/login'},
        {
            path: '/manager', component: () => import('../views/Manager.vue'), children: [
                {
                    path: 'home',
                    name: 'home',
                    meta: {title: '主页', needLogin: true},
                    component: () => import('../views/Home.vue')
                },
                {
                    path: 'test',
                    name: 'test',
                    meta: {title: '测试数据页面', needLogin: true},
                    component: () => import('../views/Test.vue')
                },
                {
                    path: 'data',
                    name: 'data',
                    meta: {title: '数据展示页面', needLogin: true},
                    component: () => import('../views/Data.vue')
                },
                {
                    path: 'employee',
                    name: 'employee',
                    meta: {title: '员工信息页面', needLogin: true},
                    component: () => import('../views/Employee.vue')
                },
                {
                    path: 'admin',
                    name: 'admin',
                    meta: {title: '管理员信息页面', needLogin: true},
                    component: () => import('../views/Admin.vue')
                },
            ]
        },
        {path: '/login', name: 'login', meta: {title: '登录系统'}, component: () => import('../views/Login.vue')},
        {path: '/register', name: 'register', meta: {title: '注册系统'}, component: () => import('../views/Register.vue')},
        {path: '/404', name: '404', meta: {title: '404找不到页面'}, component: () => import('../views/404.vue')},
        {path: '/:pathMatch(.*)', redirect: '/404'},
    ]
})

router.beforeEach((to, from, next) => {
    if (to.meta.needLogin) {
        if (localStorage.getItem('token')) {
            document.title = to.meta.title
            next()
        } else {
            ElMessage.error('请先登录')
            setTimeout(() => {
                next('/login')
            }, 200)
        }
    } else {
        document.title = to.meta.title
        next()
    }
})

export default router
