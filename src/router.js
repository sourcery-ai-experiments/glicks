// src/router.template.js
import { createRouter, createWebHistory } from 'vue-router';
import Home from './views/Home.vue'; // Assuming you have a Home component
import NotFound from './views/NotFound.vue';
import Category from './views/Category.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/categories/category/:categoryName', component: Category },
  { path: '/:pathMatch(.*)*', component: NotFound },
  
  {
    path: '/admin',
    component: () => import('./views/admin/Admin.vue')
  },
  {
  path: '/admin/addItems',
  component: () => import('./views/admin/AddItems.vue')
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
