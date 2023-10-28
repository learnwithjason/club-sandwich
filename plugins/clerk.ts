import { clerkPlugin } from 'vue-clerk';

export default defineNuxtPlugin(async (nuxtApp) => {
	const publishableKey = useRuntimeConfig().public
		.clerkPublishableKey as string;

	nuxtApp.vueApp.use(clerkPlugin, {
		publishableKey,
		options: {
			appearance: {
				variables: { colorPrimary: '#570DF8' },
			},
		},
	});
});
