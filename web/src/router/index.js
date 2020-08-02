import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Main from "../views/Main";

const Article = () => import('../views/Article');
const Hero = () => import('../views/Hero');
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Main,
    children: [
      {
        path: '/',
        name: 'Home',
        component: Home,
      },
      {
        path: '/articles/:id',
        name: 'Article',
        component: Article,
        props: true
      },
    ]

  },
  {
    path: '/heroes/:id',
    name: 'Hero',
    component: Hero,
    props: true
  },
]

const router = new VueRouter({
  routes
})

export default router
