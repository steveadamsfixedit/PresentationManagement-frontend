import axios from 'axios';
import { usePresentationStore } from '@/stores/presentations.js';

const Api = axios.create({
	//Change back to /api once nginx reverse proxy is up
	baseURL: import.meta.env.VITE_API_URL,
	// withCredentials: true
});

// Api.interceptors.request.use(
// 	(config) => {
// 		const presentationStore = usePresentationStore();
// 		config.headers["Authorization"] = presentationStore.getToken;
//
// 		return config;
// 	}
// );


export { Api };