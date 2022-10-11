import { createApp } from 'vue'
import App from './App.vue'


import router from './router'
import { createPinia } from 'pinia'
const pinia = createPinia()

/* TailwindCSS */
import './index.css';

/* Icons */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

createApp(App)
	.component('font-awesome-icon', FontAwesomeIcon)
	.use(pinia)
	.use(router)
	.mount('#app')