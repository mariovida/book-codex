import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'Knjižnica Codex',
    component: HomeView
  },
  {
    path: '/o-nama',
    name: 'O nama - Knjižnica Codex',
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/odjeli',
    name: 'Odjeli - Knjižnica Codex',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/DepartmentsView.vue')
  },
  {
    path: '/programi',
    name: 'Programi - Knjižnica Codex',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/ProgramsView.vue')
  },
  {
    path: '/katalog',
    name: 'Katalog - Knjižnica Codex',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/CatalogView.vue')
  },
  {
    path: '/registracija',
    name: 'Registracija - Knjižnica Codex',
    component: () => import(/* webpackChunkName: "about" */ '../views/RegisterView.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeEach((to, from, next) => {
  document.title = to.name;
  next();
});

export default router
