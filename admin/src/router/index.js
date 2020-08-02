import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
const Main = () => import("../views/Main.vue");
const CategoryEdit = () => import("../views/CategoryEdit");
const CategoryList = () => import("../views/CategoryList");
const ItemEdit = () => import("../views/ItemEdit");
const ItemList = () => import("../views/ItemList");
const HeroEdit = () => import("../views/HeroEdit");
const HeroList = () => import("../views/HeroList");
const ArticleEdit = () => import("../views/ArticleEdit");
const ArticleList = () => import("../views/ArticleList");
const AdEdit = () => import("../views/AdEdit");
const AdList = () => import("../views/AdList");
const AdminUserEdit = () => import("../views/AdminUserEdit");
const AdminUserList = () => import("../views/AdminUserList");
Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name:'login',
    component:Login,
    meta:{
      isPublic:true
    }
  },
  {
    path: '/',
    name: 'main',
    component: Main,
    children: [
      //  分类路由
      {
        path: '/categories/create',
        component: CategoryEdit
      },
      {
        path: '/categories/list',
        component: CategoryList
      },
      {
        path: '/categories/edit/:id',
        component: CategoryEdit,
        //为true时表示将任何url参数注入到目标组件中，通过props接受，这样就会尽可能与路由解耦
        props: true
      },
      //  物品路由
      {
        path: '/items/create',
        component: ItemEdit
      },
      {
        path: '/items/list',
        component: ItemList
      },
      {
        path: '/items/edit/:id',
        component: ItemEdit,
        //为true时表示将任何url参数注入到目标组件中，通过props接受，这样就会尽可能与路由解耦
        props: true
      },
      //  英雄路由
      {
        path: '/heros/create',
        component: HeroEdit
      },
      {
        path: '/heros/list',
        component: HeroList
      },
      {
        path: '/heros/edit/:id',
        component: HeroEdit,
        //为true时表示将任何url参数注入到目标组件中，通过props接受，这样就会尽可能与路由解耦
        props: true
      },
      //  文章路由
      {
        path: '/articles/create',
        component: ArticleEdit
      },
      {
        path: '/articles/list',
        component: ArticleList
      },
      {
        path: '/articles/edit/:id',
        component: ArticleEdit,
        //为true时表示将任何url参数注入到目标组件中，通过props接受，这样就会尽可能与路由解耦
        props: true
      },
      //  广告位路由
      {
        path: '/ads/create',
        component: AdEdit
      },
      {
        path: '/ads/list',
        component: AdList
      },
      {
        path: '/ads/edit/:id',
        component: AdEdit,
        //为true时表示将任何url参数注入到目标组件中，通过props接受，这样就会尽可能与路由解耦
        props: true
      },
      //  管理员路由
      {
        path: '/admin_users/create',
        component: AdminUserEdit
      },
      {
        path: '/admin_users/list',
        component: AdminUserList
      },
      {
        path: '/admin_users/edit/:id',
        component: AdminUserEdit,
        //为true时表示将任何url参数注入到目标组件中，通过props接受，这样就会尽可能与路由解耦
        props: true
      },
    ]
  }

]

const router = new VueRouter({
  routes
})
router.beforeEach((to,from,next)=>{
  if(!to.meta.isPublic&&!sessionStorage.token){
    return next('/login');
  }
  next();
})
export default router
