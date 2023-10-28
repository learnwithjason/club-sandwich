// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	devtools: { enabled: true },
	build: {
		transpile: ['vue-clerk', '@clerk/clerk-js'],
	},
	app: {
		head: {
			link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.svg' }],
		},
	},
	runtimeConfig: {
		public: {
			clerkPublishableKey: process.env.CLERK_PUBLISHABLE_KEY,
			supabaseUrl: process.env.SUPABASE_URL,
			supabaseAnonKey: process.env.SUPABASE_KEY,
		},
	},
});
