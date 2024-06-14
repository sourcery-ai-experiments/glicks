import { createRouter, createWebHistory } from 'vue-router';
import Admin from './views/Admin.vue';
import Home from './views/Home.vue'; // Assuming you have a Home component
import NotFound from './views/NotFound.vue';

const routes = [
  { path: '/', component: Home },
  // Set up a 404 page
  { path: '/:pathMatch(.*)*', component: NotFound },
];

if (import.meta.env.VITE_LOCAL_ENV) {
  const Admin = () => import('./views/Admin.vue');
  routes.push({ path: '/admin', component: Admin });
}

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;