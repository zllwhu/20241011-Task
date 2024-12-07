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
                {
                    path: 'redmap',
                    name: 'front-redmap',
                    meta: {title: '红色图谱', needLogin: true},
                    component: () => import('../views/front/redmap/Redmap.vue'), children: [
                        {
                            path: 'spirit-1',
                            name: 'front-redmap-spirit-1',
                            meta: {title: '建党精神基因', needLogin: true},
                            component: () => import('../views/front/redmap/Redmap1.vue'),
                        },
                        {
                            path: 'spirit-2',
                            name: 'front-redmap-spirit-2',
                            meta: {title: '抗战精神基因', needLogin: true},
                            component: () => import('../views/front/redmap/Redmap2.vue'),
                        },
                        {
                            path: 'spirit-3',
                            name: 'front-redmap-spirit-3',
                            meta: {title: '科学家精神基因', needLogin: true},
                            component: () => import('../views/front/redmap/Redmap3.vue'),
                        },
                        {
                            path: 'spirit-4',
                            name: 'front-redmap-spirit-4',
                            meta: {title: '三牛精神基因', needLogin: true},
                            component: () => import('../views/front/redmap/Redmap4.vue'),
                        },
                    ]
                },
                {
                    path: 'archive',
                    name: 'front-archive',
                    meta: {title: '遗产档案', needLogin: true},
                    component: () => import('../views/front/archive/Archive.vue'),
                },
                {
                    path: 'digital',
                    name: 'front-digital',
                    meta: {title: '数字展示', needLogin: true},
                    component: () => import('../views/front/digital/Digital.vue'), children: [
                        {
                            path: 'album',
                            name: 'front-digital-album',
                            meta: {title: '遗产图库', needLogin: true},
                            component: () => import('../views/front/digital/Digital1.vue'),
                        },
                        {
                            path: 'photo',
                            name: 'front-digital-photo',
                            meta: {title: '影像资料', needLogin: true},
                            component: () => import('../views/front/digital/Digital2.vue'),
                        },
                        {
                            path: 'story',
                            name: 'front-digital-story',
                            meta: {title: '红色故事', needLogin: true},
                            component: () => import('../views/front/digital/Digital3.vue'),
                        },
                        {
                            path: '3d',
                            name: 'front-digital-3d',
                            meta: {title: '三维模型', needLogin: true},
                            component: () => import('../views/front/digital/Digital4.vue'),
                        },
                        {
                            path: 'tourist',
                            name: 'front-digital-tourist',
                            meta: {title: '数字漫游', needLogin: true},
                            component: () => import('../views/front/digital/Digital5.vue'),
                        },
                    ]
                },
            ]
        },
        {path: '/login', name: 'login', meta: {title: '登录系统'}, component: () => import('../views/utils/Login.vue')},
        {
            path: '/register',
            name: 'register',
            meta: {title: '注册系统'},
            component: () => import('../views/manager/Register.vue')
        },
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
