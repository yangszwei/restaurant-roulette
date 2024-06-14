// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	devtools: { enabled: true },
	modules: ['@nuxt/eslint', '@nuxtjs/tailwindcss'],
	postcss: {
		plugins: {
			autoprefixer: {},
			tailwindcss: {},
		},
	},
});