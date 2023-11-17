import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/kahoot-create',
    name: 'kahoot-create',
    component: () => import(/* webpackChunkName: "kahoot-create" */ '../views/KahootView.vue')
  },
  {
    path: '/tg-group',
    name: 'tg-group',
    component: () => import(/* webpackChunkName: "kahoot-create" */ '../views/TelegramVeiw.vue')
  },
  {
    path: '/kahoot-game/:id',
    name: 'kahoot-game',
    component: () => import(/* webpackChunkName: "kahoot-game" */ '../views/TestCreate.vue')
  },
  {
    path: '/kahoot-pin',
    name: 'kahoot-pin',
    component: () => import(/* webpackChunkName: "kahoot-pin" */ '../views/KahootPin.vue')
  },
  {
    path: '/users',
    name: 'users',
    component: () => import(/* webpackChunkName: "users" */ '../views/UsersView.vue')
  },
  {
    path: '/view-course/:name/:id/:userId',
    name: 'view-course',
    props: true,
    component: () => import(/* webpackChunkName: "about" */ '../views/CourseView.vue')
  },
  {
    path: '/kahoot-game-start/:gameStart',
    name: 'kahoot-game-start',
    props: true,
    component: () => import(/* webpackChunkName: "kahoot-game-start" */ '../views/KahootGame.vue')
  },
  {
    path: '/kahoot-game/qrcode/:id',
    name: '/kahoot-game/qrcode',
    component: () => import(/* webpackChunkName: "/kahoot-game/qrcode" */ '../views/QrCode.vue')
  },
  {
    path: '/kahoot-start',
    name: '/kahoot-start',
    component: () => import(/* webpackChunkName: "/kahoot-start" */ '../views/KahootGenerate.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
