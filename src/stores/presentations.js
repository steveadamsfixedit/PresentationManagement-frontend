import { defineStore } from 'pinia';
import { Api } from "../helpers/axios";
import { notify } from "@kyvg/vue3-notification";

export const usePresentationStore = defineStore('presentation', {
	state: () => ({
		presentations: [],
		token: null
	}),
	getters: {
		getPresentations: state => state.presentations,
		getToken: state => state.token,
		getLocation(state){
			let locations = []
			state.presentations.forEach(presentation => {
				if(!locations.includes(presentation.location)){
					locations.push(presentation.location);
				}
			})
			return locations
		},
	},
	actions: {
		logout() {
			this.$reset();
		},
		async updateDB() {
			Api.get('/presentation/')
				.then(response => {
					this.presentations = response.data.presentations
				})
		},
		async createPresentation(presentation){
			Api.post('/presentation/', presentation)
				.then(() => {
					this.updateDB()
					notify({
						type: 'success',
						title: "New Presentation Created",
						text: `The presentation has successfully been added.`,
					});
				})
				.catch((err) => {
					notify({
						type: 'error',
						title: `Error Code: ${err.response.status}`,
						text: err.response.data.error
					});
				})
		},
		async updatePresentation(id, presentation){
			Api.put(`/presentation/${id}`, presentation)
				.then(() => {
					this.updateDB()
					notify({
						type: 'success',
						title: "Presentation Updated",
						text: `The presentation has successfully been updated.`,
					});
				})
				.catch((err) => {
					notify({
						type: 'error',
						title: `Error Code: ${err.response.status}`,
						text: err.response.data.error
					});
				})
		},
		async deletePresentation(id){
			Api.delete(`/presentation/${id}`)
				.then(() => {
					this.updateDB();
					notify({
						type: 'success',
						title: "The presentation has been deleted.",
					});
				})
				.catch((err) => {
					notify({
						type: 'error',
						title: `Error Code: ${err.response.status}`,
						text: err.response.data.error
					});
				});
		},
		async uploadPowerpoint(id, powerpoint){
			Api.put(`/presentation/pp/${id}`, powerpoint, { headers: { 'Content-Type':'multipart/form-data' } })
				.then(() => {
					this.updateDB()
					notify({
						type: 'success',
						title: "Presentation uploaded.",
					});
				})
				.catch((err) => {
					notify({
						type: 'error',
						title: `Error Code: ${err.response.status}`,
						text: err.response.data.error
					});
				});
		},
		getPresentationsAt(selectedLocation) {
			let presentationsAtLocation = [];
			this.presentations.forEach((presentation) => {
				if(presentation.location === selectedLocation.value){
					presentationsAtLocation.push(presentation);
				}
			})

			presentationsAtLocation.sort((a, b) => {
				return new Date(a.time) - new Date(b.time)
			})

			return presentationsAtLocation
		}
	},
});