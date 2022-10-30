import { createRouter, createWebHistory } from 'vue-router';
const routes = [
	{
		path: '/landing/',
		component: () => import('@/views/page/Index.vue')
	},
	{
		path: '/presentations/',
		component: () => import('@/views/page/Presentations.vue')
	},
	{
		path: '/uploader/',
		component: () => import('@/views/page/Uploader.vue')
	},
	{
		path: '/rooms/',
		component: () => import('@/views/page/Rooms.vue')
	},
	{
		path: '/',
		component: () => import('@/views/page/Displays.vue')
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