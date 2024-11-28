import {createRouter, createWebHistory} from 'vue-router'
import {ElMessage} from "element-plus";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {path: '/', redirect: '/login'},
        {
            path: '/manager', component: () => import('../views/manager/Manager.vue'), children: [
                {
                    path: 'home',
                    name: 'home',
                    meta: {title: '主页', needLogin: true},
                    component: () => import('../views/manager/Home.vue')
                },
                {
                    path: 'test',
                    name: 'test',
                    meta: {title: '测试数据页面', needLogin: true},
                    component: () => import('../views/manager/Test.vue')
                },
                {
                    path: 'data',
                    name: 'data',
                    meta: {title: '数据展示页面', needLogin: true},
                    component: () => import('../views/manager/Data.vue')
                },
                {
                    path: 'employee',
                    name: 'employee',
                    meta: {title: '员工信息页面', needLogin: true},
                    component: () => import('../views/manager/Employee.vue')
                },
                {
                    path: 'admin',
                    name: 'admin',
                    meta: {title: '管理员信息页面', needLogin: true},
                    component: () => import('../views/manager/Admin.vue')
                },
                {
                    path: 'person',
                    name: 'person',
                    meta: {title: '个人信息页面', needLogin: true},
                    component: () => import('../views/manager/Person.vue')
                },
                {
                    path: 'password',
                    name: 'password',
                    meta: {title: '修改密码页面', needLogin: true},
                    component: () => import('../views/manager/Password.vue')
                },
            ]
        },
        {
            path: '/front', component: () => import('../views/front/Front.vue'), children: [
                {
                    path: 'home',
                    name: 'front-home',
                    meta: {title: '平台主页', needLogin: true},
                    component: () => import('../views/front/home/Home.vue')
                },
                {
                    path: 'about',
                    name: 'front-about',
                    meta: {title: '关于平台', needLogin: true},
                    component: () => import('../views/front/about/About.vue'), children: [
                        {
                            path: 'introduction',
                            name: 'front-about-introduction',
                            meta: {title: '基本介绍', needLogin: true},
                            component: () => import('../views/front/about/About1.vue'),
                        },
                        {
                            path: 'institute',
                            name: 'front-about-institute',
                            meta: {title: '研究机构', needLogin: true},
                            component: () => import('../views/front/about/About2.vue'),
                        },
                        {
                            path: 'members',
                            name: 'front-about-members',
                            meta: {title: '成员简介', needLogin: true},
                            component: () => import('../views/front/about/About3.vue'),
                        },
                    ]
                },
                {
                    path: 'heritage',
                    name: 'front-heritage',
                    meta: {title: '遗产名录', needLogin: true},
                    component: () => import('../views/front/heritage/Heritage.vue')
                },
            ]
        },
        {path: '/login', name: 'login', meta: {title: '登录系统'}, component: () => import('../views/utils/Login.vue')},
        {path: '/register', name: 'register', meta: {title: '注册系统'}, component: () => import('../views/manager/Register.vue')},
        {path: '/404', name: '404', meta: {title: '404找不到页面'}, component: () => import('../views/utils/404.vue')},
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
