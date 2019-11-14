import Vue from 'vue'
import VueRouter from 'vue-router'
// import store from '../store'


Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Index',
        component: () => import( '../views/content/Index.vue'),
        meta: {title: '首页'},
    },
    {
        path: '/Login',
        name: 'Login',
        component: () => import( '../views/info/Login.vue'),
        meta: {title: '登陆'},
    },
    {
        path: '/Goods',
        name: 'Goods',
        component: () => import( '../views/content/Goods.vue'),
        meta: {title: '商品列表'},
    },
    {
        path: '/Category',
        name: 'Category',
        component: () => import( '../views/content/Category.vue'),
        meta: {title: '分类列表'},
    },
    {
        path: '/register',
        name: 'register',
        component: () => import( '../views/info/Register.vue'),
        meta: {title: '注册'},
    },
    {
        path: '/my',
        name: 'my',
        component: () => import( '../views/info/my.vue'),
        meta:{title:'个人中心'},
    },
    {
        path: '/detail',
        name: 'detail',
        component: () => import( '../views/content/Detail.vue'),
        meta:{title:'商品详情'},
    },
    {
        path: '/cart',
        name: 'cart',
        component: () => import( '../views/shop/Cart.vue'),
        meta:{title:'商品详情'},
    },
]

const router = new VueRouter({
    routes
})
/*router.beforeEach((to, from, next) => {
    document.title = to.meta.title || 'xxx的生鲜系统';
    if (to.meta.auth) {
        if (store.state.token.trim()) {
            next();
        }
    } else {
        next({name: 'login', query: {redirect: to.name}});
    }
})*/

export default router
