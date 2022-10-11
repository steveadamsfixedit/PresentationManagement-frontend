import { defineStore } from 'pinia';
import { Api } from "../helpers/axios";
// import { notify } from "@kyvg/vue3-notification";

export const usePresentationStore = defineStore('presentation', {
	state: () => ({
		presentations: [],
		token: null
	}),
	persist: true,
	getters: {
		getPresentations: state => state.presentations,
		getToken: state => state.token
	},
	actions: {
		logout() {
			this.$reset();
		},
		async createPresentation(presentation){
			Api.post('/presentation', presentation)
				.then(() => {
					//Notify Success
				})
				.catch((err) => {
					//Throw Error
				})
		},
		async createOrganization(organization){
			Api.post('/organizations', organization)
				.then(() => {
					this.getDBOrganizations();
					notify({
						type: 'success',
						title: "New Organization Created!",
						text: `${organization.name} has successfully been created.`,
					});
				})
				.catch((err) => {
					notify({
						type: 'error',
						title: `Error ${err.response.status}:`,
						text: err.response.data.msg
					});
				});
		},
		async deleteOrganization(id){
			Api.delete(`/organizations/${id}`)
				.then(() => {
					this.getDBOrganizations();
					notify({
						type: 'success',
						title: "Organization Deleted!",
					});
				})
				.catch((err) => {
					notify({
						type: 'error',
						title: `Error ${err.response.status}:`,
						text: err.response.data.msg
					});
				});
		},
		async editOrganization(id, organization){
			Api.put(`/organizations/${id}`, organization)
				.then(() => {
					this.getDBOrganizations();
					notify({
						type: 'success',
						title: "Organization Updated!",
					});
				})
				.catch((err) => {
					notify({
						type: 'error',
						title: `Error ${err.response.status}:`,
						text: err.response.data.msg
					});
				});
		},
	},
});