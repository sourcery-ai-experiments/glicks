import { createRouter, createWebHistory } from 'vue-router';
import Home from './views/Home.vue'; // Assuming you have a Home component
import NotFound from './views/NotFound.vue';

const routes = [
  { path: '/', component: Home },
  // Set up a 404 page
  { path: '/:pathMatch(.*)*', component: NotFound },
];

// Conditionally add the Admin route if in local environment
if (import.meta.env.VITE_LOCAL_ENV === 'true') {
  routes.push({
    path: '/admin',
    component: () => import('./views/Admin.vue').catch(() => {
      console.error('Admin.vue not found');
      return NotFound;
    })
  });
}

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;