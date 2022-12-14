import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import AboutView from "../views/AboutView.vue";
import DepartmentsView from "../views/DepartmentsView.vue";
import DepartmentView from "../views/DepartmentView.vue";
import ProgramsView from "../views/ProgramsView.vue";
import CatalogView from "../views/CatalogView.vue";
import LoginView from "../views/LoginView.vue";
import RegisterView from "../views/RegisterView.vue";
import ProfileView from "../views/ProfileView.vue";
import BookView from "../views/BookView.vue";
import { auth } from '@/firebase';

const routes = [
  {
    path: '/',
    name: 'Knjižnica Codex',
    component: HomeView
  },
  {
    path: '/o-nama',
    name: 'O nama - Knjižnica Codex',
    component: AboutView
  },
  {
    path: '/odjeli',
    name: 'Odjeli - Knjižnica Codex',
    component: DepartmentsView
  },
  {
    path: '/odjeli/:id',
    name: '',
    component: DepartmentView
  },
  {
    path: '/programi',
    name: 'Programi - Knjižnica Codex',
    component: ProgramsView
  },
  {
    path: '/katalog',
    name: 'Katalog - Knjižnica Codex',
    component: CatalogView,
  },
  {
    path: '/profil',
    name: 'Profil - Knjižnica Codex',
    component: ProfileView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/knjiga/:id',
    name: 'Knjiga',
    component: BookView
  },
  {
    path: '/registracija',
    name: 'Registracija - Knjižnica Codex',
    component: RegisterView
  },
  {
    path: '/prijava',
    name: 'Prijava - Knjižnica Codex',
    component: LoginView
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.path === '/prijava' && auth.currentUser) {
    next('/')
    return;
  }

  if (to.matched.some(record => record.meta.requiresAuth) && !auth.currentUser) {
    next('/prijava')
    return;
  }

  document.title = to.name;
  next();
})

export default router;
