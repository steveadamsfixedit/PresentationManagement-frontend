import { createRouter, createWebHistory } from 'vue-router';
const routes = [
	{
		path: '/',
		component: () => import('@/views/page/Index.vue')
	},
	{
		path: '/presentations/',
		component: () => import('@/views/page/Presentations.vue')
	},
	{
		path: '/:catchAll(.*)',
		component: () => import('@/views/page/404.vue')
	}
];

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes
});

export default router;